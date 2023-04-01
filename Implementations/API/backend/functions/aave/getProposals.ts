import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { apiRequest } from 'functions/apiRequest'
import { aaveGraphConfig } from 'functions/config'

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }

    const path = aaveGraphConfig[network]
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
    query GetProposals {
        proposals {
            id
            state
            discussions
          }
      }
      `

    const data = {
        query,
        variables: { dao: eventId },
    }

    const res = (await apiRequest(path, 'POST', data)) as any
    

    if (!(res.data.proposals)) return { statusCode: 404, message: 'DAO not found' }
    const proposals = res.data.proposals

    const proposalsFormatted = proposals.map((p: any) => {
        return {
            id: p.id,
            type: 'proposal',
            status: p.state,
            contentURI: p.discussions,
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
