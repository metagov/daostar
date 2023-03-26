import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { HttpResponse } from 'aws-sdk'
import { apiRequest } from 'functions/apiRequest'
import { HttpMethod, gitcoinGraphConfig } from 'functions/config'

// todo: this type clashes with the AWS handler type, how can we specify what type `event` is in the handler parameters?
type GitcoinProposalsRequestEventType = {
  pathParameters: {
    eventId: string,
    network: string
  }
}

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
type ProposalsApiResponse = {
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
): ProposalsApiResponse => 
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


const transformResponse = ( res: any, eventId: string ): HttpResponse =>
{
  // TODO: do these get added on later? what type should we return instead? probably shouldn't have null headers...
  const emptyResponse = {
    body: '',
    headers: {},
    streaming: false,
    createUnbufferedStream: () => new ReadableStream(),
    statusMessage: null
  }

  if ( !( res.data.proposals ) ) return {
    ...emptyResponse,
    statusCode: 404,
    // TODO: is this DAO not found, or proposals not found, 
    // or something else more specific?
    statusMessage: 'DAO not found'
  }

  const proposals: ProposalsResponseType[] = res.data.proposals
  const formattedProposals: FormattedProposal[] = proposals.map(
    FormattedProposal.fromGraphResponse
  )

  const response: ProposalsApiResponse = formatApiResponse( eventId, formattedProposals )

  // todo: i don't like this structure - in what 
  //       situation is `response` falsy? 
  //       can we check that more explicitly?
  if ( !response )
    return {
      ...emptyResponse,
      statusCode: 500, // todo: right status code?
      statusMessage: 'Internal server error',
      body: JSON.stringify( {
        error: true,
        // TODO: how's this error message? 
        //       more specific, less specific?
        message: 'An unknown error occurred while handling the response from the graph.'
      } ),
    }

  return {
    ...emptyResponse,
    statusCode: 200,
    statusMessage: 'OK',
    body: JSON.stringify( response ),
  }
}

// TODO: can we type event as a GitcoinProposalsRequestEventType
//       or something like that ?
export const handler: APIGatewayProxyHandlerV2 = async ( event ) =>
{
  // TODO: write json.schema file for event and 
  //       validate against that?
  const eventId = event?.pathParameters?.id
  // TODO: use HTTP import for specific code, eg. HttpStatus.BadRequest or something like that
  if ( !eventId ) return { statusCode: 400, message: 'Missing event parameter "id"'! }

  const network = event?.pathParameters?.network
  if ( !network ) return { statusCode: 400, message: 'Missing event parameter "network"!' }

  const path = gitcoinGraphConfig[ network ]

  const req: SubgraphQuery = {
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

  const res = ( await apiRequest(
    ( path ), HttpMethod.POST, req
  ) ) as any

  return transformResponse( res, eventId )
}
