import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { daohausGraphConfig } from 'functions/config'
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
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }
    
    console.log({graphConfig: daohausGraphConfig})
    const path = daohausGraphConfig[network]
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

    const query = `query GetMembers($dao: String!) {
        moloches(where: {id: $dao}) {
          id
          members {
            memberAddress
          }
        }
      }`


    const data = {
        query,
        variables: { dao: eventId },
    }
    console.log({data})

    const res = (await apiRequest(path, 'POST', data)) as any
    console.log({ res })

    if (!(res.data.moloches && (res.data.moloches.length > 0))) return {statusCode: 404, message: 'DAO not found'}
    const members = res.data.moloches[0].members

    console.log({ members })

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
