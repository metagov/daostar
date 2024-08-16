import { gql } from '@apollo/client'
// This is the only queries file being used
const REGISTRATIONS = gql`
    query Registrations($id: String) @api(contextKey: "apiName") {
        registrationNetwork(id: $id) {
            id
            registrations {
                id
                daoAddress
                daoURI
                daoName
                daoDescription
                proposalsURI
                membersURI
                issuersURI
                governanceURI
                activityLogURI
                managerAddress
                contractsRegistryURI
                registrationAddress
                registrationNetwork {
                    id
                  }
            }
        }
    }
`
// DO NOT UPDATE THIS QUERY, this query is specifically for v0 Subgraph Indexer
// We don't want to keep having to update the schema of old indexers as we add new fields
const REGISTRATIONSOLD = gql`
    query Registrations($id: String) @api(contextKey: "apiName") {
        registrationNetwork(id: $id) {
            id
            registrations {
                id
                daoAddress
                daoURI
                daoName
                daoDescription
                proposalsURI
                membersURI
                issuersURI
                governanceURI
                activityLogURI
                managerAddress
                contractsRegistryURI
                registrationAddress
                registrationNetwork {
                    id
                  }
            }
        }
    }
`

const REGISTRATION = gql`
    query Registration($id: String) @api(contextKey: "apiName") {
        registrationInstance(id: $id) {
            id
            daoAddress
            daoURI
            daoName
            daoDescription
            proposalsURI
            membersURI
            issuersURI
            governanceURI
            activityLogURI
            managerAddress
            contractsRegistryURI
            registrationAddress
            registrationNetwork {
                id
                }
          }
    }
`
const GET_REGISTRATIONS = gql`
query RegistrationInstances @api(contextKey: "apiName") {
  registrationInstances {
    id
    daoAddress
    registrationNetwork {
      chainId
      id
    }
    registrationAddress
    daoURI
  }
}
`;

const GET_DAOMETA_DATA = gql`
  query Daometadata($daometadataId: ID!)  @api(contextKey: "apiName") {
    daometadata(id: $daometadataId) {
      id
      daoName
      daoDescription
      membersURI
      issuersURI
      proposalsURI
      governanceURI
      activityLogURI
      contractsRegistryURI
      managerAddress
    }
  }
`;


const GET_REG_INSTANCE = gql`
query RegistrationInstance($registrationInstanceId: ID!)   @api(contextKey: "apiName"){
  registrationInstance(id: $registrationInstanceId) {
    id
    daoAddress
    registrationNetwork {
      id
      chainId
    }
    registrationAddress
    daoURI
  }
}
`;

const ATTESTATIONS_BY_SCHEMA = gql`
 query AttestationsBySchema($schemaId: String!) @api(contextKey: "apiName") {
    attestations(where: {
      schemaId: { equals: $schemaId },
    }) {
      id
      data
      decodedDataJson
      recipient
      attester
      time
      timeCreated
      expirationTime
      revocationTime
      refUID
      revocable
      revoked
      txid
      schemaId
      ipfsHash
      isOffchain
    }
  }
`;




const ENS_QUERY = gql `
query Domains($where: Domain_filter, $first: Int)  @api(contextKey: "apiName"){
    domains(where: $where, first: $first) {
        name
        resolvedAddress {
          id
        }
      }
}
`;
export default { REGISTRATIONS, REGISTRATION, REGISTRATIONSOLD, ATTESTATIONS_BY_SCHEMA, ENS_QUERY, GET_REGISTRATIONS, GET_DAOMETA_DATA, GET_REG_INSTANCE }
