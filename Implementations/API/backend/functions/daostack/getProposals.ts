import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { daostackGraphConfig } from 'functions/config'
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

    const path = daostackGraphConfig[network]
    if (!path) return { statusCode: 400, message: 'Missing network' }

    const eventId = event?.pathParameters?.id
    if (!eventId) return { statusCode: 400 }

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: eventId,
    }

    const query = `
    query GetProposals($dao: String!) {
        dao(id: $dao) {
          id
          name
          proposals {
            id
            stage
            url
          }
        }
      }
      `

    const data = {
        query,
        variables: { dao: eventId },
    }

    const res = (await apiRequest(path, 'POST', data)) as any
    

    if (!(res.data.dao)) return { statusCode: 404, message: 'DAO not found' }
    const proposals = res.data.dao.proposals

    const proposalsFormatted = proposals.map((p: any) => {
        return {
            id: p.id,
            type: 'proposal',
            status: p.stage,
            contentURI: p.url,
        }
    })

    const transformed = { proposals: proposalsFormatted, ...template }

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
