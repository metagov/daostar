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

export default { REGISTRATIONS, REGISTRATION, REGISTRATIONSOLD, ATTESTATIONS_BY_SCHEMA }
