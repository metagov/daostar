---
daoip: 5
title: Grants Management
description: Data standards for grants systems
discussions-to: https://github.com/metagov/daostar/discussions/51
status: Draft
type: 
category: 
author: Joshua Tan <josh@metagov.org>, Tyler Sullberg <tysullberg@gmail.com>, Eugene Leventhal <eugene@metagov.org>, Kevin Olsen <kevinolsen@gitcoin.co>, Riccardo Lamanna
created: 2023-11-14
---

# Simple summary
Common interfaces and data structures for grants management, including a common application for grants.

# Motivation
As the Web3 space has grown in recent years, grant programs run by protocols and projects have themselves exploded in size and popularity. Over a billion dollars in capital have been deployed or committed, grant programs have come and gone, and many organizations are now assessing the progress and impact of their issued funding. 

There have been a wide range of approaches, from transparent (e.g. Aave) or closed (e.g. Ethereum Foundation and Solana Foundation) to communally architected (e.g. Stacks Foundation) to being launched by a compensated team (e.g. Mantle), from prospective (e.g. Uniswap Foundation) to retroactive (e.g. Optimism) to research-focused (e.g. Protocol Labs Research Grants) to quadratically funded (e.g. Gitcoin), to RFP-based (i.e. Protocol Labs, Uniswap Foundation, Solana Foundation, etc.). The diversity of thought on how to best run such programs has led to innovative approaches for grants management but has also fragmented capital and reduced transparency.

This specification lays out a common set of on- and off-chain interfaces for grant programs looking to deploy funding and for projects looking to receive funding. It is intended to increase interoperability between grants tooling, improve the transparency of grant programs, and ultimately make grant programs more efficient for funders, administrators, and grantees. In particular, this specification lays the groundwork for a “common application” for grants as well as easier coordination between grants programs.

# Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

This specification is organized into four main components:
1. Grant systems
2. Grant pools
3. Projects
4. Applications

While eligibility and compliance flows (including KYC) are important in grants systems, we decided to not include them within the scope of the current specification. Similarly, we have decided not to standardize interactions with voting and payout systems, though these are also common aspects of grants.

## Grants systems
A grants system represents the top-level governance or administration of a grant pool or grant program, typically identified as an organization such as a foundation or DAO. All organizations and entities adopting DAOIP-5, even those not deployed or organized as DAOs, MUST publish a daoURI with the additional field "grantPoolsURI" either via DAOIP-2 or through a trusted issuer via DAOIP-3. This bootstraps indexing and discovery of grant pools via the existing on-chain indexing infrastructure for daoURI.

```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<name of the entity>",
  "type": "<entity type, e.g. DAO or Foundation>",
  "grantPoolsURI": "<URI declaring any grant pools maintained by the entity>",
}
```

## Grant pools
A grant pool is funding locked in a smart contract or other fundable object with the intention of being used to pay out grants. Here, a grant pool is defined to be a subtype of `DAO` in the sense of [DAOIP-2](DAOIP-2.md), but one which does not necessarily publish its own on-chain daoURI.

A grant pool adopting this specification MUST publish additional metadata about its processes and status through the Grant Pool JSON-LD Schema below. Unless otherwise noted, all fields in the Grant Pool JSON-LD Schema are REQUIRED. In particular, a grant pool MUST publish an `applicationsURI` field, which in more detail in the Applications section, below. If a grant system operates multiple grant pools, they MAY add additional elements to the array below.

Grant Pool JSON-LD Schema
```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<name of the entity>",
  "type": "<entity type, e.g. DAO or Foundation>",
  "grantPools": [
    {
      "type": "GrantPool",
      "id": "<The CAIP-10 address of the grant pool contract OR the CAIP-10 address of the grants system contract + "?id=" + pool_counter.>",
      "name": "<The name of the grant pool.>",
      "description": "<A description of the grant pool.>",
      "isOpen": "<OPTIONAL: A Boolean yes/no indicating whether the grant pool is open to or seeking new applications.>",
      "closeDate": "<OPTIONAL: The ISO DateTime at which the grant pool will stop taking new applications.>",
      "applicationsURI": "<A URI pointing to a service for handling communication over applications, including receiving applications and publishing information about current and past applications following the DAOIP-5 Applications JSON-LD Schema.>",
      "governanceURI": "<A URI pointing to additional information about the governance, requirements, and criteria for the grant, normatively a .md file.>",
      "attestationIssuersURI": "<RECOMMENDED: A URI pointing to a JSON of trusted issuers of attestations and credentials about the grant pool, following the DAOIP-3 Attestation Issuers JSON-LD Schema.>",
      "requiredCredentials": ["<RECOMMENDED: An array of attestation types, following DAOIP-3 Attestations for DAOs.>"],
      "email": "<OPTIONAL: A working email address through which the grant pool can respond to inquiries and requests.>",
      "image": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a square logo.>",
      "coverImage": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a large, rectangular background image.>"
    }
  ]
}
```

