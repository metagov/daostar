import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";

function apiRequest(path: string, method: string, data: any) {
  return fetch(path, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    redirect: "follow",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const eventId = event?.pathParameters?.id;
  if (!eventId) return { statusCode: 400 };

  const template = {
    "@context": {
      "@vocab": "http://daostar.org/",
    },
    type: "DAO",
    name: eventId,
  };

  const query = `query GetActivityLogs($dao: String!) {
        activityUri(id: $dao) {
          id
          activites {
            id
						proposalId
						member
          }
        }
      }`;

  const path =
    "https://api.thegraph.com/subgraphs/name/alexkeating/daostar-moloch";

  const data = {
    query,
    variables: { dao: eventId },
  };

  const res = (await apiRequest(path, "POST", data)) as any;
  console.log({ res });

  const activites = res.data.activityUri.activites;

  console.log({ activites });

  const activitesFormatted = activites.map((a: any) => {
    return {
      id: a.id,
      value: a.value,
      type: "activity",
      proposal: {
        id: a.proposalId,
        type: "proposal",
      },
      member: {
        id: a.member,
        type: "EthereumAddress",
      },
    };
  });

  const transformed = { members: activitesFormatted, ...template };

  return transformed
    ? {
        statusCode: 200,
        body: JSON.stringify(transformed),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
