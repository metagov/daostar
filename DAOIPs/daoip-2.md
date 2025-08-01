---
daoip: 2
title: Common Interfaces for DAOs
description: An API for decentralized autonomous organizations (DAOs).
author: Joshua Tan (@thelastjosh), Isaac Patka (@ipatka), Ido Gershtein <ido@daostack.io>, Eyal Eithcowich <eyal@deepdao.io>, Michael Zargham (@mzargham), Sam Furter (@nivida)
discussions-to: https://ethereum-magicians.org/t/eip-4824-decentralized-autonomous-organizations/8362
status: Review
type: 
category: 
created: 2022-02-17
---

## Abstract

An API standard for decentralized autonomous organizations (DAOs), focused on relating on-chain and off-chain representations of membership and proposals.

## Motivation

DAOs, since being invoked in the Ethereum whitepaper, have been vaguely defined. This has led to a wide range of patterns but little standardization or interoperability between the frameworks and tools that have emerged. Standardization and interoperability are necessary to support a variety of use-cases. In particular, a standard daoURI, similar to tokenURI in [ERC-721](https://eips.ethereum.org/EIPS/eip-721), will enhance DAO discoverability, legibility, proposal simulation, and interoperability between tools. More consistent data across the ecosystem is also a prerequisite for future DAO standards.

## Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

Every contract implementing this DAOIP MUST implement the `IERC4824` interface below:

```solidity
pragma solidity ^0.8.1;

/// @title ERC-4824 DAOs
/// @dev See <https://eips.ethereum.org/EIPS/eip-4824>
interface IERC4824 {
    event DAOURIUpdate(address daoAddress, string daoURI);

    /// @notice A distinct Uniform Resource Identifier (URI) pointing to a JSON object following the "ERC-4824 DAO JSON-LD Schema". This JSON file splits into four subsidiary URIs: membersURI, proposalsURI, activityLogURI, and governanceURI. The membersURI SHOULD point to a JSON file that conforms to the "ERC-4824 Members JSON-LD Schema". The proposalsURI SHOULD point to a JSON file that conforms to the "ERC-4824 Proposals JSON-LD Schema". The activityLogURI SHOULD point to a JSON file that conforms to the "ERC-4824 Activity Log JSON-LD Schema". The governanceURI SHOULD point to a flatfile, normatively a .md file. Each of the JSON files named above MAY be statically-hosted or dynamically-generated. The content of subsidiary JSON files MAY be directly embedded as a JSON object directly within the top-level DAO JSON, in which case the relevant field MUST be renamed to remove the "URI" suffix. For example, "membersURI" would be renamed to "members", "proposalsURI" would be renamed to "proposals", and so on.
    function daoURI() external view returns (string memory _daoURI);
}
```

The DAO JSON-LD Schema mentioned above:

```json
{
    "@context": "http://www.daostar.org/schemas",
    "type": "DAO",
    "name": "<name of the DAO>",
    "description": "<description>",
    "membersURI": "<URI>",
    "proposalsURI": "<URI>",
    "activityLogURI": "<URI>",
    "governanceURI": "<URI>",
    "contractsURI": "<URI>"
}
```

A DAO MAY inherit the `IERC4824` interface above or it MAY create an external registration contract that is compliant with this DAOIP. Whether the DAO inherits the above interface or it uses an external registration contract, the DAO SHOULD define a method for and implement some access control logic to enable efficient updating for daoURI. If a DAO creates an external registration contract, the registration contract MUST store the DAO’s primary address, typically the address of the primary governance contract. See the reference implementation of external registration contract in the attached assets folder to this DAOIP.

When reporting information in the DAO JSON-LD Schema, if a given field has no value (for example, `description`), it SHOULD be removed rather than left with an empty or `null` value.

### Indexing

If a DAO inherits the `IERC4824` interface from a 4824-compliant DAO factory, then the DAO factory SHOULD incorporate a call to an indexer contract as part of the DAO's initialization to enable efficient network indexing. If the DAO is [ERC-165](https://eips.ethereum.org/EIPS/eip-165)-compliant, the factory can do this without additional permissions. If the DAO is _not_ compliant with ERC-165, the factory SHOULD first obtain access control rights to the indexer contract and then call `logRegistration` directly with the address of the new DAO and the daoURI of the new DAO. Note that any user, including the DAO itself, MAY call `logRegistration` and submit a registration for a DAO which inherits the `IERC4824` interface and which is also ERC-165-compliant.

```solidity
pragma solidity ^0.8.1;

error ERC4824InterfaceNotSupported();

contract ERC4824Index is AccessControl {
    using ERC165Checker for address;

    bytes32 public constant REGISTRATION_ROLE = keccak256("REGISTRATION_ROLE");

    event DAOURIRegistered(address daoAddress);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REGISTRATION_ROLE, msg.sender);
    }

    function logRegistrationPermissioned(
        address daoAddress
    ) external onlyRole(REGISTRATION_ROLE) {
        emit DAOURIRegistered(daoAddress);
    }

    function logRegistration(address daoAddress) external {
        if (!daoAddress.supportsInterface(type(IERC4824).interfaceId))
            revert ERC4824InterfaceNotSupported();
        emit DAOURIRegistered(daoAddress);
    }
}
```

If a DAO uses an external registration contract, the DAO SHOULD use a common registration factory contract linked to a common indexer to enable efficient network indexing. See the reference implementation of the factory contract in the attached assets folder to this DAOIP.

#### Indexing priority
daoURIs may be published directly in the DAO's contract or through a call to a common registration factory contract. In cases where both occur, the daoURI (and all sub-URIs) published through a call to a registration factory contract SHOULD take precedence. If there are multiple registrations, the most recent registration SHOULD take precedence.

### Members

Members JSON-LD Schema. Every contract implementing this DAOIP SHOULD implement a membersURI pointing to a JSON object satisfying this schema. Below, DID refers to [Decentralized Identifiers](https://www.w3.org/TR/2022/REC-did-core-20220719/).

```json
{
    "@context": "https://www.daostar.org/schemas",
    "type": "DAO",
    "members": [
        {
            "id": "<CAIP-10 address, DID address, or other URI identifier>"
        },
        {
            "id": "<CAIP-10 address, DID address, or other URI identifier>"
        }
    ]
}
```

For example, for an address on Ethereum Mainnet, the [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/ad0cfebc45a4b8368628340bf22aefb2a5edcab7/CAIPs/caip-10.md) address would be of the form `eip155:1:0x1234abcd`, while the DID address would be of the form `did:ethr:0x1234abcd`.

In case that Member ID is of alphanumeric or integer type, translate the member ID to the format:
`daoip-2:<DAO Name>:member:<member ID>`

### Proposals

Proposals JSON-LD Schema. Every contract implementing this DAOIP SHOULD implement a proposalsURI pointing to a JSON object satisfying this schema.

In particular, any on-chain proposal MUST be associated to an id of the form CAIP10_ADDRESS + “?proposalId=” + PROPOSAL_COUNTER, where CAIP10_ADDRESS is an address following the CAIP-10 standard and PROPOSAL_COUNTER is an arbitrary identifier such as a uint256 counter or a hash that is locally unique per CAIP-10 address. Off-chain proposals MAY use a similar id format where CAIP10_ADDRESS is replaced with an appropriate URI or URL.

In case that the Proposal is of alphanumeric or integer type, translate the proposal ID to the format:
`daoip-2:<DAO Name>:proposal:<proposal ID>`

```json
{
    "@context": "https://www.daostar.org/schemas",
    "proposals": [
        {
            "type": "proposal",
            "id": "<proposal ID>",
            "name": "<name or title of proposal>",
            "contentURI": "<URI to content/text of the proposal>",
            "discussionURI": "<URI to discussion or thread for the proposal>",
            "status": "<status of proposal>",
            "calls": [
                {
                    "type": "CallDataEVM",
                    "operation": "<call or delegate call>",
                    "from": "<EthereumAddress>",
                    "to": "<EthereumAddress>",
                    "value": "<value>",
                    "data": "<call data>"
                }
            ]
        }
    ]
}
```

When deferenced, contentURI should return the content (i.e. the text) of the proposal. Similarly, discussionURI should return a discussion link, whether a forum post, Discord channel, or Twitter thread.

### Activity Log

Activity Log JSON-LD Schema. Every contract implementing this DAOIP SHOULD implement a activityLogURI pointing to a JSON object satisfying this schema.

```json
{
    "@context": "https://www.daostar.org/schemas",
    "activities": [
        {
            "id": "<activity ID>",
            "type": "activity",
            "proposal": {
                "type": "proposal"
                "id": "<proposal ID>",
            },
            "member": {
                "id": "<CAIP-10 address, DID address, or other URI identifier>"
            }
        } 
    ]
}
```

### Contracts

Contracts JSON-LD Schema. Every contract implementing this DAOIP SHOULD implement a contractsURI pointing to a JSON object satisfying this schema.

contractsURI is especially important for DAOs with distinct or decentralized governance occurring across multiple different contracts, possibly across several chains. Multiple addresses may report the same daoURI.

To prevent spam or spoofing, all DAOs adopting this specification SHOULD publish through contractsURI the address of every contract associated to the DAO, including but not limited to those that inherit the `IERC4824` interface or those that interact with a registration factory contract. Note that this includes the contract address(es) of any actual registration contracts deployed through a registration factory.

```json
{
    "@context": "https://www.daostar.org/schemas",
    "contracts": [
        {
            "id": "<CAIP-10 address, DID address, or other URI identifier>"
            "name": "<name, e.g. Treasury>",
            "description": "<description, e.g. Primary operating treasury for the DAO>"
        },
        {
            "id": "<CAIP-10 address, DID address, or other URI identifier>"
            "name": "<name, e.g. Governance Token>",
            "description": "<description, e.g. ERC20 governance token contract>"
        },
        {
            "id": "<CAIP-10 address, DID address, or other URI identifier>"
            "name": "<name, e.g. Registration Contract>",
            "description": "<description, e.g. ERC-4824 registration contract>"
        }
    ]
}
```

### URI fields
The content of subsidiary JSON files MAY be directly embedded as a JSON object directly within the top-level DAO JSON, in which case the relevant field MUST be renamed to remove the "URI" suffix. For example, `membersURI` would be renamed to `members`, `proposalsURI` would be renamed to `proposals`, and so on. In all cases, the embedded JSON object MUST conform to the relevant schema. A given field and a URI-suffixed field (e.g. `membersURI` and `members`) SHOULD NOT appear in the same JSON-LD; if they do, the field without the URI suffix MUST take precedence.

Fields which are not appended with URI MAY be appended with a URI, for example `name` and `description` may be renamed to `nameURI` and `descriptionURI`, in which case the dereferenced URI MUST return a JSON-LD object containing the `"@context": "https://www.daostar.org/schemas"` field and the original key-value pair.

For example, descriptionURI should return:
```json
{
    "@context": "https://www.daostar.org/schemas",
    "description": "<description>"
}
```

### Entities which are not DAOs

Entities which are not DAOs or which do not wish to identify as DAOs MAY still publish daoURIs. If so, they SHOULD use a different value for the `type` field than "DAO", for example "Organization", "Foundation", "Person", or, most broadly, "Entity".

Entities which are not DAOs or which do not wish to identify as DAOs MAY also publish metadata information through an off-chain orgURI or entityURI, which are aliases of daoURI. If these entities are reporting their URI through an on-chain smart contract or registration, however, they MUST retain `IERC4824`'s daoURI in order to enable network indexing.

The Entity JSON-LD Schema:

```json
{
    "@context": "https://www.daostar.org/schemas",
    "type": "<type of entity>",
    "name": "<name of the entity>",
    "description": "<description>",
    "membersURI": "<URI>",
    "proposalsURI": "<URI>",
    "activityLogURI": "<URI>",
    "governanceURI": "<URI>",
    "contractsURI": "<URI>"
}
```

## Rationale

In this standard, we assume that all DAOs possess at least two primitives: _membership_ and _behavior_. _Membership_ is defined by a set of addresses. _Behavior_ is defined by a set of possible contract actions, including calls to external contracts and calls to internal functions. _Proposals_ relate membership and behavior; they are objects that members can interact with and which, if and when executed, become behaviors of the DAO.

### APIs, URIs, and off-chain data

DAOs themselves have a number of existing and emerging use-cases. But almost all DAOs need to publish data off-chain for a number of reasons: communicating to and recruiting members, coordinating activities, powering user interfaces and governance applications such as Snapshot or Tally, or enabling search and discovery via platforms like DeepDAO, Messari, and Etherscan. Having a standardized schema for this data organized across multiple URIs, i.e. an API specification, would strengthen existing use-cases for DAOs, help scale tooling and frameworks across the ecosystem, and build support for additional forms of interoperability.

While we considered standardizing on-chain aspects of DAOs in this standard, particularly on-chain proposal objects and proposal IDs, we felt that this level of standardization was premature given (1) the relative immaturity of use-cases, such as multi-DAO proposals or master-minion contracts, that would benefit from such standardization, (2) the close linkage between proposal systems and governance, which we did not want to standardize (see “governanceURI”, below), and (3) the prevalence of off-chain and L2 voting and proposal systems in DAOs (see “proposalsURI”, below). Further, a standard URI interface is relatively easy to adopt and has been actively demanded by frameworks (see “Community Consensus”, below).

We added the ability to append or remove the URI suffix to make dereferenced daoURIs easier to parse, especially in certain applications that did not want to maintain several services or flatfiles. Where there is a conflict, we decided that fields without the URI suffix should take precedence since they are more directly connected to the initial publication of daoURI.

In terms of indexing: we believe that the most trustworthy way of publishing a daoURI is through an on-chain registration contract, as it is the clearest reflection of the active will of a DAO. It is also the primary way a DAO may “overwrite” any other daoURI that has previously been published, through any means. If a DAO inherits daoURI directly through its contract, then this information is also trustworthy, though slightly less so as it often reflects the decisions of a DAO framework rather than the DAO directly.

### membersURI

Approaches to membership vary widely in DAOs. Some DAOs and DAO frameworks (e.g. Gnosis Safe, Tribute), maintain an explicit, on-chain set of members, sometimes called owners or stewards. But many DAOs are structured so that membership status is based on the ownership of a token or tokens (e.g. Moloch, Compound, DAOstack, 1Hive Gardens). In these DAOs, computing the list of current members typically requires some form of off-chain indexing of events.

In choosing to ask only for an (off-chain) JSON schema of members, we are trading off some on-chain functionality for more flexibility and efficiency. We expect different DAOs to use membersURI in different ways: to serve a static copy of on-chain membership data, to contextualize the on-chain data (e.g. many Gnosis Safe stewards would not say that they are the only members of the DAO), to serve consistent membership for a DAO composed of multiple contracts, or to point at an external service that computes the list, among many other possibilities. We also expect many DAO frameworks to offer a standard endpoint that computes this JSON file, and we provide a few examples of such endpoints in the implementation section.

We encourage extensions of the Membership JSON-LD Schema, e.g. for DAOs that wish to create a state variable that captures active/inactive status or different membership levels.

### proposalsURI

Proposals have become a standard way for the members of a DAO to trigger on-chain actions, e.g. sending out tokens as part of a grant or executing arbitrary code in an external contract. In practice, however, many DAOs are governed by off-chain decision-making systems on platforms such as Discourse, Discord, or Snapshot, where off-chain proposals may function as signaling mechanisms for an administrator or as a prerequisite for a later on-chain vote. (To be clear, on-chain votes may also serve as non-binding signaling mechanisms or as “binding” signals leading to some sort of off-chain execution.) The schema we propose is intended to support both on-chain and off-chain proposals, though DAOs themselves may choose to report only on-chain, only off-chain, or some custom mix of proposal types.

**Proposal ID**. In the specification, we state that every unique on-chain proposal must be associated to a proposal ID of the form CAIP10_ADDRESS + “?proposalId=” + PROPOSAL_COUNTER, where PROPOSAL_COUNTER is an arbitrary string which is unique per CAIP10_ADDRESS. Note that PROPOSAL_COUNTER may not be the same as the on-chain representation of the proposal; however, each PROPOSAL_COUNTER should be unique per CAIP10_ADDRESS, such that the proposal ID is a globally unique identifier. We endorse the CAIP-10 standard to support multi-chain / layer 2 proposals and the “?proposalId=” query syntax to suggest off-chain usage.

**ContentURI**. In many cases, a proposal will have some (off-chain) content such as a forum post or a description on a voting platform which predates or accompanies the actual proposal.

**Status**. Almost all proposals have a status or state, but the actual status is tied to the governance system, and there is no clear consensus between existing DAOs about what those statuses should be (see table below). Therefore, we have defined a “status” property with a generic, free text description field.

| Project | Proposal Statuses |
| --- | --- |
| Aragon | Not specified |
| Colony | [‘Null’, ‘Staking’, ‘Submit’, ‘Reveal’, ‘Closed’, ‘Finalizable’, ‘Finalized’, ‘Failed’] |
| Compound | [‘Pending’, ‘Active’, ‘Canceled’, ‘Defeated’, ‘Succeeded’, ‘Queued’, ‘Expired’, ‘Executed’] |
| DAOstack/ Alchemy | [‘None’, ‘ExpiredInQueue’, ‘Executed’, ‘Queued’, ‘PreBoosted’, ‘Boosted’, ‘QuietEndingPeriod’] |
| Moloch v2 | [sponsored, processed, didPass, cancelled, whitelist, guildkick] |
| Tribute | [‘EXISTS’, ‘SPONSORED’, ‘PROCESSED’] |

**ExecutionData**. For on-chain proposals with non-empty execution, we include an array field to expose the call data. The main use-case for this data is execution simulation of proposals.

### activityLogURI

The activity log JSON is intended to capture the interplay between a member of a DAO and a given proposal. Examples of activities include the creation/submission of a proposal, voting on a proposal, disputing a proposal, and so on.

_Alternatives we considered: history, interactions_

### governanceURI

Membership, to be meaningful, usually implies rights and affordances of some sort, e.g. the right to vote on proposals, the right to ragequit, the right to veto proposals, and so on. But many rights and affordances of membership are realized off-chain (e.g. right to vote on a Snapshot, gated access to a Discord). Instead of trying to standardize these wide-ranging practices or forcing DAOs to locate descriptions of those rights on-chain, we believe that a flatfile represents the easiest and most widely-acceptable mechanism for communicating what membership means and how proposals work. These flatfiles can then be consumed by services such as Etherscan, supporting DAO discoverability and legibility.

We chose the word “governance” as an appropriate word that reflects (1) the widespread use of the word in the DAO ecosystem and (2) the common practice of emitting a governance.md file in open-source software projects.

_Alternative names considered: description, readme, constitution_

### contractsURI

Over the course of community conversations, multiple parties raised the need to report on, audit, and index the different contracts belonging to a given DAO. Some of these contracts are deployed as part of the modular design of a single DAO framework, e.g. the core, voting, and timelock contracts within Open Zeppelin / Compound Governor. In other cases, a DAO might deploy multiple multsigs as treasuries and/or multiple subDAOs that are effectively controlled by the DAO. contractsURI offers a generic way of declaring these many instruments so that they can be efficiently aggregated by an indexer.

contractsURI is also important for spam prevention or spoofing. Some DAOs may spread governance power and control across multiple different governance contracts, possibly across several chains. To capture this reality, multiple addresses may wish to report the same daoURI, or different daoURIs with the same name<!-- or the same ID-->. However, unauthorized addresses may try to report the same daoURI or name<!--, or ID -->. Additional contract information can prevent attacks of this sort by allowing indexers to weed out spam information.

_Alternative names considered: contractsRegistry, contractsList_

### Why JSON-LD

We chose to use JSON-LD rather than the more widespread and simpler JSON standard because (1) we want to support use-cases where a DAO wants to include members using some other form of identification than their Ethereum address and (2) we want this standard to be compatible with future multi-chain standards. Either use-case would require us to implement a context and type for addresses, which is already implemented in JSON-LD.

Further, given the emergence of patterns such as subDAOs and DAOs of DAOs in large organizations such as Synthetix, as well as L2 and multi-chain use-cases, we expect some organizations will point multiple DAOs to the same URI, which would then serve as a gateway to data from multiple contracts and services. The choice of JSON-LD allows for easier extension and management of that data.

### **Community Consensus**

The initial draft standard was developed as part of the DAOstar roundtable series, which included representatives from all major EVM-based DAO frameworks (Aragon, Compound, DAOstack, Gnosis, Moloch, OpenZeppelin, and Tribute), a wide selection of DAO tooling developers, as well as several major DAOs. Thank you to all the participants of the roundtable. We would especially like to thank Fabien of Snapshot, Jake Hartnell, Auryn Macmillan, Selim Imoberdorf, Lucia Korpas, and Mehdi Salehi for their contributions.

In-person events for community comment were held at Schelling Point 2022, ETHDenver 2022, ETHDenver 2023, DAO Harvard 2023, DAO Stanford 2023 (also known as the Science of Blockchains Conference DAO Workshop). The team also hosted over 50 biweekly community calls as part of the DAOstar project.

## Backwards Compatibility

Existing contracts that do not wish to use this specification are unaffected. DAOs that wish to adopt the standard without updating or migrating contracts can do so via an external registration contract.

## Security Considerations

This standard defines the interfaces for the DAO URIs but does not specify the rules under which the URIs are set, or how the data is prepared. Developers implementing this standard should consider how to update this data in a way aligned with the DAO’s governance model, and keep the data fresh in a way that minimizes reliance on centralized service providers.

Indexers that rely on the data returned by the URI should take caution if DAOs return executable code from the URIs. This executable code might be intended to get the freshest information on membership, proposals, and activity log, but it could also be used to run unrelated tasks.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
