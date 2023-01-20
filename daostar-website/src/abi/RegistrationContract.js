const RegistrationContract = [
  {
    "inputs": [
      { "internalType": "address", "name": "_template", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [], "name": "ArrayLengthsMismatch", "type": "error" },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "daoAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "daoURI",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "registration",
        "type": "address"
      }
    ],
    "name": "NewRegistration",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "by", "type": "address" },
      { "internalType": "bytes32", "name": "salt", "type": "bytes32" }
    ],
    "name": "registrationAddress",
    "outputs": [
      { "internalType": "address", "name": "addr", "type": "address" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "salt", "type": "bytes32" },
      { "internalType": "string", "name": "daoURI_", "type": "string" },
      { "internalType": "address", "name": "manager", "type": "address" },
      { "internalType": "address[]", "name": "contracts", "type": "address[]" },
      { "internalType": "bytes[]", "name": "data", "type": "bytes[]" }
    ],
    "name": "summonRegistration",
    "outputs": [
      { "internalType": "address", "name": "registration", "type": "address" },
      { "internalType": "bytes[]", "name": "results", "type": "bytes[]" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "template",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
]

export default RegistrationContract;