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

## Implementation Guidelines

### Naming Conventions

Extensions SHOULD follow these naming conventions to avoid conflicts:

1. **Implementation-specific**: Use reverse domain notation
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
3. **Sensitive data**: Avoid storing sensitive information in extensions unless properly encrypted
4. **Schema validation**: Extensions should not bypass critical validation logic

## References

This update follows established patterns from:
- OpenAPI Specification (vendor extensions)
- JSON Schema (additional properties)
- Kubernetes API (annotations and labels)
- Web standards (custom data attributes)
