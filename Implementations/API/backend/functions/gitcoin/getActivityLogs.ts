import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { ETHEREUM_ADDRESS, RequestParameters, SubgraphRequest, sendRequest, validateRequest } from './getMembers'
import { HttpMethod } from 'functions/config'

import  HttpStatus  from 'http-status-codes'

type ActivityEntry = {
  id: string,
  type: string,
  proposal: {
    id: string,
    type: string,
  },
  member: {
    id: string,
    type: string,
  },
}

// TODO: this could be more generic, or extend a generic "DaostarResponse" type
type GetActivityLogsResponse = {
  "@context": {
    "@vocab": string,
  },
  type: string,
  name: string, // TODO: number? id?
  members: ActivityEntry[]  
}

const buildActivityLogsRequest = ( params: RequestParameters ): Promise<SubgraphRequest> =>
{
  return new Promise( ( resolve, reject ) =>
  {
    const { eventId, requestPath } = params

    const data = {
      query: `query GetActivityLogs($dao: String!) {
        activityUri(id: $dao) {
          id
          activities {
            id
            proposalId
            member
          }
        }
      }`,
      variables: { dao: eventId }
    }

    resolve( {
      path: requestPath,
      method: HttpMethod.POST,
      data
    } )
  } )
}

const transformActivityLogsResponse = ( eventId: string, response: any ): GetActivityLogsResponse =>
{
  const template = {
    "@context": {
      "@vocab": "http://daostar.org/",
    },
    type: "DAO",
    name: eventId,
  };

  const formattedActivities = response.data.activityUri.activities.map( ( activity: any ) =>
  {
    return {
      id: activity.id,
      value: activity.value,
      type: "activity",
      proposal: {
        id: activity.proposalId,
        type: "proposal",
      },
      member: {
        id: activity.member,
        type: ETHEREUM_ADDRESS
      }
    }
  } )

  // TODO: should this be members or activities?
  return {
    members: formattedActivities,
    ...template
  }
}

const queryActivityLogs = async ( event: APIGatewayProxyEventV2 ) =>
{
  return new Promise( ( resolve, reject ) =>
  {
    validateRequest( event )
      .then( ( params ) =>
      {
        buildActivityLogsRequest( params )
          .then( req => sendRequest( req ) )
          .then( res => transformActivityLogsResponse( params.eventId, res ) )
          .then( resolve )
          .catch( reject )
      } )
  } )
}

export const handler: APIGatewayProxyHandlerV2 = async ( event ) =>
{
  let statusCode, body

  await queryActivityLogs( event )
    .then( ( res ) =>
    {
      statusCode = HttpStatus.OK
      body = JSON.stringify( ( res ) )
    } )
    .catch( ( err ) =>
    {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      body = JSON.stringify( {
        error: true,
        errorMessage: err
      } )
    } )

  return {
    statusCode,
    body
  }
}
