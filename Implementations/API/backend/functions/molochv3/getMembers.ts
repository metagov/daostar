import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import fetch from 'node-fetch'

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
    const eventId = event?.pathParameters?.id
    const network = event?.pathParameters?.network
    if (!eventId) return { statusCode: 400 }
    if (!network) return { statusCode: 400 }

    if (network !== 'mainnet') return { statusCode: 400 } // Only support mainnet for now

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: eventId,
    }

    const query = `query GetMembers($dao: String!) {
        {
            members(where: {exists: true, molochAddress: $dao}) {
              memberAddress
            }
          }
      }`

    const path = 'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus'

    const data = {
        query,
        variables: { dao: eventId },
    }

    const res = (await apiRequest(path, 'POST', data)) as any

    const members = res.data.memberUri.members

    const membersFormatted = members.map((m: any) => {
        return { id: m.memberAddress, type: 'EthereumAddress' }
    })

    const transformed = { members: membersFormatted, ...template }

    return transformed
        ? {
              statusCode: 200,
              body: JSON.stringify(transformed),
          }
        : {
              statusCode: 404,
              body: JSON.stringify({ error: true }),
          }
}
