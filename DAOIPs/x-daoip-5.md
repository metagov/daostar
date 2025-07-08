# DAOIP-5 Extensions Field Specification Update

## Summary

This update introduces an optional `extensions` field to all DAOIP-5 schema components to support implementation-specific metadata and experimental features while maintaining backward compatibility and forward extensibility.

## Motivation

As DAOIP-5 implementations mature and diversify, grant programs and tooling providers require a standardized way to include custom metadata that extends beyond the core specification. This need arises from:

1. **Implementation-specific requirements**: Different grant platforms may need additional fields for their unique workflows
2. **Experimental features**: New grant mechanisms or metadata types that haven't been standardized yet
3. **Ecosystem-specific data**: Chain-specific, organization-specific, or domain-specific metadata
4. **Future-proofing**: Allowing innovation without breaking the core standard

## Specification Changes

### Extensions Field Definition

An optional `extensions` field SHALL be added to all DAOIP-5 schema components:

```json
{
  "extensions": {
    "type": "object",
    "description": "Implementation-specific extensions and additional metadata not covered by the core DAOIP-5 specification",
    "additionalProperties": true
  }
}
```

### Updated Schema Components

#### 1. Grant System Schema (daoURI)

```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "<The name of the entity>",
  "type": "<The entity type, e.g. DAO or Foundation>",
  "grantPoolsURI": "<A URI pointing to a JSON declaring any grant pools>",
  "extensions": {
    "type": "object",
    "description": "Additional grant system metadata and implementation-specific fields",
    "additionalProperties": true
  }
}
```

#### 2. Grant Pool Schema

```json
{
    "@context": "http://www.daostar.org/schemas",
    "name": "<REQUIRED: The name of the entity (DAO, Foundation, etc.).>",
    "type": "<REQUIRED: The entity type, e.g., 'DAO' or 'Foundation'.>",
    "grantPools": [
        {
            "type": "GrantPool",
            "id": "<REQUIRED: The ID of the grant pool, typically a CAIP-10 identifier.>",
            "name": "<REQUIRED: The name of the grant pool.>",
            "description": "<REQUIRED: A description of the grant pool.>",
            "grantFundingMechanism": "<REQUIRED: Specifies the grant funding mechanism used for this pool. Enum value: 'Direct Grants', 'Quadratic Funding', 'Streaming Quadratic Funding', 'Retro Funding', 'Conviction Voting', 'Self-Curated Registries', 'Gift Circles', 'Social Media-Based Capital Allocation', 'Futarchy', 'Assurance Contracts', 'Cookie Jar', 'Impact Attestations', 'Stokvel', 'Request for Proposal', 'Delegated Domain Allocation', 'Evolutionary Grants Games', 'Direct to Contract Incentives', 'Angel Investment', 'Dominant Assurance Contracts', 'Community Currencies', 'Universal Basic Income', 'Bounties', 'Gnosis Safe', 'Waqf', 'Ranked Choice Voting', 'Honour', 'Mutual Aid Networks', 'Bonding Curves', 'Zakat', 'Decentralized Validators', 'Revnets'>",
            "isOpen": "<REQUIRED: Boolean value. 'true' if the grant pool is open to applications, 'false' if closed.>",
            "closeDate": "<OPTIONAL: The ISO 8601 date-time when the grant pool stops taking applications, e.g., '2025-12-31T23:59:59Z'.>",
            "applicationsURI": "<RECOMMENDED: A URI pointing to current and past applications received by the grant pool.>",
            "governanceURI": "<RECOMMENDED: A URI pointing to governance details, requirements, and criteria. Typically a .md file.>",
            "attestationIssuersURI": "<OPTIONAL: A URI pointing to JSON data listing trusted attestation issuers for the grant pool.>",
            "requiredCredentials": [
                "<OPTIONAL: An array of attestation types required for applicants, e.g., 'IdentityVerification', 'DAOContributor'.>"
            ],
            "totalGrantPoolSize": [
                        {
                            "amount": "<The total amount of funding for the grant pool>",
                            "denomination": "<The denomination of currency>"
                        }
            ],
            "email": "<OPTIONAL: A contact email for inquiries and support, e.g., 'grants@example.com'.>",
            "image": "<OPTIONAL: A URI pointing to an image resource (e.g., grant pool logo). Typically a square image.>",
            "coverImage": "<OPTIONAL: A URI pointing to a large background image for the grant pool.>"
            "extensions": "<OPTIONAL: Implementation-specific extensions and additional metadata>"
        }
    ]
}
```

#### 3. Project Schema

