import { gql } from "@apollo/client";

const REGISTRATIONS = gql`
    query Registrations @api(contextKey: "apiName") {
        registrationInstances(first: 5) {
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
`
const REGISTRATIONS_MAINNET = gql`
    query Registrations @api(name: mainnet) {
        registrationInstances(first: 5) {
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
`

const REGISTRATIONS_GOERLI = gql`
    query Registrations @api(name: goerli) {
        registrationInstances(first: 5) {
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
`

export default {REGISTRATIONS, REGISTRATIONS_GOERLI, REGISTRATIONS_MAINNET}