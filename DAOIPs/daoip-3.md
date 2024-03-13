---
daoip: 3
title: Attestations for DAOs
description: An attestation-based architecture and data model for DAO membership, contributions, and other data.
discussions-to: https://github.com/metagov/daostar/discussions/39
status: Draft
type:
category:
author: Fernando Mendes <fernando@mendes.codes>, Joshua Tan <josh@metagov.org>,
created: 2023-02-03
---

## Abstract

This standard provides a basic indexing architecture on top of the verifiable credentials specification, in order to bootstrap a permissionless attestation system for DAOs.

## Motivation

What does it mean to contribute to a DAO, and where can people find these contributions? What does it mean to be a member of a DAO, and how can membership be verified?

Contributions and membership are important building blocks within DAOs and related Web3 applications, from Web3 profiles to contribution graphs to measures of participation to interoperable reputation metrics. These systems are often the first settings in which DAOs and DAO service providers need to operationalize their underlying identity systems.

In current DAOs, membership and contributions are commonly defined via ownership of on-chain assets, whether fungible tokens, NFTs, or (more recently) soulbound NFTs. But on-chain definitions miss many important use-cases and risk locking DAOs into very specific modes of membership and organization. For example, a DAO may want to make membership contingent on some (off-chain) measure of participation such as git commits or Discourse posts, while definitions of contributions could vary across each of the (off- and on-chain) services that a DAO uses to track contributions.

