# Moloch

*This reference implementation has not been finalized. It is pending changes to reflect the most recent version of the DAO standard.*

### Members URI

```jsx
{
	"@context": {
		"members": "https://daostar.org/members",
		"member": "https://daostar.org/member",
		"memberId": "https://daostar.org/memberId",
		"votingShares": "https://daostar.org/moloch/votingShares",
		"nonvotingShares": "https://daostar.org/moloch/nonvotingShares",
		"ethereum-address": "https://daostar.org/EthereumAddress"
	},
	"members": [{

			"memberId": {
				"@value": "0xabc123",
				"@type": "ethereum-address"
			},
			"votingShares": "100",
			"nonvotingShares": "50"
		},
		{

			"memberId": {
				"@value": "0xdef987",
				"@type": "ethereum-address"
			},
			"votingShares": "150",
			"nonvotingShares": "25"
		}
	]
}
```

This expands to...

```jsx
[
  {
    "https://daostar.org/members": [
      {
        "https://daostar.org/memberId": [
          {
            "@type": "https://daostar.org/EthereumAddress",
            "@value": "0xabc123"
          }
        ],
        "https://daostar.org/moloch/nonvotingShares": [
          {
            "@value": "50"
          }
        ],
        "https://daostar.org/moloch/votingShares": [
          {
            "@value": "100"
          }
        ]
      },
      {
        "https://daostar.org/memberId": [
          {
            "@type": "https://daostar.org/EthereumAddress",
            "@value": "0xdef987"
          }
        ],
        "https://daostar.org/moloch/nonvotingShares": [
          {
            "@value": "25"
          }
        ],
        "https://daostar.org/moloch/votingShares": [
          {
            "@value": "150"
          }
        ]
      }
    ]
  }
]
```

### Proposals URI

Note that `executionData` is blank because Moloch v2 DAOs do not have arbitrary external interaction abilities without using minion helper contracts.

```jsx
{
	"@context": {
      "@vocab": "http://daostar.org/"

	},
	"proposals": [
		{
			"metadata": {
				"proposalId": "[CHAIN_ID][CONTRACT_ADDRESS][PROPOSAL_COUNTER]",
				"title": "<Proposal Title>",
				"contentURI": "https://forum.daohaus.club/example"
			},
			"status": {
				"@type": "daostar:molochv2Status",
				"@value": "sponsored"
			},
          "executionData": {}
		}
	]
}
```

This expands to...

```jsx
[
  {
    "http://daostar.org/proposals": [
      {
        "http://daostar.org/executionData": [
          {}
        ],
        "http://daostar.org/metadata": [
          {
            "http://daostar.org/contentURI": [
              {
                "@value": "https://forum.daohaus.club/example"
              }
            ],
            "http://daostar.org/proposalId": [
              {
                "@value": "[CONTRACT_ADDRESS][PROPOSAL_COUNTER]"
              }
            ],
            "http://daostar.org/title": [
              {
                "@value": "<Proposal Title>"
              }
            ]
          }
        ],
        "http://daostar.org/status": [
          {
            "@type": "daostar:molochv2Status",
            "@value": "sponsored"
          }
        ]
      }
    ]
  }
]
```

### governanceURI

governanceURI leads to an IPFS hosted markdown file with information about the DAO’s purpose.

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
			"proposal": "[DAO_CONTRACT_ADDRESS][PROPOSAL_COUNTER]",
			"result": {
				"choice": "yes",
				"weight": {
					"@type": "shares",
					"@value": 150
				}
			},
			"timestamp": "2021-01-01"
		}
	]
}
```

This expands to...

```jsx
[
  {
    "http://daostar.org/activity": [
      {
        "http://daostar.org/interactionType": [
          {
            "@value": "vote"
          }
        ],
        "http://daostar.org/proposal": [
          {
            "@value": "[DAO_CONTRACT_ADDRESS][PROPOSAL_COUNTER]"
          }
        ],
        "http://daostar.org/result": [
          {
            "http://daostar.org/choice": [
              {
                "@value": "yes"
              }
            ],
            "http://daostar.org/weight": [
              {
                "@type": "http://daostar.org/shares",
                "@value": 150
              }
            ]
          }
        ],
        "http://daostar.org/timestamp": [
          {
            "@value": "2021-01-01"
          }
        ],
        "http://daostar.org/voter": [
          {
            "@type": "http://daostar.org/ethereum-address",
            "@value": "0xabc123"
          }
        ]
      }
    ]
  }
]
```

## Moloch v2.1++

In Moloch V2 we extend the concept of proposal flags to include a URI proposal type. The DAO URI is queried via a standard interface. It is changed through submitting, sponsoring, voting on, and processing DAO URI change proposals

[https://github.com/Moloch-Mystics/Molochv2.1/tree/daostar-ref-impl](https://github.com/Moloch-Mystics/Molochv2.1/tree/daostar-ref-impl)

```jsx
interface IEIP_TBD {
    function daoURI() external view returns (string memory); 
}

function submitUriProposal(string memory newURI) public nonReentrant returns (uint256 proposalId);

function processUriProposal(uint256 proposalIndex) public nonReentrant;

// EVENTS
event ProcessUriProposal(uint256 indexed proposalIndex, uint256 indexed proposalId, bool didPass);
```

## Moloch v3++

In Moloch V3 we have generic action proposals so all we need to add is a URI state variable and a setter. This can then be updated through standard governance flows.

[https://github.com/Moloch-Mystics/Baal/tree/daostar-ref-impl](https://github.com/Moloch-Mystics/Baal/tree/daostar-ref-impl)

```jsx
interface IEIP_TBD {
    function daoURI() external view returns (string memory); 
}

function setDaoUri(string memory _newUri) external baalOnly;
```

## Legacy Adapter Minion

For Moloch DAOs that were launched pre-DAOstar they can use and EIP_TBD minion contract with a DAO URI field. This works very similarly to the Moloch V3 example above

```jsx
interface IEIP_TBD {
    function daoURI() external view returns (string memory); 
}

function setDaoUri(string memory _newUri) external minionOnly;
```

-
