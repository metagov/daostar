import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { apiRequest } from 'functions/apiRequest'
import { HttpMethods, gitcoinGraphConfig } from 'functions/config'

const ETHEREUM_ADDRESS = 'EthereumAddress'

// TODO: move this to a more common utils file
class MissingValueError
{
  statusCode: number
  message: string

  constructor( statusCode: number, paramName: string )
  {
    this.statusCode = statusCode,
      this.message = `Missing "${paramName}"`
  }
}

type RequestParameters = {
  eventId: string
  network: string
}

type SubgraphRequest = {
  path,
  method,
  data
}

type ReputationHolder = {
  id: string
  balance: string
  address: string
}

// TODO: are some of these numbers?
type SubgraphResponse = {
  data: {
    dao: {
      id: string
      name: string
      reputationHolders: ReputationHolder[]
    }
  }
}

class Member
{
  id: string
  type: string

  static fromReputationHolder( holder: ReputationHolder ): Member
  {
    return { id: holder.address, type: ETHEREUM_ADDRESS }
  }
}

type GetMembersResponse = {
  members: Member[]
  '@context': {
    '@vocab': string
  }
  type: string
  name: string
}

const validateRequest = ( event: any ):
  Promise<RequestParameters> => 
{
  return new Promise( ( resolve, reject ) =>
  {
    const eventId = event?.pathParameters?.id
    const network = event?.pathParameters?.network

    if ( !eventId )
      reject( new MissingValueError( 400, 'event parameter id' ) )
    if ( !network )
      reject( new MissingValueError( 400, 'event parameter network' ) )

    resolve( {
      eventId,
      network
    } )
  } )
}

const buildRequest = ( params: RequestParameters ): Promise<SubgraphRequest> =>
{
  return new Promise( ( resolve, reject ) =>
  {
    const { eventId, network } = params
    const path = gitcoinGraphConfig[ network ]

    if ( !path )
      reject( new MissingValueError( 400, 'config for network' ) )

    const data = {
      query: `query GetMembers($dao: String!) {
        dao(id: $dao) {
            id
            name
            reputationHolders {
                id
                balance
                address
            }
        }
      }`,
      variables: { dao: eventId },
    }

    resolve( {
      path,
      method: HttpMethods.POST,
      data
    } )
  } )
}

const sendRequest = ( request: SubgraphRequest ): Promise<SubgraphResponse> => 
{
  return new Promise( ( resolve, reject ) =>
  {
    const { path, method, data } = request
    apiRequest( path, method, data )
      .then( resolve )
      .catch( reject )
  } )
}

const transformResponse = ( eventId: string, response: any ): GetMembersResponse =>
{
  const holders = response.data.dao.reputationHolders
  console.log( { holders } )
  const members = holders.map( Member.fromReputationHolder )

  return {
    members,
    '@context': {
      '@vocab': 'https://daostar.org/',
    },
    type: 'DAO',
    name: eventId
  }
}

const queryMembersOfDao = ( event ) =>
{
  return new Promise( ( resolve, reject ) =>
  {
    validateRequest( event )
      .then( ( params ) => 
      {
        buildRequest( params )
          .then( ( req ) => sendRequest( req ) )
          .then( ( res ) => transformResponse( params.eventId, res ) )
          .then( resolve )
          .catch( reject )
      } )
      .catch( reject )
  } )
}

export const handler: APIGatewayProxyHandlerV2 = async ( event ) =>
{
  let statusCode, body

  queryMembersOfDao( event )
    .then( ( res ) =>
    {
      statusCode = 200
      body = JSON.stringify( ( res ) )
    } )
    .catch( ( err ) =>
    {
      statusCode = 400
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
