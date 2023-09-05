import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { BoardroomKey, boardroomApiConfig } from "../config";
import fetch, { RequestInit } from "node-fetch";
import { utils } from "ethers";

function apiRequest(path: string, method: "GET" | "POST", data?: any) {
  const payload: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    redirect: "follow",
  };
  if (method === "POST") payload.body = JSON.stringify(data);
  return fetch(path, payload).then((res) => res.json());
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const network = event?.pathParameters?.network;
  if (!network) return { statusCode: 400, message: "Missing network" };

  const path = boardroomApiConfig[network];
  if (!path) return { statusCode: 400, message: "Missing config for network" };

  const name = event?.pathParameters?.id;
  if (!name) return { statusCode: 400, message: "Missing name" };

  const template = {
    "@context": {
      "@vocab": "http://daostar.org/",
    },
    type: "DAO",
    name: name,
  };

  const queryPath =
    path + "/" + name + "/voters" + "?limit=50&key=" + BoardroomKey;

  console.log("queryPath:", queryPath);
  const res = (await apiRequest(queryPath, "GET")) as any;

  if (!res.data) return { statusCode: 404, message: "DAO not found" };
  const voters = res.data;

  const membersFormatted = voters.map((a: any) => {
    return {
      id: a.address,
      type: "EthereumAddress",
    };
  });

  const transformed = { members: membersFormatted, ...template };

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