[daoURI](daoip-2.md) already allows a DAO to publish off-chain metadata about itself. This standard composes with daoURI in order to specify a permissionless attestation framework so that _service providers and other entities_ can publish information about the DAO and its members. Importantly, it defines an indexing strategy for different entities to publish and search for on- and off-chain data relevant to the members of a DAO. The underlying format of the attestations themselves is designed to be compatible with the [W3C verifiable credential specification](https://w3c.github.io/vc-data-model/).

*Note: this standard does* not *specify how DAOs and service providers should handle identity verification & management. We assume that many different identity systems exist in tandem across different DAOs and different service providers. The way these are implemented is left to the discretion of both the DAO and its service providers. Thus, this standard is NOT appropriate for handling personally-identifiable information (PII) or other forms of personal data.*

## Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

### Attestations
A DAOIP-3 attestation MUST take the following form:

```json
{
	"@context": ["https://daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": ["VerifiableCredential", "Attestation", "<the type of the attestation if any>"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"<mySubjectProperty>": "<mySubjectValue>"
	}
}
```

In particular, note all DAOIP-3 attestations take the form of verifiable credentials as per the the [W3C verifiable credential specification](https://w3c.github.io/vc-data-model/), where attestations are made about a subject via the `credentialSubject` object. In addition to the mandatory fields of a verifiable credential (`type`, `issuer`, and `credentialSubject`). note the mandatory inclusion of the URI or API request through which someone can reproduce the attestation. All attestations SHOULD include an `expirationDate` field.

Other fields in the attestation, including additional properties of `credentialSubject`, should follow the schema specified by the attestation type.

### Attestation types
An attestation type (or attestation schema) MUST be specified in the Attestation Type JSON-LD Schema, below:

Attestation Type JSON-LD Schema
```json
{
	"@context": "https://daostar.org/schemas",
	"type": "AttestationType",
	"name": "<name of the attestation type>",
	"content": [
		{
			"fieldName": "<name of the field>",
			"fieldType": "<type of the field, e.g. Text or URL>",
		},
		{
			"fieldName": "<name of the field>",
			"fieldType": "<type of the field, e.g. Text or URL>",
		}
	]
}
```

If an issuer wishes to extend the attestation framework to attestations about things other than membership or contribution, they MUST add fields to or publish a new attestation type inheriting the generic Attestation type below:

```json
{
	"@context": ["https://daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": ["VerifiableCredential", "Attestation", "<the type of the attestation>"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"<mySubjectProperty>": "<mySubjectValue>"
	}
}
```

#### Membership Attestations 

Attestations communicating membership MUST declare the `MembershipAttestation` type and use the `memberOf` property within `credentialSubject`.

```json
{
	"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"type": "<e.g. EthereumAddress, DIDAddress, ENSName, CAIP10Address, HTTPAddress>",
		"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>",
		"memberOf": {
			"type": "DAO",
			"id": "<the DAO's daoURI>",
		}
	}
}
```

#### Contribution Attestations

A contribution is some event, artifact, or behavior that has been made by some entity or set of entities. Attestations communicating contributions MUST declare the `ContributionAttestation` type and use the `contributions` property within `credentialSubject`.

```json
{
	"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": ["VerifiableCredential", "Attestation", "ContributionAttestation"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"type": "<e.g. EthereumAddress, DIDAddress, ENSName, CAIP10Address, HTTPAddress>",
		"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>",
		"contributions": {
			"type": "Contribution",
			"name": "<name of the contribution>",
			"description": "<description of the contribution>",
			"hasContributors": [
				{
					"type": "<e.g. EthereumAddress, DIDAddress, ENSName, CAIP10Address, HTTPAddress>",
					"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>"
				}
			],
			"engagementDate": "<ISO DateTime>",
			"externalData": [
				{
					"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
					"<additionalFields>": "<additionalFieldData>"
				},
				{
					"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
					"<additionalFields>": "<additionalFieldData>"
				}
			]
		}
	}
}
```

An issuer MAY publish its own data about the Contribution (e.g. `id` information about the contribution) under `externalData`.

#### daoURI Attestations
An issuer may publish a version of `daoURI` on behalf of a DAO as an attestation. This follows the common pattern whereby an aggregator constructs a profile for a DAO that may then be "claimed". If accompanied by a digital signature or other proof, this MAY be indexed as the DAO's `daoURI` in the sense of [DAOIP-2](daoip-2.md).

```json
{
	"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": ["VerifiableCredential", "Attestation", "daoURIAttestation"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"type": "<e.g. EthereumAddress, DIDAddress, ENSName, CAIP10Address, HTTPAddress>",
		"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>",
		"daoURI": "<URI>"
	}
}
```

### For DAOs: attestationIssuers

All DAOs conforming to DAOIP-3 MUST implement the `attestationIssuersURI` field as part of `daoURI` as described in [DAOIP-2](daoip-2.md) and/or [EIP-4824](https://eips.ethereum.org/EIPS/eip-4824).

```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "DAO",
	"attestationIssuersURI": "<URI>"
}
```

The target of `attestationIssuersURI` MUST return an array of entities, each represented by an `issuer` which issues attestations on behalf of the DAO.

```json
{
	"@context": "http://www.daostar.org/schemas",
	"attestationIssuers": [
		{
			"type": "AttestationIssuer",
			"name": "<name of the attestation issuer>",
			"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
		},
		{
			"type": "AttestationIssuer",
			"name": "<name of the attestation issuer>",
			"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
		}
	]
}
```

Membership attestations (see above) issued by an issuer listed by the DAO in `attestationIssuers` SHOULD be considered acceptable evidence of membership in the DAO.

### For Issuers: `issuer` and Attestation Endpoints

An *attestation issuer*, or just issuer, is an entity that issues and manages attestations, sometimes but not always on behalf of some other entity. Issuers often provide services, host data about organizations and their members, or are trusted in some other way.

Every issuer conforming to DAOIP-3 MUST implement an issuer service that returns information about the issuer and the endpoints that it publishes, following the Attestation Issuer JSON-LD Schema below.

Attestation Issuer JSON-LD Schema
```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "AttestationIssuer",
	"name": "<name of the attestation issuer>",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"description": "<description of the attestation issuer>",
	"logo": "<link to logo of the issuer, usually a .jpg>",
	"endpoints": {
		"subjectAttestationsURI": "<URI of endpoint>",
	},
	"apiDocsURI": "<URI to specification or documentation of the issuer's API>"
}
```

Issuers SHOULD publish a `name`, `description`, and `logo`. Within the `endpoint` property, issuers MUST publish the `subjectAttestationsURI` endpoint, which, in response to a request about an entity (typically identified through its `type` and `id` properties, but possibly through other fields such as `name`), returns an array of attestations about that entity.

Issuers MAY choose to publish an API documentation specification through `apiDocsURI`. If so, it is RECOMMENDED that they return a JSON or YAML object following the [OpenAPI specification](https://spec.openapis.org/oas/latest.html). 

### Subject Presentations
An issuer MAY aggregate information from multiple attestations within a single *presentation* or *verifiable presentation*. If so, it MUST publish an endpoint `subjectPresentationURI` within the `endpoints` property. Further, aggregate information about members or contributions MUST take the form of arrays under the `memberOf` and `contributions` properties.

The example below shows such a presentation:

```json
{
	"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"expirationDate": "<ISO DateTime>",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"credentialSubject": {
		"type": "<e.g. EthereumAddress, DIDAddress, ENSName, CAIP10Address, HTTPAddress>",
		"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>",
		"memberOf": [{ "..." }],
		"contributions": [{ "..." }]
	}
```

## Rationale

This attestation framework is designed to support multi-party integrations between DAOs and DAO service providers, including use-cases related to Web3 profiles and Web3 CVs.

### Verifiable credentials

Earlier versions of this standard did not assume the the [W3C verifiable credential (VC) standard](https://w3c.github.io/vc-data-model/). The main rationale for adopting verifiable credentials---or at least making our field names explicitly compatible with verifiable credentials---is that previous versions of this specification already assumed much of the VC standard (e.g. `issuerURI` was very similar to `issuer`; `expiration` was very similar to `expirationDate`). Indeed, attestations as we envisioned them required MORE than the minimal verifiable credential. As we contemplated adding a "signature" component to this specification, it became clear that there was little to lose and a significant amount to be gained from making all attestations VCs. Further, adopting the VC standard allows this specification to focus on the indexing and presentation strategy needed for multiple issuers and DAOs to communicate with each other.

The main rationale for NOT adopting the VC standard is that VCs themselves are not well-adopted as of the writing of this standard. While true, we believe that this specification is similar enough in its goals and execution that, in the interests of de-duplication, it should interoperate with the existing VC standard. Further, this specification is primarily intended to facilitate aggregate communication between digital, automated entities (including DAOs, the APIs of their service providers, and to some degree aggregators and block explorers) rather than between individuals and a set of institutions. As such, the ecosystem we envisions of issuers, DAOs, and subjects is significantly simpler than the one of issuers, holders, subjects, verifiers, and (revocation) registries envisioned in the VC standard. However, this difference in vision does not preclude us from adopting the simple form of the VC specification, though it does introduce some additional complexiy in how we construct aggregate presentations of credentials/attestations.

### Example

Let’s take a hypothetical example featuring two DAOs (DAOstar One and Nouns DAO) and three attestation issuers (Disco, Govrn, and Avenue). Assume a user owns two different ENS names: `josh.eth` and `joshua.eth`, each assigned to a different Ethereum address.

Through their two addresses, the user belongs to two DAOs:

1. `josh.eth` owns enough DAO tokens to be a member of DAOstar One, and
2. `joshua.eth` owns an NFT needed to be a member of Nouns DAO.

Our user logs into Avenue using (the address that owns) `josh.eth`. When a third-party queries Avenue’s `subjectAttestationsURI` endpoint with the input `{"type": "ENSName", "id": "josh.eth"}`, the response should be something like:


```json
[
	{
		"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
		"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
		"issuer": "<Avenue's issuer URI>",
		"attestationURI": "<a URI maintained by Avenue from which someone can obtain this attestation>",
		"expirationDate": "<ISO DateTime>",
		"credentialSubject": {
			"type": "ENSName",
			"id": "josh.eth",
			"memberOf": {
				"type": "DAO",
				"id": "<DAOstar One's daoURI>",
			}
		}
	}
]
```

Let’s now assume DAOstar One is using Govrn to track contributions and Avenue is integrating with Govrn to track data.

Any contributions the user allows to be publicly shared will also be available to Avenue. Even though a client would be querying Avenue’s attestation endpoint, the `contributions` field would relay any contributions made by Govrn. Querying Avenue's endpoint with the input `{"type": "ENSName", "id": "josh.eth"}` should now return something like:


```json
[
	{
		"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
		"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
		"issuer": "<Avenue's issuer URI>",
		"attestationURI": "<Avenue's subjectAttestationsURI>",
		"expirationDate": "2023-10-04T19:23:24Z",
		"credentialSubject": {
			"type": "ENSName",
			"id": "josh.eth",
			"memberOf": {
				"type": "DAO",
				"id": "<DAOstar One's daoURI>",
			}
		}
	},
	{
		"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
		"type": ["VerifiableCredential", "Attestation", "ContributionAttestation"],
		"issuer": "<Avenue's issuer URI>",
		"attestationURI": "<Govrn's subjectAttestationsURI>",
		"expirationDate": "2023-10-05T12:19:11Z",
		"credentialSubject": {
			"type": "ENSName",
			"id": "josh.eth",
			"contributions": [
				{
					"type": "Contribution",
					"name": "Tweeted DAOstar Launch",
					"description": "I tweeted DAOstar's launch on February 2, 2021.",
					"hasContributors": [
						{
							"type": "ENSName",
							"id": "josh.eth"
						}
					],
					"engagementDate": "2021-02-02T19:23:24Z"
				}
			]
		}
	}
]
```

Notice the `contributions` field includes information issued by Govrn and relayed by Avenue. Making use of this information relay allows tools to easily integrate with a single one of the issuers but still have access to data of others without being aware of any implementation details. At the same time, there’s still confidence in the data being relayed since it can be validated by the `attestationURI` field.

Let’s assume now that Avenue also integrates with Disco. Disco, in turn, attests user identities. If the user links both profiles (`josh.eth` and `joshua.eth`) in Disco, even though the former only has token access to DAOStar One, Disco can issue an attestation that it should be able to access Nouns DAO as well. In essence, Disco is stating “`josh.eth` has tokens to access DAOStar One but, even though you can’t see it, I guarantee you its owner also has an address with the NFT to access Nouns DAO.

This is represented by returning the following data in Disco's `subjectAttestationsURI` endpoint:

```json
[
	{
		"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
		"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
		"issuer": "<Disco's issuer URI>",
		"attestationURI": "<Avenue's subjectAttestationsURI>",
		"expirationDate": "2023-10-04T19:23:24Z",
		"credentialSubject": {
			"type": "ENSName",
			"id": "josh.eth",
			"memberOf": {
				"type": "DAO",
				"id": "<DAOstar One's daoURI>",
			}
		}
	},
	{
		"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
		"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
		"issuer": "<Disco's issuer URI>",
		"attestationURI": "<Disco's subjectAttestationsURI>",
		"expirationDate": "2023-10-04T19:23:24Z",
		"credentialSubject": {
			"type": "ENSName",
			"id": "josh.eth",
			"memberOf": {
				"type": "DAO",
				"id": "<Nouns DAO's daoURI>",
			}
		}
	}
]
```

Notice how the `attestationURI` in this scenario points to Disco’s own `subjectAttestationsURI`. A third-party using this information to gate access to a DAO should decide if they trust Disco’s attestation.

### For DAOs: attestationIssuers

The basic use-case for a DAO using `attestationIssuers` is so that the DAO can (1) declare what services they use, along with the data published by those service providers, and (2) to declare to other services where "authorized" third party data is being maintained about members of the data.

The intended indexing flow for a service building on top of DAOIP-3 is: 
1. index all daoURIs,
2. index data from `attestationIssuersURI` in order to discover (or cull) new issuers / service providers,
3. pull data from `subjectAttestationsURI`, or through other endpoints listed through at `issuer`.

### Expiration

We originally wanted to make an expiry timestamp mandatory for all attestations; since attestations can be easily (and freely) issued by the DAO or by the issuer, having a (short-lived) self-expiring attestation avoids the rigmarole of maintaining a revocation registry and the underlying issues of trust and access to it. With self-revoking credentials, the problem of storing is partially solved: they can at any time be reissued by the DAO contract or the trusted party. The approach also adds flexibility for storage by the user themselves (e.g. via a browser extension, that could potentially automatically refresh expired credentials).

However, after feedback from potential adopters of the standard, we decided to make the expiration a recommendation rather than a mandatory component of the standard.

## Acknowledgements

We would like to thank Aaron Soskin, Balazs Nemethi, Conner Swenberg, Rashmi Abbigeri, Muhammad Asghar, Cent Hosten, Ese Mentie, Pion Medvedeva, and Bryan Petes for their helpful comments and suggestions in the course of writing this article.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## Citation

Please cite this document as:

Fernando Mendes and Joshua Z. Tan, “DAOIP-2: Attestations for DAOs Working Paper v0.2”, October 8, 2023.
