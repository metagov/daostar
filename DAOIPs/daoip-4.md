---
daoip: 4
title: Proposal Types
description: Standard templates for DAO proposals
discussions-to: 
status: Draft
type: 
category: 
author: George Beall <george@commonwealth.im>, Ivan Fartunov <ivan@aragon.org>, Rolf Hoefer <rolf.l.hoefer@gmail.com>, Alex Poon <alex.poon@charmverse.io>, and Joshua Tan <josh@metagov.org>, 
created: 2023-02-03
---

## Abstract

Standard templates and an extensible type system for DAO proposals, based on a wide inventory of existing proposals.

## Motivation
Much governance in DAOs passes through proposals. Yet there is no standard or agreement on what characterizes good proposals versus bad proposals. Further, there are a wide spectrum of proposal types that many DAOs are not aware of or do not understand. And for DAO builders and tooling operators, there has been relatively little progress on improving or building on top of specific proposal types, at least partly because the ecosystem has yet to coalesce around a set of basic types. As a result, many DAOs struggle with how to implement governance to make effective group decisions. 

We aim to document best practices and establish proposal standards so DAOs can operate more effectively. These standards include a strategic map of governance proposals, templates for written proposals, and a metadata standard for all governance proposals. Our research focused on the major existing governance activity and is meant to create an actionable resource that captures core parts of governance.

## Specification
For the purposes of this paper, we define a DAO proposal as a formal, written submission to a DAO’s governance platform, including both on-chain contracts and their associated management interfaces (e.g. Compound, Moloch, Aragon, etc.) as well as off-chain community governance platforms such as Discourse, Commonwealth, or Snapshot. These off-chain proposals need not advance to an actual vote, though most successful proposals do.

To identify the proposal types, we looked through 6,500 written proposals from 18 of the most active DAOs and identified the most common workflows. We also considered (1) common workflows of new DAOs as well as rarer and more sophisticated proposals that are still currently being developed. As we went through the proposals and bucketed by category, we identified the most thorough proposals, key information needed by proposal category, and proposals that effectively followed through on the proposed action. We currently see the following three core proposal types across DAOs:

Treasury (grants, operational budgets, investments, and token distribution)
Protocol (parameter changes and major code upgrades)
Metagovernance (small governance changes, major governance changes, spin-outs, delegate governance, and mergers)

The types described here represent a snapshot of what DAOs can do in 2022. However, the type system we specify below can be extended to cover new proposal types and subtypes.

### Schema
In this standard, we extend the EIP-4824 Proposals JSON-LD Schema with a “proposal-type” field and a dictionary of such proposal types, including: 
* “treasury/grant”
* “treasury/budget”
* “treasury/investment”
* “treasury/other”
* “protocol/small-change”
* “protocol/major-change”
* “protocol/other”
* “metagov/small-change”
* “metagov/major-change”
* “metagov/delegate-governance”
* “metagov/spinout”
* “metagov/merger”
* “metagov/other”

### Proposal type
| **Proposal type**                           | **Category**   | **Frequency** | **In standard?** |
|---------------------------------------------|----------------|-----------|--------------|
| treasury/grant                              | Treasury       | Common    | Yes          |
| treasury/investment                         | Treasury       | Common    | Yes          |
| metagov/delegate-governance                 | Metagovernance | Uncommon  | Yes          |
| metagov/small-change                        | Metagovernance | Uncommon  | Yes          |
| metagov/spinout                             | Metagovernance | Rare      | Yes          |
| metagov/major-change                        | Metagovernance | Epic      | Yes          |
| metagov/merger                              | Metagovernance | Legendary | Yes          |
| protocol/small-change                       | Protocol       | Uncommon  | Yes          |
| protocol/major-change                       | Protocol       | Epic      | Yes          |
| treasury/airdrop                            | Treasury       | Common    | No           |
| treasury/token-swap                         | Treasury       | Rare      | No           |
| treasury/token-buyback                      | Treasury       | Epic      | No           |
| metagov/delegate-governance/delegate-tokens | Metagovernance | Rare      | No           |
| metagov/entity-to-dao                       | Metagovernance | Legendary | No           |
| metagov/crosschain                          | Metagovernance | Legendary | No           |
| metagov/dao-to-entity                       | Metagovernance | Legendary | No           |
| Elections                                   | Other          | Epic      | No           |
| IP Licensing                                | Other          | Unknown   | No           |
| Dispute resolution                          | Other          | Unknown   | No           |

### Treasury Proposals
For many early-stage DAOs, the financial assets held in their treasury are the main shared resource being governed by the DAO. The DAO’s strategy shapes and is shaped by the funding or defunding specific initiatives, making treasury proposals both common and important. We are categorizing “treasury proposals” as all proposals that relate to the transfer of assets from addresses controlled directly by the DAO. There are multiple types of treasury actions that we broadly bundle together into categories labeled as: Grants, Operational Budgets, Investments, and Other Token Distributions.

