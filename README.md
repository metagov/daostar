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
  * Version: N/A
  * TheGraph: [daostar](https://thegraph.com/hosted-service/subgraph/ipatka/daostar)
* **EIP4824Registration**
  * Contract: [0x2F8E0Eb8969715BdA8bf6e9b768850A1581fB358](https://etherscan.io/address/0x2f8e0eb8969715bda8bf6e9b768850a1581fb358)
  * Version: N/A
* **EIP4824RegistrationSummoner**
  * Contract: [0x2Dac5DBbF1D024c1E0D9c92D3AeDa7618e15aDd7](https://etherscan.io/address/0x2dac5dbbf1d024c1e0d9c92d3aeda7618e15add7)
  * Version: N/A
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