```json
{
    "@context": "http://www.daostar.org/schemas",
    "name": "<name of the entity>",
    "type": "<entity type, e.g. DAO or Person>",
    "projects": [
        {
        "type": "Project",
        "id": "<The id of the proposal, in the format specified above.>",
        "name": "<The name of the project.>",
        "description": "<A description of the project.>",
        "contentURI": "<A longer description of the project forming the core of a pitch for the project, including such things as activities proposed, milestones, team, impact assessment, past history, contact information, and so on.>",
        "email": "<OPTIONAL: A working email address through which the project can respond to grant inquiries and requests.>",
        "membersURI": "<OPTIONAL: A URI pointing to a JSON of members of the project, following the DAOIP-2 Members JSON-LD Schema.>",
        "attestationIssuersURI": "<RECOMMENDED: A URI pointing to a JSON of trusted issuers of attestations and credentials about the project and its members, following the DAOIP-3 Attestation Issuers JSON-LD Schema.>",
        "relevantTo": "<OPTIONAL: An array of (GrantPool id, GrantPool name) intended to call attention to specific grant pools for which this project is relevant. This does not constitute a formal grant application unless recognized by the grant pool.>",
        "image": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a square logo.>",
        "coverImage": "<RECOMMENDED: A URI pointing to a resource with mime type image/*, typically a large, rectangular background image.>",
        "licenseURI": "<OPTIONAL: A URI pointing to the project's open-source license or relevant licensing details>",
        "socials": [
                {
                "name": "<The name of the social platform>",
                "value":  "<An URI of the social platform profile of the project"
                } 
            ]
        "extensions": "<OPTIONAL: Implementation-specific extensions and additional metadata>"
        }
    ]
}
```