Most treasury proposals share this similar template:
TLDR: An overall summary of the proposal
Description / scope of work - an explanation of the work to be completed / actions to be taken
Rationale / objectives - what will be the outcome of the work, and how will it contribute toward the betterment of the specific DAO
Deliverables - how will success of the initiative be measured
Team - individuals (can be anonymous) or organizations who will be responsible for the successful execution of the related work
Budget - amount and denomination (typically DAO governance token or USD-pegged stablecoin) of the request, use of funds breakdown, and receiving address

#### Grants
Grants usually fund one-off initiatives perceived as creating value for the DAO’s ecosystem. Examples include product/protocol modules, code reviews, relevant research, bd/growth initiatives, and ecosystem support initiatives. When the grant amount or delivery duration is significant, proposals can include milestones and some quantitative metrics on what constitutes successful delivery. To ensure accountability and sustainability, DAOs that disburse substantial amounts in grant funding typically have more structured processes and dedicated teams (e.g. AAVE, Uniswap). When the initiative benefits multiple DAOs, disclosing other funding applications can serve as a positive social signal.

##### Examples
https://forum.apecoin.com/t/aip-83-proposal-for-apefi-to-receive-apecoin-token-grant-ecosystem-fund-allocation/7447
https://discourse.nouns.wtf/t/proposal-nounish-friends-nouns-town-collectible-figures-and-more-by-bigshottoyworks/967
https://gov.uniswap.org/t/proposal-paid-uniswap-chat-support/7520

#### Operational budgets 
Operational budgets usually fund continuous workstreams and value-creating initiatives. Examples include product/protocol development, growth, and operations. Workstream funding proposals are typically bound to specific timeframes (e.g. seasons, quarters) and have well-articulated qualitative and quantitative deliverables. Often the teams performing specific workstreams remain consistent across timeframes.

##### Examples
https://forum.makerdao.com/t/mip40c3-sp68-modify-protocol-engineering-core-unit-budget-pe-001/13797
https://commonwealth.im/dydx/discussion/2511-drc-dydx-grants-program
https://forum.badger.finance/t/bip-35-long-term-core-contributors/3006

#### Investments
A defining hallmark of investment proposals is that the DAO trades treasury assets for another asset it anticipates to increase in value. Examples can be on-chain (tokens, vesting tokens, NFTs, staked tokens) and off-chain (any traditional world asset). Investments can be purely market driven or also strategically driven. Strategic decisions can be driven by partner incentive alignment, meta-governance, or M&A.

##### Examples
https://forum.badger.finance/t/bip-49-opolis-strategic-investment-integration/4071
https://research.lido.fi/t/treasury-diversification-2/2570
https://gov.pooltogether.com/t/ptip-11-treasury-diversification/963
https://forum.rook.fi/t/kip-5-acquire-cvx-position/174

#### Other
The “treasury/other” proposal type includes other treasury-related proposals such as airdrops, liquidity mining, and bounties.

These proposals are still undergoing rapid development. Liquidity mining and airdrop schemes were the tried and true method in 2020-2021 but have lost favor in 2022; Token holders are often biased when approving these methods since these schemes can either directly increase or decrease their individual net worth.

##### Examples
https://governance.aave.com/t/introducing-gho/8730
https://gov.pooltogether.com/t/1-million-weekly-prizes-pool-distribution/1055
https://forum.badger.finance/t/bip-14-digg-distribution-overview/1210
https://forum.gnosis.io/t/gip-64-should-gnosisdao-distribute-safe-tokens-to-incentivize-decentralizing-gnosis-chain/5896

### Protocol Proposals
Protocol proposals are used to drive changes in a product controlled by the DAO, especially on-chain products. These changes can be large and small. For small and low-risk changes including inflation rate and yield rate adjustments, a lightweight proposal can be used. Additional rigor and communications will be required for high-risk changes such as major product updates. Major changes often are accompanied by audits.

We identify 3 categories of protocol proposals: major code upgrades, parameter changes and others.

#### Major code upgrades
Major code upgrades happen often in a protocol/product when DAOs address community needs or security issues. Given the potential impact, additional rigor such as audits must be applied. These changes are often complex, requiring deliberate communication across different levels of the community.

For example, in February 2021, MakerDAO proposed a redesign of the DAO’s liquidation system. The proposal suggested replacing the existing English-style auction system, where bids start low, with a new Dutch-style auction system, where auction prices generally start high and then drop over time. The proposal took almost 2 months to ratify. Multiple scenarios were mapped out and four separate audits were done. The proposal gathered 45 comments with 9.2k views.

##### Template
Title: What is a clear and comprehensive explanation of the change?
Summary: Why does there need to be a change?
Specification: What change should be made?
Known Risk: What might go wrong?
Audits: Who audited the code and what were the results?

