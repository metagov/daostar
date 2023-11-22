# DAOstar: DAO Standards
## Introduction

This repo contains the website for [daostar.org](https://daostar.org) as well as reference implementations, schemas, and other assets related to DAO standards, DAO Improvement Proposals (DAOIPs), including but not limited to EIP-4824: Common Interfaces for DAOs.

It is maintained by [DAOstar One](https://daostar.one) with support from [Metagov](https://metagov.org).

## Contracts Deployments
These contracts are used to register on DAOstar website.

### Mainnets
#### Ethereum
* **EIP4824Index**
  * Contract: [0x4f2c9028fE7107d9f1A8a9CFf34aa2d3F28600fa](https://etherscan.io/address/0x4f2c9028fe7107d9f1a8a9cff34aa2d3f28600fa)
  * TheGraph: [daostar](https://thegraph.com/hosted-service/subgraph/ipatka/daostar)
  * Version: 1.0
* **EIP4824Registration**
  * Contract: [0x2F8E0Eb8969715BdA8bf6e9b768850A1581fB358](https://etherscan.io/address/0x2f8e0eb8969715bda8bf6e9b768850a1581fb358)
  * Version: 1.0
  * Contract: [0x58E593f2100Fa06dA34935C1B35Fd78Aaa32479a](https://etherscan.io/address/0x58e593f2100fa06da34935c1b35fd78aaa32479a) ( **Deprecated** )
  * Version: 0.0
* **EIP4824RegistrationSummoner**
  * Contract: [0x2Dac5DBbF1D024c1E0D9c92D3AeDa7618e15aDd7](https://etherscan.io/address/0x2dac5dbbf1d024c1e0d9c92d3aeda7618e15add7)
  * Version: 1.0
  * Contract: [0x37dF3fC47C1c3A2acaFd2Dad9c1C00090a8655Bc](https://etherscan.io/address/0x37df3fc47c1c3a2acafd2dad9c1c00090a8655bc) ( **Deprecated** )
  * Version: 0.0
#### Optimism
* **EIP4824Index**:
  * Contract: [0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4](https://optimistic.etherscan.io/address/0x18cbb356cd64193b1a0ca49911fc72cb3d02a5e4)
  * TheGraph: [daostar-optimism](https://thegraph.com/hosted-service/subgraph/crazyyuan/daostar-optimism)
* **EIP4824Registration**
  * Contract: [0x65D17d117C190f7A4cc784b56a17E3f7Edde5762](https://optimistic.etherscan.io/address/0x65D17d117C190f7A4cc784b56a17E3f7Edde5762)
  * Version: 1.0.0
* **EIP4824RegistrationSummoner**
  * Contract: [0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4](https://optimistic.etherscan.io/address/0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4)
  * Version: 1.0.0
### Testnets
#### Ethereum-goerli
* **EIP4824Index**:
    * Contract: [0xA7A2948Bad8d439d714ac72Dee4A1ac879745244](https://goerli.etherscan.io/address/0xA7A2948Bad8d439d714ac72Dee4A1ac879745244)
    * TheGraph: [daostar-goerli](https://thegraph.com/hosted-service/subgraph/ipatka/daostar-goerli)
* **EIP4824Registration**
    * Contract: [0xAEefc45ad77242788FEE3e615642cD9c2c1261A8](https://goerli.etherscan.io/address/0xAEefc45ad77242788FEE3e615642cD9c2c1261A8)
    * Version: N/A
* **EIP4824RegistrationSummoner**
    * Contract: [0x3271B3479f7485DAdB2bD5FFF43EEb4367B1a91a](https://goerli.etherscan.io/address/0x3271b3479f7485dadb2bd5fff43eeb4367b1a91a)
    * Version: N/A
#### Optimism-goerli
* **EIP4824Index**:
    * Contract: [0x9aff4e5e7a7ae449b89162ef4798b2bb60dc92c0](https://goerli-optimism.etherscan.io/address/0x9aff4e5e7a7ae449b89162ef4798b2bb60dc92c0)
    * TheGraph: [daostar-optimism-goerli](https://thegraph.com/hosted-service/subgraph/rashmi-278/daostar-optimism-goerli)
* **EIP4824Registration**
    * Contract: [0xc9cb7ecedd8a6d544348512a53ff52abf4d9d863](https://goerli-optimism.etherscan.io/address/0xc9cb7ecedd8a6d544348512a53ff52abf4d9d863)
    * Version: 1.0.0
* **EIP4824RegistrationSummoner**
    * Contract: [0x45E81552DEC1F57c18E3cbd69549252624b96D98](https://goerli-optimism.etherscan.io/address/0x45E81552DEC1F57c18E3cbd69549252624b96D98)
    * Version: 1.0.0
#### Arbitrum-goerli
* **EIP4824Index**:
    * Contract: [0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4](https://goerli.arbiscan.io/address/0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4)
    * TheGraph: [daostar-arbitrum-goerli](https://thegraph.com/hosted-service/subgraph/crazyyuan/daostar-arbitrum-goerli)
* **EIP4824Registration**
    * Contract: [0x65D17d117C190f7A4cc784b56a17E3f7Edde5762](https://goerli.arbiscan.io/address/0x65D17d117C190f7A4cc784b56a17E3f7Edde5762)
    * Version: 1.0.0
* **EIP4824RegistrationSummoner**
    * Contract: [0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4](https://goerli.arbiscan.io/address/0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4)
    * Version: 1.0.0
#### BNB-bruno
* **EIP4824Index**:
    * Contract: [0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4](https://testnet.bscscan.com/address/0x18cbb356cd64193b1a0ca49911fc72cb3d02a5e4)
    * TheGraph: [daostar-bnb-bruno](https://thegraph.com/hosted-service/subgraph/crazyyuan/daostar-bnb-bruno)
* **EIP4824Registration**
    * Contract: [0x65D17d117C190f7A4cc784b56a17E3f7Edde5762](https://testnet.bscscan.com/address/0x65D17d117C190f7A4cc784b56a17E3f7Edde5762)
    * Version: 1.0.0
* **EIP4824RegistrationSummoner**
    * Contract: [0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4](https://testnet.bscscan.com/address/0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4)
    * Version: 1.0.0


## How to add new network support for DAOstar

### 1. Deploy smart contracts 

Deploy Registration.sol and get three contract addresses

**Reference folder:**
https://github.com/metagov/daostar/tree/main/contracts/src

**For example:**

*OP Mainnet*

[EIP4824Index](https://optimistic.etherscan.io/address/0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4)
[EIP4824Registration](https://optimistic.etherscan.io/address/0x65D17d117C190f7A4cc784b56a17E3f7Edde5762)
[EIP4824RegistrationSummoner](https://optimistic.etherscan.io/address/0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4)

### 2. Add network to supgraph and deploy a new subgraph for that network

Prerequisites for this step:
- Have your The Graph Auth Token initialized 
- Create a subgraph for the new netowork via The Graph Dashboard

1. Add network and contract address of EIP4824Index in this file

**Reference file:**
https://github.com/metagov/daostar/blob/main/Implementations/Subgraph/daostar/networks.json


```
"optimism": {
        "EIP4824Index": {
            "address": "0x18CbB356cd64193b1a0CA49911fc72CB3D02a5E4",
            "startBlock": 109109991
        }
    }
```

2. Add and run build commands

```
"build:optimism": "graph codegen && graph build --network optimism",
```

3. Add and run deploy command

```
"deploy:optimism": "graph deploy --node https://api.thegraph.com/deploy/ crazyyuan/daostar-optimism",
```

4. Get your https api query endpoint url

In this case,
```
https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-optimism
```

### 3. Make the changes to the frontend, deploy and publish

1.  Add API URL 

**Reference file:**
https://github.com/metagov/daostar/blob/main/daostar-website/src/index.js#L36

```
const client = new ApolloClient({
    link: ApolloLink.from([
        new MultiAPILink({
            endpoints: {
                goerli: `https://api.thegraph.com/subgraphs/name/ipatka/daostar-goerli`,
                optimismGoerli: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-optimism-goerli`,
                mainnet: `https://api.thegraph.com/subgraphs/name/ipatka/daostar`,
                gnosis: `https://api.thegraph.com/subgraphs/name/rashmi-278/daostar-gnosis`,
                arbitrumGoerli: `https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-arbitrum-goerli`,
                chapel:`https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-bnb-bruno`,
                optimism: `https://api.thegraph.com/subgraphs/name/crazyyuan/daostar-optimism`

            },
            // defaultEndpoint: 'https://api.thegraph.com/subgraphs/name/ipatka/daostar',
            httpSuffix: "",
            createHttpLink: createHttpLink,
        }),
    ]),
    cache: new InMemoryCache({}),
});

```

2. Set up queries

**Reference file:**
https://github.com/metagov/daostar/blob/main/daostar-website/src/App.js

```
const optimismRes = useQuery(queries.REGISTRATIONS, {
        context: { apiName: "optimism" },
        variables: { id: "optimism" },
    });
    
    
     const {
        loading: optimismLoading,
        error: optimismError,
        data: optimismData,
    } = optimismRes;
    
     if (error || goerliError || optimismGoerliError || arbitrumGoerliError || chapelError || optimismError ) {
        ...
        console.error("Optimism Error" + optimismError)
    };
    
        if (loading || goerliLoading || gnosisLoading || optimismGoerliLoading || arbitrumGoerliLoading || chapelLoading || optimismLoading) return "loading...";

const optimismRegistrations =
        optimismData?.registrationNetwork?.registrations || [];
        
         const allRegistrationInstances = mainnetRegistrations.concat(
       ...
        optimismRegistrations
    );
```

3. Add RegistrationSummoner address here

**Reference file:**
https://github.com/metagov/daostar/blob/main/daostar-website/src/components/Register/RegistrationReceived/RegistrationReceived.js

```
 const factoryContracts = {
    ...
    optimism: `0x5C0340AD34f7284f9272E784FF76638E8dDb5dE4`,

  };
```

4. Add network ID and labels

**Reference file:**
https://github.com/metagov/daostar/blob/main/daostar-website/src/components/Register/RegistrationForm/RegistrationForm.js#L13

https://github.com/metagov/daostar/blob/main/daostar-website/src/components/Register/RegistrationForm/RegistrationForm.js#L213

```
const networkIds = {
    ...
    optimism:10
}

 const EthNetworksSelect = (
        <HTMLSelect
            style={{ minWidth: 140 }}
            iconProps={{ icon: 'caret-down', color: '#fff' }}
            value={daoContractNetwork}
            onChange={onChangeDaoContractNetwork}
            options={[
                { label: 'Mainnet', value: 'mainnet' },
                { label: 'Optimism', value: 'optimism'},
               ...
            ]}
        />
    )
```

5. Make sure build is successful

```
npm run build
```

Now you can commit and publish the changes!

# Licenses

All code in this repository is licensed under the MIT License, except for published standards, which are released to the public domain under [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/).
