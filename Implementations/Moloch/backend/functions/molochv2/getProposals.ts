import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { graphConfig } from 'functions/config'
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
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }

    const path = graphConfig[network]
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

    const query = `query GetProposals($dao: String!) {
        moloches(where: {id: $dao}) {
          id
          proposals {
              id
              processed
              cancelled
              votingPeriodStarts
              votingPeriodEnds
              gracePeriodEnds
              didPass
              sponsored
          }

        }
      }`

    const data = {
        query,
        variables: { dao: eventId },
    }

    const res = (await apiRequest(path, 'POST', data)) as any

    if (!(res.data.moloches && res.data.moloches.length > 0)) return { statusCode: 404, message: 'DAO not found' }
    console.log({ data: res.data.moloches[0] })
    const proposals = res.data.moloches[0].proposals

    const proposalsFormatted = proposals.map((p: any) => {
        const status = calculateSatatus(p.processed, p.cancelled, p.didPass, p.votingPeriodStarts, p.votingPeriodEnds, p.gracePeriodEnds, p.sponsored)
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
