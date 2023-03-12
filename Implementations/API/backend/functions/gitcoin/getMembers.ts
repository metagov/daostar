import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { HttpMethods, gitcoinGraphConfig } from 'functions/config'

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

const validateRequestParameters = ( event: any ):
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
    const path = gitcoinGraphConfig[network]

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
    })
  })
}

const sendRequest = ( request: SubgraphRequest ): Promise<SubgraphResponse> => 
{

  }

export const handler: APIGatewayProxyHandlerV2 = async ( event ) =>
{
  return validateRequestParameters( event )
    .then( ( params ) => buildRequest( params ) )
    .then( ( req ) => sendRequest( req ) )
    .then( ( res ) => transformResponse( res ) )
    .catch( ( err ) => err )
}