#### 4. Application Schema

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
                {
                    "type": "GrantApplication",
                    "id": "<The uid of the proposal, in the format specified above.>",
                    "grantPoolsURI": "<A URI pointing to the grant pools published by the entity.>",
                    "grantPoolId": "<The id of the grant pool.>",
                    "grantPoolName": "<The name of the grant pool.>",
                    "projectsURI": "<The URI of an organization’s projects applying for grant funding.>",
                    "projectId": "<The id of the project.>",
                    "projectName": "<The name of the project.>",
                    "createdAt": "<ISO DateTime>",
                    "contentURI": "<A URI pointing to the publicly accessible content of the application.>",
                    "discussionsTo": "<OPTIONAL: A URI pointing to a fixed channel, e.g., a forum discussion thread or messaging chat, where the granter(s), grantee(s), and other stakeholders can discuss the grant.>",
                    "licenseURI": "<OPTIONAL: A URI pointing to the project's open-source license or relevant licensing details>",
                    "isInactive": "<OPTIONAL: A Boolean value to indicate if the project is inactive>",
                    "applicationCompletionRate": "<OPTIONAL: A numerical percentage value indicating the completion status of the grant application>",
                    "socials": [
                        {
                            "platform": "<Enum value: Twitter | Discord | Telegram | LinkedIn | GitHub | Farcaster | Lens>",
                            "url": "<The URI of the project's profile on the specified platform>"
                        }
                    ],
                    "fundsAsked": [
                        {
                            "amount": "<The amount of funding asked>",
                            "denomination": "<The denomination of currency asked>"
                        }
                    ],
                    "fundsAskedInUSD": "<OPTIONAL: The amount of funding asked normalized to USD>",
                    "fundsApproved": [
                        {
                            "amount": "<The amount of funding approved>",
                            "denomination": "<The denomination of currency approved>"
                        }
                    ],
                    "fundsApprovedInUSD": "<OPTIONAL: The amount of funding approved normalized to USD>",
                    "payoutAddress": {
                        "type": "<e.g. EthereumAddress, CAIP10Address, IBAN, SWIFT/BIC, etc.>",
                        "value": "<subject's identifier, e.g. their Ethereum address, CAIP-10 address, IBAN, etc.>"
                    },
                    "status": "<RECOMMENDED: The current application status. Enum value: 
                      'pending' (submitted but not yet reviewed), 
                      'in_review' (currently being evaluated), 
                      'approved' (accepted for funding), 
                      'funded' (funding has been disbursed), 
                      'rejected' (not selected for funding), 
                      'completed' (project successfully delivered and grant conditions met)>",
                    "payouts": [
                        {
                            "type": "<The type of the payout transaction, e.g., CallDataEVM, StripePayment, InvoicePayment, OnchainTransaction>",
                            "value": {
                                "<Details specific to the payout type, such as operation, from, to, value, data, and other relevant transaction details>"
                            },
                            "proof": "<Evidence of the payout, such as a transaction hash, payment ID, or a link to verify the payout>"
                        }
                    ],
                    "extensions": "<OPTIONAL: Implementation-specific extensions and additional metadata>"

                }
            ]
        }
    ]
}
```

## Implementation Guidelines

### Naming Conventions

Extensions SHOULD follow these naming conventions to avoid conflicts:

1. **Vendor-specific**: Use reverse domain notation
   ```json
   "extensions": {
     "com.gitcoin.roundType": "quadratic",
     "org.optimism.category": "infrastructure"
   }
   ```

2. **Experimental features**: Use `x-` prefix
   ```json
   "extensions": {
     "x-aiEvaluation": true,
     "x-socialCredentials": {...}
   }
   ```

3. **Ecosystem-specific**: Use clear prefixes
   ```json
   "extensions": {
     "ethereum.gasEstimate": "0.05",
     "stellar.assetCode": "USDC"
   }
   ```

### Validation Rules

1. The `extensions` field is OPTIONAL in all schemas
2. If present, `extensions` MUST be a JSON object
3. `extensions` MAY contain any valid JSON structure
4. Implementations SHOULD ignore unknown extension fields gracefully
5. Extension fields MUST NOT override or conflict with core DAOIP-5 fields

### Usage Examples

#### Octant's Grant Pool

```json
{
  "@context": "http://www.daostar.org/schemas",
  "name": "Octant",
  "type": "Foundation",
  "grantPools": [
    {
      "type": "GrantPool",
      "id": "eip155:1:0x0000000000000000000000000000000000000000?contractId=1",
      "name": "Octant Epoch 1",
      "description": "Quadratic funding round for Octant epoch 1 - 90-day funding period supporting Ethereum public goods",
      "grantFundingMechanism": "Quadratic Funding",
      "isOpen": false,
      "closeDate": "2024-03-29T00:00:00Z",
      "applicationsURI": "./applications_epoch_1.json",
      "governanceURI": "https://docs.octant.app/how-it-works/mechanism",
      "totalGrantPoolSize": [
        {
          "amount": "329633639265156268032",
          "denomination": "ETH"
        }
      ],
      "extensions": {
        "app.octant.epochMetadata": {
          "stakingProceeds": "412042049081445321216",
          "totalEffectiveDeposit": "94755727584613854218098688",
          "vanillaIndividualRewards": "101469205666663117330",
          "operationalCost": "82408409816289053184",
          "matchedRewards": "244214657536017016006",
          "patronsRewards": "16050223937523865304",
          "totalWithdrawals": "320096281600650694595",
          "leftover": "9537357664505573437",
          "ppf": null,
          "communityFund": null
        },
        "app.octant.epochNumber": 1,
        "app.octant.duration": "90 days",
        "app.octant.network": "ethereum",
      }
    },
    {
      "type": "GrantPool",
      "id": "eip155:1:0x0000000000000000000000000000000000000000?contractId=2",
      "name": "Octant Epoch 2",
      "description": "Quadratic funding round for Octant epoch 2 - 90-day funding period supporting Ethereum public goods",
      "grantFundingMechanism": "Quadratic Funding",
      "isOpen": false,
      "closeDate": "2024-06-27T00:00:00Z",
      "applicationsURI": "./applications_epoch_2.json",
      "governanceURI": "https://docs.octant.app/how-it-works/mechanism",
      "totalGrantPoolSize": [
        {
          "amount": "365545462174813064230",
          "denomination": "ETH"
        }
      ],
      "extensions": {
        "app.octant.epochMetadata": {
          "stakingProceeds": "966657119479408821563",
          "totalEffectiveDeposit": "143000608744890669292589348",
          "vanillaIndividualRewards": "138232556533137973669",
          "operationalCost": "241664279869852205390",
          "matchedRewards": "227321601501076836083",
          "patronsRewards": "8695859401745522",
          "totalWithdrawals": "365233091278490434580",
          "leftover": "359759748331066181593",
          "ppf": null,
          "communityFund": null
        },
        "app.octant.epochNumber": 2,
        "app.octant.duration": "90 days",
        "app.octant.network": "ethereum",
      }
    }
  ]
}
```

## Backward Compatibility

This update maintains full backward compatibility:

- Existing DAOIP-5 implementations will continue to work unchanged
- The `extensions` field is optional and can be safely ignored by parsers
- No breaking changes to existing field definitions or requirements

## Forward Compatibility

The `extensions` field provides a pathway for:

- Standardizing popular extension patterns in future DAOIP versions
- Testing experimental features before core specification inclusion
- Supporting ecosystem evolution without breaking existing implementations

## Security Considerations

1. **Data validation**: Implementations should validate extension data appropriately
2. **Size limits**: Consider implementing reasonable size limits for extension objects
3. **Sensitive data**: Avoid storing sensitive information in extensions unless properly encrypted
4. **Schema validation**: Extensions should not bypass critical validation logic

## References

This update follows established patterns from:
- OpenAPI Specification (vendor extensions)
- JSON Schema (additional properties)
- Kubernetes API (annotations and labels)
- Web standards (custom data attributes)
