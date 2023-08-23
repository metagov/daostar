import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { snapshotApiConfig } from 'functions/config'
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

const calculateSatatus = (
    processed: boolean,
    cancelled: boolean,
    passed: boolean,
    votingStarts: number,
    votingEnds: number,
    graceEnds: number,
    sponsored: boolean
) => {
    const now = Date.now()
    if (processed) {
        return 'processed'
    } else if (passed) {
        return 'passed'
    } else if (cancelled) {
        return 'cancelled'
    } else if (now >= votingEnds && graceEnds > now) {
        return 'grace'
    } else if (now >= votingStarts && votingEnds > now) {
        return 'voting'
    } else if (sponsored) {
        return 'sponsored'
    } else {
        return 'submitted'
    }
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    console.log({graphConfig: snapshotApiConfig})
    const path = snapshotApiConfig['1']
    if (!path) return { statusCode: 400, message: 'Missing config for network' }

    const eventId = event?.pathParameters?.id
    if (!eventId) return { statusCode: 400, message: 'Missing id' }

    const page = parseInt(event?.queryStringParameters?.page) || 1; // Get the requested page number

    const pageSize = 20; // Number of items per page
    const skip = (page - 1) * pageSize; // Calculate the number of items to skip

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: eventId,
    }

    const query = `query GetProposals($dao: String!, $first: Int!, $skip: Int!) {
        proposals (
            where: {
              space_in: [$dao],
            },
            orderBy: "created",
            orderDirection: desc,
            first: $first,
            skip: $skip
          ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
      }`

    const data = {
        query,
        variables: { dao: eventId, first: pageSize, skip },
    }

    const res = (await apiRequest(path, 'POST', data)) as any

    if (!(res.data.proposals && res.data.proposals.length > 0)) return { statusCode: 404, message: 'DAO not found' }
    console.log({ data: res.data.proposals })
    const proposals = res.data.proposals

    const proposalsFormatted = proposals.map((p: any) => {
        const status = p.state
        return {
            id: p.id,
            type: 'proposal',
            status: status,
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
