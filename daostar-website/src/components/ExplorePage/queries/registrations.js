import { gql } from '@apollo/client'

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

export default { REGISTRATIONS, REGISTRATION, REGISTRATIONSOLD }
