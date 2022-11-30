import { gql } from "@apollo/client";

const REGISTRATIONS = gql`
    query Registrations {
        newRegistrations(first: 5) {
            id
            daoAddress
            daoURI
            registration
        }
    }
`

export default REGISTRATIONS;