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
                membersURI
                proposalsURI
                governanceURI
                activityLogURI
                registrationAddress
            }
        }
    }
`
const REGISTRATIONS_MAINNET = gql`
    query Registrations($id: String) @api(name: mainnet) {
        registrationNetwork(id: $id) {
            id
            registrations {
                id
                daoAddress
                daoURI
                daoName
                daoDescription
                membersURI
                proposalsURI
                governanceURI
                activityLogURI
                registrationAddress
            }
        }
    }
`

const REGISTRATIONS_GOERLI = gql`
    query Registrations @api(name: goerli) {
        registrationNetwork(id: "goerli") {
            id
            registrations {
                id
                daoAddress
                daoURI
                daoName
                daoDescription
                membersURI
                proposalsURI
                governanceURI
                activityLogURI
                registrationAddress
            }
        }
    }
`

export default { REGISTRATIONS, REGISTRATIONS_GOERLI, REGISTRATIONS_MAINNET }
