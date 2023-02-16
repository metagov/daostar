const FRAMEWORK_URIs = {
    custom: {
        membersURI: '',
        activityURI: '',
        proposalsURI: '',
        governanceURI: ''
    },
    moloch: {
        membersURI: (address, network) => `https://placeholder.daostar.org/api/v1/gnosis/members/${network}/${address}`,
        activityURI: '',
        proposalsURI: '',
        governanceURI: ''
    },
    safe: {
        membersURI: (address, network) => `https://services.daostar.org/api/v1/gnosis/members/${network}/${address}`,
        // membersURI: `https://services.daostar.org/api/v1/gnosis/members/{network}/{address}`,
        activityURI: '',
        proposalsURI: '',
        governanceURI: ''
    },
    daodao: {
        membersURI: '',
        activityURI: '',
        proposalsURI: '',
        governanceURI: ''
    },
}

export default FRAMEWORK_URIs;