## Projects
Projects represent persistent projects, teams, or individuals that intend to submit applications to one or more grant pools or programs. In this specification, a project represents the “common” portion of an application for grant funding. In other words, to publish a `projectsURI` is to create an open application for funding.

For efficient indexing, all projects adopting DAOIP-5, even individuals and teams not organized as DAOs, MUST publish a daoURI with the additional field "projectsURI" either via DAOIP-2 or through a trusted issuer via DAOIP-3. Unless otherwise noted, all fields in the Projects JSON-LD Schema are REQUIRED.

```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<name of the entity>",
  "type": "<entity type, e.g. DAO or Person>",
  "projectsURI": "<A URI pointing to a JSON of projects seeking grant funding following the DAOIP-5 Projects JSON-LD Schema.>"
}
```

In this specification, an application is a subtype of `Proposal` in the sense of [DAOIP-2](DAOIP-2.md). This means that on-chain applications MUST publish an id of the form `CAIP10_ADDRESS + "?proposalId=" + PROPOSAL_COUNTER`, where `CAIP10_ADDRESS` is the CAIP-10 address of the proposing team or individual and `PROPOSAL_COUNTER` is an arbitrary identifier such as a uint256 counter or a hash that is locally unique per CAIP-10 address. Off-chain proposals MAY use a similar id format where `CAIP10_ADDRESS` is replaced with an appropriate URI or URL.

Projects JSON-LD Schema
```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<name of the entity>",
  "type": "<entity type, e.g. DAO or Person>",
  "projects": [
    {
    "type": "Project",
    "id": "<The uid of the proposal, in the format specified above.>",
    "name": "<The name of the project.>",
    "description": "<A description of the project.>",
    "contentURI": "<A longer description of the project forming the core of a pitch for the project, including such things as activities proposed, milestones, team, impact assessment, past history, contact information, and so on. Normatively, this should be a Markdown file.>",
    "email": "<OPTIONAL: A working email address through which the project can respond to grant inquiries and requests.>",
    "membersURI": "<OPTIONAL: A URI pointing to a JSON of members of the project, following the DAOIP-2 Members JSON-LD Schema.>",
    "attestationIssuersURI": "<RECOMMENDED: A URI pointing to a JSON of trusted issuers of attestations and credentials about the project and its members, following the DAOIP-3 Attestation Issuers JSON-LD Schema.>",
    "relevantTo": "<OPTIONAL: An array of (GrantPool id, GrantPool name) intended to call attention to specific grant pools for which this project is relevant. This does not constitute a formal grant application unless recognized by the grant pool.>",
    "image": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a square logo.>",
    "coverImage": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a large, rectangular background image.>"
  }
  ]
}
```

Following [DAOIP-3](DAOIP-3.md), a project, just like a DAO, SHOULD name a number of issuers who are trusted to publish verifiable credentials and other attestations on behalf of the project and its members. These attestations form an important and often required part of a project’s application. For example, different issuers may publish attestations related to the verified identity of a project, ownership over a Twitter or GitHub account, the work history of its members, as well as email contact information and other forms of personally-identifiable information.

## Applications
When a project applies for a grant from a particular grant pool or when a grant pool records a project for funding consideration, it is called a grant application or application to that pool.

In this specification, an application is a subtype of `Proposal` in the sense of [DAOIP-2: Common Interfaces for DAOs](DAOIP-2.md). This means that on-chain applications MUST publish an id of the form CAIP10_ADDRESS + "?proposalId=" + PROPOSAL_COUNTER, where CAIP10_ADDRESS is the CAIP-10 address of the grant pool and PROPOSAL_COUNTER is an arbitrary identifier such as a uint256 counter or a hash that is locally unique per CAIP-10 address. Note that applications to the grant pool MAY count as proposals to the larger entity maintaining the grants system; if so, that choice SHOULD be reflected in the design of PROPOSAL_COUNTER. Off-chain proposals MAY use a similar id format where CAIP10_ADDRESS is replaced with an appropriate URI or URL.

