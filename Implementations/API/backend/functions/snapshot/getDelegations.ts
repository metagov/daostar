import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { delegationsSubgraphs } from 'functions/config'
import snapshot from '@snapshot-labs/snapshot.js';
import { getAddress } from '@ethersproject/address';


const {
  subgraphRequest,
} = snapshot.utils;

async function getDelegationsOutAndIn(
  network: string,
  space: string
): Promise<string[]> {
  if (!delegationsSubgraphs[network]) return [];

  const max = 1000;
  let result: any = [];
  let page = 0;
  
  const members: string[] = []

  const query = {
    delegations: {
      __args: {
        first: max,
        skip: 0,
        where: {
          space_in: [space],
        }
      },
      delegator: true,
      delegate: true,
      space: true
    }
  };
  while (true) {
    query.delegations.__args.skip = page * max;
    const pageResult = await subgraphRequest(delegationsSubgraphs[network], query);
    const pageDelegations = pageResult.delegations || [];
    result = result.concat(pageDelegations);
    page++;
    if (pageDelegations.length < max) break;
  }

  result.forEach((delegation: any) => {
    const delegator = getAddress(delegation.delegator);
    const delegate = getAddress(delegation.delegate);
    if (delegation.space === space) {
      members.push(delegator)
      members.push(delegate)

    }
  });

  return members
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  
    const space = event?.pathParameters?.id
    if (!space) return { statusCode: 400, message: 'Missing id' }

    const template = {
        '@context': {
            '@vocab': 'http://daostar.org/',
        },
        type: 'DAO',
        name: space,
    }

    const members = await getDelegationsOutAndIn('1', space)

    console.log({ members })

    const membersFormatted = members.map((m: string) => {
        return { id: m, type: 'EthereumAddress' }
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
