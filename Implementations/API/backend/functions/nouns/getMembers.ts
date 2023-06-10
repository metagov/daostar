import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ConstructorFragment } from "ethers/lib/utils";
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

async function getRes(query: string, path: string) {
    const data = {
        query
    }

    const res = (await apiRequest(path, 'POST', data)) as any
    return res;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }

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

    let res = await getRes(`query {
        accounts( where: {tokenBalance_not: "0"},first:1000) {
            tokenBalance
            delegate {
                id
                delegatedVotes
            }
            id
            nouns {
                seed {
                    id
                }
                owner {
                    delegate {
                        id
                    }
                }
            }
        }
        delegates(first: 1000) {
            id
            delegatedVotes
            nounsRepresented {
              id
              owner {
                id
              }
            }
          }
    }`, path);

    let res_1 = await getRes(`query {
        delegates(skip: 1000, first: 1000) {
            id
            delegatedVotes
            nounsRepresented {
              id
              owner {
                id
              }
            }
          }
    }`, path);


    let members: any = [];
    let delegates = res.data.delegates.concat(res_1.data.delegates);
    // accounts
    for (let index = 0; index < res.data.accounts.length; index++) {
        const n = res.data.accounts[index];
        let member: any = {}
        //let tokenBalance = n.tokenBalance;
        member['memberId'] = {
            "@value": n.id,
            "@type": "EthereumAddress",
        }
        let votingShares = Number(n.tokenBalance);
        let nonvotingShares = 0;
        let delegatee_ethereum_address: any = [];
        let delegate = null;
        //let delegatedVotes = 0;
        for (let index = 0; index < n.nouns.length; index++) {
            const m = n.nouns[index];
            if (m.owner.delegate.id != n.id) {
                votingShares = votingShares - 1;
                nonvotingShares = nonvotingShares + 1;
            }
        }
        delegates = delegates.filter((d: any) => {
            return d.id != n.id
        });

        member['votingShares'] = votingShares;
        member['nonVotingShares'] = nonvotingShares;
        member['delegatedShares'] = n.delegate.delegatedVotes;
        if (n.delegate.delegatedVotes > 0) {

            delegatee_ethereum_address.push({
                "@value": n.delegate.id,
                "@type": "EthereumAddress",
            })

        }

        member['delegatee-ethereum-address'] = delegatee_ethereum_address;
        members.push(member);

    }

    for (let index = 0; index < delegates.length; index++) {
        const n = delegates[index];
        if (n.delegatedVotes > 0) {
            let member: any = {}
            //let tokenBalance = n.tokenBalance;
            member['memberId'] = {
                "@value": n.id,
                "@type": "EthereumAddress",
            }

            member['votingShares'] = 0;
            member['nonVotingShares'] = 0;
            member['delegatedShares'] = n.delegatedVotes;
            member['delegatee-ethereum-address'] = [];
            members.push(member);
        }
    }
    const transformed = { members: members, ...template };
    return transformed
        ? {
            statusCode: 200,
            body: JSON.stringify(transformed)
        }
        : {
            statusCode: 404,
            body: JSON.stringify({ error: true })
        }

}