##### Examples
https://governance.aave.com/t/arc-aave-governance-v3/6980
https://tribe.fei.money/t/fei-v2-design-discussion/3467
https://forum.thegraph.com/t/indexer-cut-simplification-proposal/2522
https://www.comp.xyz/t/rfp12-implementation-ctoken-cleanup/2694

#### Parameter changes to protocol or product (Small)
Sometimes, smaller changes in parameters or features will need to be voted on but the proposals carry much lower risks. In these cases, a lightweight proposal can be voted on and quickly carried out. In Sept 2020, Uniswap proposed to add the $UNI/$ETH pool to the list of pools eligible for rewards. The whole proposal was 2 sentences. 

##### Template
Description of situation: What is the current setting and what is driving a change?
Technical analysis: What analysis went into your recommended changes?
Recommendations: What should the DAO change?
Next Steps: How will the DAO evaluate success? When should the DAO evaluate for another update?

##### Examples 
https://governance.aave.com/t/arc-ltv-and-liquidation-threshold-levels-2021-08-26/5467
https://gov.curve.fi/t/add-a-gauge-for-the-ankr-reward-earning-staked-matic-amaticb-on-polygon-network/3011
https://governance.aave.com/t/arc-aave-v2-liquidity-mining-program-90-days-at-30-reduced-rate/5946

#### Other
There are other potential types of proposals relating to the governance of an on-chain protocol/product that the DAO controls. As the industry matures and specific categories emerge we can introduce more granular classification.

### Metagovernance Proposals
Metagovernance proposals cover changes to the on- and off-chain governance mechanisms of the DAO. Examples include changes to the core smart contracts that encode voting, quorum, timelock, and upgradeability as well as changes to the use of off-chain modules like Snapshot, SourceCred, or Commonwealth. Metagovernance proposals apply not just to DAOs themselves but also to the governance of subgroups and subDAOs. Compared to other proposals, metagovernance proposals are relatively uncommon, since they affect the “bones” of the DAO.

Many treasury and governance proposals such as token swaps, airdrops, and responses to hacks and exploits (ref. Ethereum’s response to The DAO hack, or Juno’s response to the Juno whale) can have a big impact on governance. Since they do not substantially change the governance procedures, but rather the relative governance weight within the set proceduate, they are not metagovernance proposals. As a rule of thumb, governance and treasury proposals change the state of a contract while metagovernance proposals change the contract itself.

We identified four major categories of metagovernance proposals: proposals about small changes to on-chain governance, major changes to on-chain governance, changes to off-chain governance, spin-outs, and mergers and acquisitions.

#### Small changes to on-chain governance
The simplest metagovernance proposal involves small changes to the governance parameters of a DAO’s smart contracts, e.g. changing quorum, timelock duration, or voting thresholds. Despite the fact that these are “small” changes (and are often supported directly in a DAO framework’s management interfaces), in practice they can substantially change the operational structure and distribution of power in a DAO.

##### Template
Title: What is a complete and transparent title for the proposed change?
Current Situation: Why should we care about changing the parameter?
Proposed Change: What is the parameter set to and what should it be?
Anticipated Impact: What do you expect will change?

##### Example
https://gov.uniswap.org/t/urgent-discussion-on-current-vote-reduce-uni-governance-proposal-quorum-thresholds/7117
https://gov.uniswap.org/t/proposal-reduce-amount-of-unis-required-to-submit-governance-proposal/3320
https://research.lido.fi/t/increase-proposal-threshold-within-lidos-snapshot-space/2158

#### Major governance changes
Sometimes a DAO needs to make larger changes to its governance, e.g. migrating from Compound Governor Alpha to Compound Governor Bravo. Typically these metagovernance proposals take the form of contract migrations, but they can also involve the creation of subDAO structures. Additionally, they can involve the use of off-chain governance structures as well, such as moving governance forums, adopting off-chain voting methods, etc.

##### Template
Title: What is a complete and transparent title for the proposed change?
Summary: Briefly, what needs to change and why? 
Motivation: Why does the governance structure need a change?
Previous Governance Structure: How does the current governance work?
Proposed Changes: What does the proposed system look like?
Specs: What do each of the changes do? How can they be attacked?
Next Steps: Assuming positive reception, what happens?

##### Examples
https://tribe.fei.money/t/fip-82-governance-enhancements/3945
https://forum.sushi.com/t/sushi-governance-process-and-cadence/6429
https://tribe.fei.money/t/fip-21-optimistic-approval/3429
https://research.lido.fi/t/ldo-steth-dual-governance/2382
https://governance.aave.com/t/arc-aave-governance-v3/6980
https://tribe.fei.money/t/fip-30-upgrade-dao-to-oz-governor/3532
https://gov.yearn.finance/t/yip-61-governance-2-0/10460

