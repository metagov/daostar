import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { gnosisApiConfig } from 'functions/config'
import fetch, { RequestInit } from 'node-fetch'
import "@ethersproject/shims"
import { ethers } from 'ethers'

function apiRequest(path: string, method: 'GET' | 'POST', data?: any) {
    const payload: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        redirect: 'follow',
    }
    if (method === 'POST') payload.body = JSON.stringify(data)
    return fetch(path, payload).then((res) => res.json())
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const network = event?.pathParameters?.network
    if (!network) return { statusCode: 400, message: 'Missing network' }

    const path = gnosisApiConfig[network]
    if (!path) return { statusCode: 400, message: 'Missing network' }

    const eventId = event?.pathParameters?.id
    if (!eventId) return { statusCode: 400 }
    
    console.log({eventId})

    const checksummedId = ethers.utils.getAddress(eventId)

    console.log({checksummedId})

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: eventId,
    }

    const queryPath = path + '/safes/' + checksummedId + '/multisig-transactions/?executed=false'
    
    console.log({queryPath})

    const res = (await apiRequest(queryPath, 'GET')) as any

    if (!res.results) return { statusCode: 404, message: 'DAO not found' }
    const proposals = res.results

    const proposalsFormatted = proposals.map((p: any) => {
        return {
            id: p.nonce,
            type: 'proposal',
            status: p.isExecuted ? 'Executed' : 'Proposed',
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