Every grant system and grant pool adopting DAOIP-5 MUST publish an applicationsURI which returns the id, name, and description of all pending and past applications to the grant pool, following the schema below. Other application data MAY be published by the grant pool or system.

Applications JSON-LD Schema
```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<name of the entity>",
  "type": "<type of the entity, e.g. DAO or Foundation>",
  "grantPools": [
    {
    "type": "GrantPool",
    "name": "<The name of the grant pool.>",
    "applications": [
      "type": "GrantApplication",
      "id": "<The uid of the proposal, in the format specified above.>",
      "grantPoolsURI": "<A URI pointing to the grant pools published by the entity.>",
      "grantPoolId": "<The id of the grant pool.>",
      "grantPoolName": "<The name of the grant pool.>",
      "projectsURI": "<The URI of an organization’s projects applying for grant funding.>",
      "projectId": "<The id of the project.>",
      "projectName": "<The name of the project.>",
      "createdAt": "<ISO DateTime>",
      "contentURI": "<A URI pointing to the publicly accessible content of the application.>"
      "discussionsTo": "<OPTIONAL: A URI pointing to a fixed channel, e.g. a forum discussion thread or messaging chat, where the granter(s), grantee(s), and other stake can discuss the grant.>",
      "fundsAsked": [
        {
        "amount": "<The amount of funding asked>”,
        "denomination": "<The denomination of currency asked>)"
        }
      ],
      "fundsApproved": [
        {
        "amount": "<The amount of funding approved>”,
        "denomination": "<The denomination of currency approved>)"
        }
      ],
      "payoutAddress": {
      	"type": "<e.g. EthereumAddress, CAIP10Address, IBAN, SWIFT/BIC, etc.>",
      	"value": "<subject's identifier, e.g. their Ethereum address, CAIP-10 address, IBAN, etc.>"
      },
      "isEligible": <OPTIONAL: A Boolean true/false indicating that an application is eligible (e.g. by fulfilling all required criteria) for consideration by the grant pool.>,
      "isReviewed": <OPTIONAL: A Boolean true/false indicating that an eligible grant has been reviewed by the grant pool.>,
      "isApproved": <OPTIONAL: A Boolean true/false indicating that an eligible grant has been approved for funding by the grant pool.>,
      "isPaid": <OPTIONAL: A Boolean true/false indicating that an approved grant is fully paid, and no additional funds should be expected from the grant pool.>,
      "payouts": [ <OPTIONAL>
        {
        "type": "<The type of the payout transaction, e.g. CallDataEVM.>",
        "value": {"<The values of the payout transaction, e.g. operation, from, to, value, data, and so on.>"}
        "proof": "<The transaction hash or other evidence that the payout was made.>",
        } 
      ]
    }
  ]
}
```

# Rationale
The intention of this standard is to facilitate aggregation and transparency.. It is not intended to define precise on-chain implementations. There is also an increasing appetite for coordination amongst grant programs in order to share learnings, to create a shared database for approved grants where improved methods grantee progress and impact measurement can be experimented with, support the idea of a “common application” for grants, and to limit ‘grant farming’—projects purely looking to apply to quick and easy money with limited-to-no intention of contributing to the ecosystem beyond a single grant or portion of a grant. 

In order for any additional collaboration and aggregation to take place, a data standard would lay the foundation for such work. There has been some inter-program collaboration to date, however, those efforts have been driven purely based on social connections. With the adoption of this standard, it will be possible for DAOstar to coordinate a series of efforts and working groups that can be much easier to opt-into for any relevant and reputable grant program to join. 

This standard will be able to be the backbone for:
1. Increasing accountability and transparency for anyone who wants to explore data across grant programs.
2. Improving impact measurement by building a shared database of approved grants that can be integrated with Karma’s Grantee Accountability Protocol. This makes it possible for public tracking for the progress of the grant both during and after the time when the grant is executed. By collaborating with relevant organizations such as Karma and OS Observer, these efforts can provide shared learnings on how to best capture and track impact data on top of the kind of the grant data outlined in this standard.
3. Exploring a grant common app that would a) make applying across grant programs (and coordinating grant requests across these programs) significantly easier and b) make it possible for there to be a reputation layer for grantees that integrates with all grant tech stacks. 
4. Creating a social infrastructure across all groups that choose to adopt the standard as well as those broadly interested in any of the aforementioned efforts to a) provide best practices, b) coordinate on supporting research on grant program improvement, c) create high value communication channels across programs, and d) to coordinate on virtual and in-person events/workshops to help advance the state of granting in web3. 

