# Nouns

Nouns DAO uses a fork of Compound Governance.

*This reference implementation has not been finalized. It is pending changes to reflect the most recent version of the DAO standard.*

### Members URI

*Demo endpoint: https://jmgfo3l869.execute-api.us-east-1.amazonaws.com/nouns/members/1/1*

In this implementation of membersURI, we define a member of the DAO as any address with a voting share OR non-voting shares greater than or equal to zero. votingShares represent the amount of token each address has and is not delegated into another address. nonVotingShares represent the number of tokens one delegated to another address. Also, delegatedShares indicates the total number of tokens delegated to the member’s address.

We add a checkpoint property because the Nouns governance contract keeps track of the voting weights based on the block time by using checkpoints. Nouns governance token contract has a structure named Checkpoint which has two elements; fromBlock and votes. Each time a member transfers tokens to another party delegates the tokens to another party or cancels the delegation this structure for the member will be updated. fromBlock will be changed into the block number in which the change happen and votes will be changed in a proper way based on the transfer of voting right.

Also, it should be mentioned that Nouns governance calculates the voting weight of each member, by calculating the voting power each member had at the starting time of each proposal. So, when a member decides to vote on a specific proposal, the smart contract is using checkpoints of the member to find the amount of voting power the member had in the start time of the proposal (the block time in which that specific proposal is submitted).

So, to have the members and their voting power on each proposal we need to keep track of the checkpoints and votingShares, nonVotingShares and delegatedShares related to each of the checkpoints of the members.

(For optimization we can just calculate the start time of the oldest ongoing proposal and remove the objects with checkpoints lesser than that from the membersURI JSON)

We add "delegatee-ethereum-address" field to specify to which address the member delegated their voting right.

```json
{

   "@context": {

       "members": "<https://daostar.org/members>",

       "member": "<https://daostar.org/member>",

       "checkpoint" : "<https://daostar.org/member>",

       "memberId": "<https://daostar.org/memberId>",

       "votingShares": "<https://daostar.org/moloch/votingShares>",

       "nonVotingShares": "<https://daostar.org/moloch/nonvotingShares>",

       "ethereum-address": "<https://daostar.org/EthereumAddress>",

       "delegatee-ethereum-address": "<https://daostar.org/DelegateeEthereumAddress>",

   },

   "members": [{

           "memberId": {

               "@value": "0xabc123",

               "@type": "EthereumAddress"

               "checkpoint" : "12000000"

           },

           "votingShares": "0",

           "nonVotingShares": "100",

           "delegatedShares" : "0",

           "delegatee-ethereum-address" : {

               "@value": "0xabc444",

               "@type": "EthereumAddress"

           }

       },

       "memberId": {

               "@value": "0xdef987",

               "@type": "EthereumAddress"

               "checkpoint" : "12500000"

           },

           "votingShares": "150",

           "nonvotingShares": "0",

           "delegatedShares" : "200",

           "delegatee-ethereum-address" : {

                           "@value": "0xasfh85",

                           "@type": "EthereumAddress"

           }

       }

   ]

}
```

### Proposals URI


