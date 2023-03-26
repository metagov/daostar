import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const eventId = event?.pathParameters?.id
  const network = event?.pathParameters?.network
  if (!eventId) return { statusCode: 400 }
  if (!network) return { statusCode: 400 } 
  
}