## Example: a common application
Suppose Chiyo has an idea for an open-source project, “Shoes Protocol”, and wants to apply to three grant pools: Optimism via Charmverse, the Ethereum Foundation via their in-house system, and a Gitcoin grant round. Assume that Charmverse, Ethereum Foundation, and Gitcoin have all adopted DAOIP-5, i.e are publishing a `grantPoolsURI’ as part of daoURI.

To apply, Chiyo first publishes a projectURI. She can do this by deploying a daoURI registration contract following daoURI, or by filling out a form via an issuer like Gitcoin or Charmverse in order to publish a projectURI (and daoURI) as an attestation.

In this case, Chiyo uses Gitcoin to publish. Following DAOIP-3, Gitcoin deploys the following on-chain attestation via EAS, which is then signed by Chiyo:

```json
{
  "sig": {
    "domain": {
      "name":"EASAttestation",
      "version":"0.26",
      "chainId":1,
      [...],
      "signature":{[...]},
      "uid":"0xabcd1234",
      "message":{
      "version":1,
      "schema":"0x123schemahash456",
      "recipient":"0x0000000000000000000000000000000000000000",
      "time":1234567890,
      "expirationTime":10000,
      "refUID":"0x0000000000000000000000000000000000000000000000000000000000000000",
      "revocable":false,
      "data":"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001234abcd0000000000000000000000000000",
      "nonce":0
    }
  },
  "signer":"0x1234abcd"
}
```

Effectively, the data decodes into a string representing the address of Chiyo’s daoURI, as generated by Gitcoin as Chiyo’s issuer. Let’s say that Chiyo’s (temporary) daoURI is https://gitcoin.co/attestations/ChiyoShark13/daoURI/. Going to her `daoURI` then returns the following:

```json
{
  "@context": "http://www.daostar.org/schemas",
  "type": "Person",
  "name": "ChiyoShark13",
  "projects": [
    {
      "type": "Project",
      "id": "<eth:0x1234abcd?proposalId=1>",
      "name": "Shoes Protocol",
      "description": "We help people move around and understand each other.",
      "contentURI": "https://gitcoin.co/projects/0xabcd1234cdef/",
      "email": "chiyo.shark13@coolprojects.com>",
      "membersURI": "",
      	"attestationIssuers": [
      		{
      			"type": "AttestationIssuer",
      			"name": "Gitcoin",
      			"issuer": "<https://gitcoin.co/attestations/>",
      		}
      	],
      "relevantTo": "",
      "image": "",
      "coverImage": ""
    }
  ],
}
```

Chiyo has now published a public project profile through Gitcoin, which is further indexed through her `daoURI`. Note that, in this case, Gitcoin has replaced `projectsURI` with `projects` (i.e. embedded the data from `projectsURI` directly into the JSON returned by `daoURI`) and `attestationIssuersURI` with `attestationIssuers` so that we do not need to break apart the data into three separate JSON requests.

Now that Chiyo’s data is published through daoURI, it is indexed through publicly-available indexers and subgraphs and can be read by Charmverse and the Ethereum Foundation, among other grants. However, Chiyo

In order for Chiyo to apply for grants, one of two things need to happen: she can apply directly to the grant pool using her profile, OR a grant pool can generate an application for her automatically based on analysis of her profile, grant content, and/or attestations and credentials.

In this case, she manually applies to two grant pools that she finds through Gitcoin’s interface: the Web3 Community grant round, and the Metagov Research grant round. Once she applies, Gitcoin publishes the following information:

```json
{
"@context": "http://www.daostar.org/schemas",
"name": "Gitcoin",
"type": "DAO",
"grantPools": [
{
	"type": "GrantPool",
	"id": "eip155:424:0x1234abcd",
	"name": "Web3 Community",
	"applications": [
		{
"type": "GrantApplication",
"id": "eip155:424:0x1234abcd?proposal=1.>",
"grantPoolsURI": "<A URI pointing to the grant pools published by the entity.>",
"grantPoolId": "<The id of the grant pool.>",
"grantPoolName": "<The name of the grant pool.>",
"projectsURI": "<The URI of an organization’s projects applying for grant funding.>",
"projectId": "<The id of the project.>",
"projectName": "<Shoes Protocol>",
"createdAt": "<2023-11-14T15:52:25Z>",
"contentURI": "<A URI pointing to the publicly accessible content of the application.>"
"discussionsTo": "<OPTIONAL: A URI pointing to a fixed channel, e.g. a forum discussion thread or messaging chat, where the granter(s), grantee(s), and other stake can discuss the grant.>",
"fundsAsked": [
{
"amount": "5000”,
"denomination": "USDC"
}
],
"fundsApproved": [
{
"amount": "”,
"denomination": ""
}
],
"payoutAddress": {
	"type": "<e.g. EthereumAddress, CAIP10Address, IBAN, SWIFT/BIC, etc.>",
	"value": "<subject's identifier, e.g. their Ethereum address, CAIP-10 address, IBAN, etc.>"
},
"isEligible": true,
"isReviewed": false,
"isApproved": false,
"isPaid": false,
"payouts": "",
}
]
}
	]
}
```

Chiyo goes on to win all three grants, and the data from each program can be indexed and fed to a shared grants database or service such as Karma’s Grant Accountability Protocol (GAP), which is itself DAOIP-5 compliant. Updates on GAP feedback to the shared database, which can then be audited by the grant programs.

## Grants system
We contemplated introducing an additional grants system schema which would serve as a container for a single organization, foundation, or DAO to manage multiple grant pools (e.g. as part of a yearly grant or a fundraising round). But there are many potential management schemes for grant pools. Rather than introduce additional fields and architecture to support these systems, we decided to abstract that functionality into the organization / DAO itself and require only that the DAO publish a `grantPoolsURI` field. In other words, while we expect roles, permissions, and decision-making procedures to be defined at the level of a grant system, we decided not to include those in this specification because (1) we did not want to enforce a specific on-chain implementation of roles and permissions and (2) roles and permissions are sufficiently modular that they can specified in a separate specification.

We also considered having grant pools publish a `managerURI` field that, normatively, points at a daoURI.

We decided that all organizations should declare a daoURI. Some organizations, e.g. L1 foundations may not have a single on-chain address that represents their governance.

Note that multiple organizations may report the same grant pool.

## Grant pool
The proposed grant pool design is designed to facilitate clear publication of the behavior, eligibility and decision-making criteria, and performance of grant pools while remaining flexible with respect to many different program designs including Gitcoin-style “rounds”, rolling applications/funding periods, retroactive funding, custom payout and refund logic, bounty programs and hackathons, and so on.

In general, our design expects grant pools to publish significantly more ongoing performance information than projects. In this way, we pose grant pools as objects somewhat similar to investment portfolios. This is for two reasons: (1) to help potential applicants sort through relevant grant pools and (2) to foster productive forms of transparency in grants administration (not all transparency is desirable), especially to external donors, community governance, and fund partners. We believe this will lead to both more professionalization in grants administration and stronger outcomes from grants. Grant pools also occupy a clear position of power vis-a-vis projects, and can thus affect the behavior of many projects. By using this power wisely, a relatively small group of grant pools can create systematic change in the entire ecosystem.

We decided to just restrict the scope of grant pools to just on-chain instruments, i.e. those with a unique CAIP-10 address, though we briefly contemplated supporting other fundable objects as well, e.g. Paypal accounts, Stripe wallets, Open Collective collectives, and traditional bank accounts.

We also discussed including a manager field to name the person, DAO, or entity managing the grant pool, but felt this aspect of governance was sufficiently abstracted in the grants system. 

We considered adding an optional allowlist for both tokens and funders. The funder allow list can be important for KYC while the token allowlist allows an organization to control what kinds of contributions can be made to the grant pool (e.g. only stablecoins and the native token of the DAO). We decided that these fields could be added and tested in future specifications.

## Projects
Applications to a grant pool are very similar to generic proposals to a DAO. However, individual projects often apply to multiple grant pools or multiple times to a single grant pool, for example multiple Gitcoin rounds or a co-funding round for a public good supported by many DAOs. For this purpose, we define projects separately from applications, and store them as an additional form of metadata attached to an organization, DAO, or other entity.

Thus a project represents the common, public portion of an organization’s grant application, whereas an application represents a particular proposal, at a specific time, by a particular project, to a particular grant pool. Project metadata contains the information that will be common between all applications (e.g. description, website, credentials, etc), while application metadata contains information relevant for that particular grant pool (e.g. responses to particular grant applications, the status of the application, etc.).

Projects can accumulate history and reputation, as well as reduce the amount of redundant information that needs to be entered on each application. It also helps grant pools to actively seek out projects rather than only passively accepting applications. 

Project data can be published by an entity or DAO that is applying to grant pools or by an independent issuer (often a grant system administrator such as Gitcoin or Allo) that helps submit project data as applications to multiple grant pools. Originally, we intended projectsURI to be published by a grant system operator, i.e. as a list of projects who had applied. However, in contemplating a “common application” as well as co-funding grants, we decided to allow projectsURI to be published by the applicants themselves. This makes project creation and maintenance permissionless and decentralized (a project can point projectsURI at a Markdown file hosted anywhere, e.g. on GitHub), while allowing grant programs to organize their internal application data in whatever way makes sense to them.

A number of issues that we considered but either descoped or decided not to include:
- we considered specifying a full “common application” interface that makes it easier to submit and vet applications as well as fields that might be useful for such a common application, but decided not to because it could be better scoped in another standard.
- it was tempting to define projects as reflections of grant pools, i.e. as smart contracts or fundable objects with the intention of being used to receive grants. Ultimately, we decided that it was more essential that a “project” in this specification reflect the actual project rather than the vehicle through which the project receives or manages funds. Further, projects may require all sorts of complicated payout schemes (escrow, multiple parties) that may not reflect a single payout address.
- we did not resolve in this specification whether to attach, how to attach, and how to validate the grant history of a project, e.g. through a “previousSuccessfulProposals” field. Currently, for example Gitcoin does this with subgraphs, though the history is organized per grant pool rather than per project.

### Credentials, attestationIssuersURI, and membersURI
Credentials (e.g. ownership of a token or NFT, verification of Twitter ownership, verification of GitHub repository ownership) are important parts of a grant application, as they can serve as effective forms of gating and anti-spam. Earlier versions of the standard included a `projectCredentialsURI` with an undefined schema for attestations, but this was phased out to adopt a cleaner `attestationIssuersURI` following DAOIP-3. `attestationIssuersURI` supports use-cases for verifications, but can also be easily extended to cover work history / profiles of the members, granting history, and other forms of reputation.

Similarly, we included membersURI so that attestations about members of the project (Web3 CVs, profiles, and reputatoin) can be automatically pulled and included in the project.

In asking projects to name only the issuers rather than provide the attestations themselves, we expect grant pools themselves to pull the requisite data (e.g. as named in the `requiredCredentials` field) from a project’s named issuers; it is then the responsibility of the project to make sure that these attestations are available.

### Privacy
It is often convenient to associate an email address to a project. We considered a few options for publishing emails, given that emails are often a form of private and personally identifiable information. In this specification, we decided that there is no expectation of privacy for emails published through this standard. Later standards, including future iterations of this specification, may choose to publish an encrypted email field as part of the Projects JSON and then attach a key or other data through which a grant pool operator can decrypt the field. Alternately, emails may be sent only through a private application and removed entirely from this specification.

## Applications
In general, applications can be dynamic, i.e. a funding ask may change over the course of an application or a joint applicant may drop out. Applications, unlike projects, may also be private, and include private information such as email addresses, KYC, and other forms of personally identifiable information. Most applications also require supplementary materials and answers to questions beyond that present in the project. We cannot and do not specify what all applications should look like.

A key component of the grant process that is missing in the current specification is a standard description of how applications may be submitted to a grant pool. Just as with generic proposals, there are many ways in which applications may submitted to a grant program (on-chain, forums, in-house systems, dedicated grant software, or form services such as Typeform or Google Forms, etc.).

An application can be thought of as a relation between one entity or DAO (the applicant) and another entity or DAO (the grant pool). We considered how to extend the proposal logic into a many-to-many relation, i.e. a proposal involving many projects (as in a joint application) as well as many grant pools (as in a co-funding round). While potentially useful, these transactions are much rarer than traditional grant applications. For the sake of scope we decided that this was better left for a different specification.

## Community consensus
The specification above was based on discussions by a large working group of industry operators including Gitcoin, Solana, Optimism, OpenQ, Clr.fund, Questbook, DaoLens, Station, and others. It was also based on an extended study of different grant programs and grant tooling for DAOs and other Web3 projects. We have reproduced some of the diagrams associated with that research below. We will extend this section in future versions of this draft.

# Acknowledgements
Thank you to Andrea Franz, Aditya Anand, Balazs Nemethi, Apoorv Nandan, Tina He, Carl Cervone, and Amandeep.

# Copyright
Copyright and related rights waived via CC0.
