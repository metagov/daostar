# DAOstack

*This reference implementation has not been finalized. It is pending changes to reflect the most recent version of the DAO standard.*

### Members URI

Members are defined as any address which owns reputation, which represents the member’s voting power and is non transferable. Reputation is tracked by checkpoints (block numbers).

```jsx
{
	"@context": {
		"@vocab": "http://daostar.org/"
	},
	"members": [{
			"memberId": {
				"@value": "0xabc123",
				"@type": "ethereum-address"
			},
			"reputation": "100",
			"checkpoint": "14000000"
		},
		{
			"memberId": {
				"@value": "0xdef987",
				"@type": "ethereum-address"
			},
			"reputation": "150",
			"checkpoint": "14000100"
		}
	]
}
```

### Proposals URI

Alchemy’s architecture enables any various kinds of proposal types to be used by the DAO. The following is an example of a generic batched call proposal.

```jsx
{
	"@context": {
      "@vocab": "http://daostar.org/"
	},
	"proposals": [
		{
			"metadata": {
				"proposalId": "<proposal_id>",
				"title": "<proposal_title>",
				"contentURI": "https://alchemy.daostack.io/dao//example"
			},
			"status": {
				"@type": "daostar:alchemyStatus",
				"description": "boosted",
				"exist": "true",
				"passed": "false"
			},
      "executionData": {
			"calls": [
			{	
				"@type": "callDataEVM",
				"from": "dao_avatar_address",
				"to": "<address_1>",
				"data": "<call_data_1>",
				"call_type": "call",
				"value": "<call_value_1>"
			} ,
			{
				"@type": "callDataEVM",
				"from": "<dao_avatar_address>",
				"to": "<address_2>",
				"data": "<call_data_2>",
				"call_type": "call",
				"value": "<call_value_2>"
			}]
		}
	]
}
```

### Governance URI

Governance URI leads to an IPFS hosted markdown file with information about the DAO’s purpose.

### Activity Log

```jsx
{
	"@context": {
		"@vocab": "http://daostar.org/"
	},
	"activity": [
		{
			"interactionType": "vote",
			"voter": {
				"@value": "0xabc123",
				"@type": "ethereum-address"
			},
			"proposal": "<proposal_id>",
			"result": {
				"vote": "yes",
				"reputation": {
					"@type": "alchemyReputation",
					"@value": "1000"
				}
			},
			"block": "14000100"
		}
	]
}
```

### Alchemy

```jsx
interface IEIP_TBD {
    function daoURI() external view returns (string memory); 
}

function setDaoUri(string memory _newUri) public onlyOwner returns(bool);
```
