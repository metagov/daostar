import { gql } from "@apollo/client";

const REGISTRATIONS = gql`
    query Registrations {
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
            network
        }
    }
`

export default REGISTRATIONS;