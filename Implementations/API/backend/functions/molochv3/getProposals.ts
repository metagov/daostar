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

const calculateSatatus = (
  processed: boolean,
  cancelled: boolean,
  passed: boolean,
  votingStarts: number,
  votingEnds: number,
  graceEnds: number,
  sponsored: boolean
) => {
  const now = Date.now();
  if (processed) {
    return "processed";
  } else if (passed) {
    return "passed";
  } else if (cancelled) {
    return "cancelled";
  } else if (now >= votingEnds && graceEnds > now) {
    return "grace";
  } else if (now >= votingStarts && votingEnds > now) {
    return "voting";
  } else if (sponsored) {
    return "sponsored";
  } else {
    return "submitted";
  }
};

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

  const query = `query GetProposals($dao: String!) {
        proposalUri(id: $dao) {
          id
          proposals {
            id
						title
						contentURI
						processed
            cancelled
            passed
            votingStarts
            votingEnds
            graceEnds
						sponsored
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

  const proposals = res.data.proposalUri.proposals;

  console.log({ proposals });

  const proposalsFormatted = proposals.map((p: any) => {
    const status = calculateSatatus(
      p.processed,
      p.cancelled,
      p.passed,
      p.votingStarts,
      p.votingEnds,
      p.graceEnds,
      p.sponsored
    );
    return {
      id: p.id,
      type: "proposal",
      name: p.title,
      contentURI: p.contentURI,
      status: status,
    };
  });

  const transformed = { proposals: proposalsFormatted, ...template };

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
