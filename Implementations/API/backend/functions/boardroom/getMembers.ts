import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { BoardroomAddressKeyConfig, shapeshiftApiConfig } from "../config";
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

  const path = shapeshiftApiConfig[network];
  if (!path) return { statusCode: 400, message: "Missing config for network" };

  const eventId = event?.pathParameters?.id;
  if (!eventId) return { statusCode: 400, message: "Missing id" };

  const template = {
    "@context": {
      "@vocab": "http://daostar.org/",
    },
    type: "DAO",
    name: eventId,
  };

  const address = utils.getAddress(eventId);

  const queryPath =
    path + "/voters" + "?limit=50&key=" + BoardroomAddressKeyConfig[address];

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
