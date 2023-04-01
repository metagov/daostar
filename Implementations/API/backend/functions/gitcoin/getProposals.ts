import HttpStatus from 'http-status-codes'
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { HttpMethod } from 'functions/config'
import { RequestParameters, SubgraphRequest, sendRequest, validateRequest } from './getMembers'


type SubgraphQuery = {
  query: string,
  variables: {
    dao: string
  }
}

type ProposalsResponseType = {
  id: string,
  state: string,
  discussions: string // URI
}

class FormattedProposal
{
  id!: string
  type!: string
  status!: string
  contentURI!: string

  static fromGraphResponse( p: ProposalsResponseType )
  {
    return {
      id: p.id,
      type: 'proposal',
      status: p.state,
      contentURI: p.discussions
    }
  }
}

// TODO: how to better distinguish 
//       - responses from the graph
//       - vs responses we're returning?
type GetProposalsResponse = {
  proposals: FormattedProposal[],
  '@context': {
    '@vocab': string
  },
  type: string,
  name: string
}


const formatApiResponse = (
  eventId: string,
  formattedProposals: FormattedProposal[]
): GetProposalsResponse => 
{
  return {
    proposals: formattedProposals,
    '@context': {
      '@vocab': 'https://daostar.org/'
    },
    type: 'DAO',
    name: eventId
  }
}


const transformProposalsResponse = ( res: any, eventId: string ): Promise<GetProposalsResponse> =>
{
  return new Promise( ( resolve, reject ) =>
  {
    // TODO: reject on bad response
    const proposals: ProposalsResponseType[] = res.data.proposals
    const formattedProposals: FormattedProposal[] = proposals.map(
      FormattedProposal.fromGraphResponse
    )

    resolve(formatApiResponse( eventId, formattedProposals ))
  })
}

const buildProposalsRequest = ( params: RequestParameters ): Promise<SubgraphRequest> =>
{
  return new Promise( ( resolve, reject ) =>
  {
    // TODO: reject on bad response
    const { eventId, requestPath } = params

    const data: SubgraphQuery = {
      // TODO: am assuming this is the query based on aave.  
      //       if so, maybe abstract this out into a config file?
      query: `
        query GetProposals {
          proposals {
            id
            state
            discussions
          }
        }
        `,
      variables: { dao: eventId }
    }

    resolve( {
      path: requestPath,
      method: HttpMethod.POST,
      data
    } )

  } )
}

const queryProposals = async ( event: APIGatewayProxyEventV2 ) =>
{
  return new Promise( ( resolve, reject ) =>
  {
    validateRequest( event )
      .then( params =>
      {
        buildProposalsRequest( params )
          .then( req => sendRequest( req ) )
          .then( res => transformProposalsResponse( res, params.eventId ) )
          .then( resolve )
          .catch( reject )
      } )
  } )
}

export const handler: APIGatewayProxyHandlerV2 = async ( event: APIGatewayProxyEventV2 ) =>
{
  let statusCode, body

  await queryProposals( event )
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
