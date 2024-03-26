const EASRegistrationContract = [{
    "inputs": [{"internalType": "address", "name": "_admin", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
    }, {"indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32"}],
    "name": "RoleAdminChanged",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "sender", "type": "address"}],
    "name": "RoleGranted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "sender", "type": "address"}],
    "name": "RoleRevoked",
    "type": "event"
}, {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MEMBER_ROLE",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "components": [{
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
        }, {"internalType": "bytes32", "name": "schema", "type": "bytes32"}, {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
        }, {"internalType": "uint64", "name": "expirationTime", "type": "uint64"}, {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
        }, {"internalType": "bytes32", "name": "refUID", "type": "bytes32"}, {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }, {"internalType": "address", "name": "attester", "type": "address"}, {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
        }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
        "internalType": "struct Attestation",
        "name": "attestation",
        "type": "tuple"
    }],
    "name": "createFromEAS",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "role", "type": "bytes32"}],
    "name": "getRoleAdmin",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
    "name": "grantMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "internalType": "address",
        "name": "account",
        "type": "address"
    }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "hasRole",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "internalType": "address",
        "name": "account",
        "type": "address"
    }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "resolver",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
    "name": "revokeMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "role", "type": "bytes32"}, {
        "internalType": "address",
        "name": "account",
        "type": "address"
    }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_resolver", "type": "address"}],
    "name": "setResolver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
    "name": "supportsInterface",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}];

export default EASRegistrationContract;
