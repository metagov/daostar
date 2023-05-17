# Governor Improvement

This document summarizes the various efforts to iterate 
on the Governor Smart Contracts. The Governor Smart Contracts 
are a set of contracts that enable decentralized governance 
for projects and communities.

## Customizations

These are some possible ways to customize the 
Governor Smart Contracts to suit different needs and preferences:

- **Multisig with veto power over passed proposals.** This allows a group of trusted parties to have the final say over any proposal that passes the voting process.  Several DAOs have this setup.
- **Rarible's staked token wrapper.** This allows users to stake their tokens in exchange for voting power and rewards. This can incentivize participation and alignment of interests among voters.
- **Fei's Optimistic Governor.** This allows proposals to be executed immediately after passing the voting process, without waiting for a timelock delay. This can speed up the governance process and reduce the risk of external interference. However, this also requires a higher quorum and majority threshold to pass proposals.
- **Aave's dual-token model.** This allows users to delegate their voting power to another address without transferring their tokens. This can increase the liquidity and security of the tokens, while still enabling participation in governance.
- **Aave's dual-timelock model.** This allows proposals to have different timelock delays depending on their risk level. This can balance the trade-off between efficiency and safety in governance.
- **0x's quadratic voting.** This allows users to vote with a quadratic function of their tokens, rather than a linear one. This can reduce the influence of large token holders and encourage more diverse opinions in governance.
- **Flexible voting.** This allows users to vote with any ERC20 token that meets certain criteria, rather than a fixed token. This can increase the inclusivity and diversity of governance.  [(repo)](https://github.com/ScopeLift/flexible-voting)

## Extensions

These are some possible ways to extend the functionality of the Governor Smart Contracts without modifying them:

- **Gnosis Guild's Zodiac Governor module.** This allows users to create modular and composable governance systems using different components and connectors. This can enable more flexibility and interoperability in governance.
- **Uniswap's delegation franchiser.** This allows users to create sub-governance systems that delegate their voting power to a parent governance system. This can enable more scalability and experimentation in governance.  [(repo)](https://github.com/NoahZinsmeister/franchiser)
- **Getty's Community Proposal Factories.** This allows users to create templates for common types of proposals and generate them with minimal input. This can lower the barriers and costs of participation in governance.  [(repo)](https://gfx.cafe/getty/governancelegos)
- **Uniswap's cross-chain governance setup.** This allows users to vote on proposals that affect multiple chains using a single token. This can enable more coordination and collaboration across different ecosystems.
- **Metropolis pods with DAO as the admin.** This allows users to create groups of voters that share a common interest or goal and vote as a collective entity. This can enable more representation and cohesion in governance.

## Nouns-specific Implementations

These are some features that are either live or in progress for Nouns DAO, a project that uses the Governor Smart Contracts:

### Live

- **Vetoer multisig:** A multisig contract that has the power to veto any proposal that passes the voting process within a certain time window. This is useful for preventing early attacks when the token distribution is still growing slowly.
- **Dynamic quorum:** A quorum threshold that adjusts based on the participation rate of previous proposals. This is useful for ensuring that proposals have sufficient support from the community, while avoiding stagnation due to low turnout.
- **Gas refund on votes:** A mechanism that refunds voters for their gas costs when they vote on proposals. This is useful for incentivizing participation and reducing friction in governance.

### In progress

- **Propose by sigs:** A mechanism that allows anyone to create proposal candidates by collecting signatures from voters, rather than spending tokens or gas. This is useful for lowering the barriers and costs of creating proposals, while still requiring some proof of support from the community.
- **Proposal update period:** A period at the beginning of each proposal where the proposer can update their proposal based on feedback from the community, without resetting the voting clock. This is useful for improving the quality and alignment of proposals, while still respecting the time constraints of governance.
- **Conditional objection period:** A period at the end of each proposal where voters can withdraw their support if they change their mind or if new information emerges, unless a certain percentage of voters object to extending the voting period. This is useful for preventing last-minute swings due to voter apathy or manipulation, while still allowing for flexibility and responsiveness in governance.
- **DAO split:** A mechanism that allows a group of voters to exit the DAO with their share of the treasury and create a new DAO with a different governance system. This is useful for resolving irreconcilable conflicts or disagreements within the community, while still preserving the value and autonomy of the participants.

### Backlog

These are some features that are planned or considered for future development for Nouns DAO:

- **Choice rank proposals:** A mechanism that allows voters to rank multiple proposals according to their preferences, rather than choosing one or none. This is useful for expressing more nuanced opinions and finding the most agreeable option in governance.
- **Dynamic friction:** A mechanism that adjusts the difficulty of passing proposals based on their risk level. For example, the more ETH a proposal wants to spend, the higher the quorum, majority, and timelock requirements could be. This is useful for balancing efficiency and safety in governance, while still allowing for innovation and experimentation.
- **Delegate override:** A mechanism that allows token holders to override their delegates' votes on specific proposals, if they disagree with them. This is useful for ensuring accountability and alignment of interests among delegates and their constituents, while still enabling delegation and scalability in governance.
