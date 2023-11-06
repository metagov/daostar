const FRAMEWORK_URIs = {
    molochv2: {
        membersURI: (address, network) => `https://services.daostar.org/api/v1/molochv2/members/${network}/${address}`,
        proposalsURI: (address, network) => `https://services.daostar.org/api/v1/molochv2/proposals/${network}/${address}`,
    },
    safe: {
        membersURI: (address, network) => `https://services.daostar.org/api/v1/gnosis/members/${network}/${address}`,
        proposalsURI: (address, network) => `https://services.daostar.org/api/v1/gnosis/proposals/${network}/${address}`,
    },
    snapshot: {
        membersURI: (address, network) => `https://services.daostar.org/api/v1/boardroom/members/${network}/${address}`,
        proposalsURI: (address, network) => `https://services.daostar.org/api/v1/snapshot/proposals/${address}`,
    },
}

export default FRAMEWORK_URIs;