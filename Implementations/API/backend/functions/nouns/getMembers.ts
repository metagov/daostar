import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { nonusApiConfig } from "functions/config";
import fetch, { RequestInit } from 'node-fetch'

function apiRequest(path: string, method: string, data: any) {
    return fetch(path, {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        redirect: 'follow',
        body: JSON.stringify(data),
    }).then((res) => res.json())
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }

    console.log({ graphConfig: nonusApiConfig })
    const path = nonusApiConfig[network]
    if (!path) return { statusCode: 400, message: 'Missing config for network' }

    const eventId = event?.pathParameters?.id
    if (!eventId) return { statusCode: 400, message: 'Missing id' }

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: eventId,
    }

    const query = `query {
        accounts( where: {tokenBalance_not: "0"}) {
            tokenBalance
            id
            nouns {
                seed {
                    id
                }
                owner {
                    delegate {
                        id
                        delegatedVotes
                    }
                }
            }
        }
    }`

    const data = {
        query,
        variables: { dao: eventId },
    }
    console.log({ data })

    const res = (await apiRequest(path, 'POST', data)) as any
    console.log({ res })

    let members: any = [];
    res.data.accounts.forEach((n: any) => {
        let member: any = {}
        //let tokenBalance = n.tokenBalance;
        member['memberId'] = {
            "@value": n.id,
            "@type": "EthereumAddress",
        }
        let votingShares = Number(n.tokenBalance);
        let nonvotingShares = 0;
        let delegatee_ethereum_address: any = [];
        let delegatedVotes = 0;
        for (let index = 0; index < n.nouns.length; index++) {
            const m = n.nouns[index];
            if (m.owner.delegate.id != n.id) {
                votingShares = votingShares - 1;
                nonvotingShares = nonvotingShares + 1;

                delegatee_ethereum_address.push({
                    "@value": m.owner.delegate.id,
                    "@type": "EthereumAddress",
                })
            }
            delegatedVotes = m.owner.delegate.delegatedVotes;
        }

        member['votingShares'] = votingShares;
        member['nonVotingShares'] = nonvotingShares;
        member['delegatedShares'] = delegatedVotes;
        member['delegatee-ethereum-address'] = delegatee_ethereum_address;
        members.push(member);
    })

    return members
        ? {
            statusCode: 200,
            body: JSON.stringify(members)
        }
        : {
            statusCode: 404,
            body: JSON.stringify({ error: true })
        }

}