#### Delegate governance
Delegation is a common workflow for governance, as people allocate their voting power to a council, i.e. a multisig, to a subDAO which is relatively open, or to a third-party service. Oftentimes these delegates are investors, early contributors, college blockchain clubs, or professional service organizations.

A variant on the simple voting power delegation model we are currently seeing emerge includes models such as Element Finance’s and Optimism’s delegation models. In these models, delegates must first receive a significant amount of delegation above a set threshold, in order to be granted special powers. Once significantly large delegates form, they take on a broader set of powers within the DAO.

##### Template
Personal Information: Name/pseudonym, contact information, address, etc.
Current voting power: What is the total of owned voting power and delegations
Past Participation: Have you been actively involved in the community
Why you should be a delegate: What is your experience and track record
What you want to see happen: What changes are you pushing for in the project
Web3 Interests: What are you a SME for? What are your favorite projects/themes?
Conflicts of interest: Are you an active delegate or investor in competing projects?
Additional information: Anything else that might help delegates verify themselves as good candidates

##### Examples 
https://commonwealth.im/dydx/discussion/3781-endorsed-delegates-profile-and-pitch
https://commonwealth.im/element-finance/discussion/4146-introducing-the-call-for-delegates-members-of-the-governance-steering-council
https://gov.optimism.io/t/delegate-commitments/235
https://tribe.fei.money/t/tribal-council-process/4298

#### Spin-outs
In a spin-out proposal, the DAO formally “exits” a product or unit that originally existed within the DAO. Sometimes this occurs after a formal incubation process (e.g. Gnosis DAO spinning out Gnosis Safe or Cowswap), while in others it occurs because the parent DAO no longer wishes to support the spin-out in-house (e.g. Gitcoin DAO’s marketing team).

A spin-out, unlike a typical sub-DAO, is fully independent of the parent DAO, though it may share custody or have usage rights over certain assets like trademarks and brand assets. It may or may not be a DAO itself. Lawyers may need to be involved.

##### Template
Summary: Briefly describe what is specifically getting separated into a new DAO, how is the token getting allocated, and who is the new team?
Motivation: Why should this asset get spun-out into a new DAO? Do the current DAO members benefit from the spin-out?
Token Usage: What is the purpose of the new token?
Token Supply: What is the total supposed to be?
Token Distribution: Who is receiving a share of the new token, how much, and why?
New Team Overview: Will they move the existing team over, hire a new team, or aim for an automated team? What is their background and experience?
Relationship with old DAO: How will the assets transition? How much support will there be at transition and on an ongoing basis? Is there a shared governance or treasury?
Next Steps: What else needs to happen?

##### Examples
https://forum.gnosis.io/t/gip-13-phase-2-cowdao-and-cow-token/2735
https://forum.gnosis.io/t/gip-29-spin-off-safedao-and-launch-safe-token/3476

#### Mergers and acquisitions
In a DAO-to-DAO acquisition, one DAO acquires controlling governance rights over another DAO. This can happen through a negotiated offer to purchase governance tokens or through a hostile takeover. In a DAO merger, two or more DAOs combine into one entity—where “entity” may be a new DAO, a set of shared smart contracts, or a single legal entity—typically accompanied by some exchange of rights and/or tokens and some level of operational integration and a “community merge” (for example, the 2021 Fei and Rari merger). As of 2022, few examples of DAO acquisitions or mergers exist.

DAOs can also acquire non-DAO projects. Though we haven’t seen this in the wild yet, we anticipate this to be a form of M&A in the future. An adjacent example is when Red Hat acquired Kubernetes security startup StackRox in 2022 before turning it into a vendor-neutral open source project.

##### Examples
https://tribe.fei.money/t/fip-51-fei-rari-token-merge/3642
https://tribe.fei.money/t/merger-quick-eli5/3754

#### Other
DAO governance and metagovernace are still early. As the space continues to evolve, there will be need to be adjustments to governance in order to adapt to new standards. This will drive continued experimentation with metagovernance.

## Conclusion
DAOs are a rapidly developing organizational structure. Currently, they conduct actions either on-chain or off-chain, depending on the requirements of the organization. These actions are either deploying the shared treasury, acting upon the protocol’s established governance structures, or changing the protocol’s established governance structures. Many of the subcategories of proposals and best examples have been established by DeFi DAOs, leading to a skew in standards. We anticipate that DAO proposal types will continue to see evolution as new forms of DAOs are created. We will be publishing a submission form for people to submit new proposal formats and examples of proposals. Additionally, we only looked at proposals in live DAOs, but future research should focus on exit-to-community and gradual decentralization schemes.

## Acknowledgements
We are grateful for comments and contributions from Joanna Giang, Rhys Hillier, and Daniel Ospina.

## Copyright
Copyright and related rights waived via CC0.
