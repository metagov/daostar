---
daoip: 3
title: Attestations for DAOs
description: An attestation-based architecture and data model for DAO membership, member contributions, and other data.
discussions-to: https://github.com/metagov/daostar/discussions/39
status: Draft
type:
category:
author: Fernando Mendes <fernando@mendes.codes>, Joshua Tan <josh@metagov.org>,
created: 2023-02-03
---

## Abstract

This standard provides the basic architecture for a permissionless attestation framework where different parties can make arbitrary and conflicting attestations about membership, contributions, and other data relevant to DAOs and their members.

## Motivation

What does it mean to contribute to a DAO, and where can people find these contributions? What does it mean to be a member of a DAO, and how can membership be verified?

Contributions and membership are important building blocks within DAOs and related Web3 applications, from Web3 profiles to contribution graphs to measures of participation to interoperable reputation metrics. These systems are often the first settings in which DAOs and DAO service providers need to operationalize their underlying identity systems.

In current DAOs, membership and contributions are commonly defined via ownership of on-chain assets, whether fungible tokens, NFTs, or (more recently) soulbound NFTs. But on-chain definitions miss many important use-cases and risk locking DAOs into very specific modes of membership and organization. For example, a DAO may want to make membership contingent on some (off-chain) measure of participation such as git commits or Discourse posts, while definitions of contributions could vary across each of the (off- and on-chain) services that a DAO uses to track contributions.

[daoURI](https://daostar.one/EIP) already allows a DAO to publish off-chain data about itself and its members. This standard composes with daoURI in order to specify a permissionless attestation framework _for service providers and other entities_ to publish information about the DAO and its members. Importantly, it defines an indexing strategy for different entities to publish and search for on- and off-chain data relevant to the members of a DAO. The underlying format of the attestations themselves is designed to be compatible with the [W3C verifiable credential specification](https://w3c.github.io/vc-data-model/).

*Note: this standard does* not *specify how DAOs and service providers should handle identity verification & management. We assume that many different identity systems exist in tandem across different DAOs and different service providers. The way these are implemented is left to the discretion of both the DAO and its service providers. Thus, this standard is NOT appropriate for handling personally-identifiable information (PII) or other forms of personal data.*

## Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

### Attestations
A DAOIP-3 attestation MUST take the following form:

```json
{
	"@context": ["https://daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"type": "["VerifiableCredential", "Attestation", <the type of the attestation if any>]",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"<mySubjectProperty>": "<mySubjectValue>"
	}
}
```

In particular, note all DAOIP-3 attestations take the form of verifiable credentials as per the the [W3C verifiable credential specification](https://w3c.github.io/vc-data-model/), where attestations are made about a subject via the `credentialSubject` object. In addition to the mandatory fields of a verifiable credential (`type`, `issuer`, and `credentialSubject`), note the mandatory inclusion of an `expirationDate` field on every attestation as well as `attestationURI`, which is the URI or request through which someone can reproduce the attestation.

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
	"type": "["VerifiableCredential", "Attestation", <the type of the attestation>]",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"<mySubjectProperty>": "<mySubjectValue>"
	}
}
```

### For DAOs: attestationIssuers

All DAOs conforming to DAOIP-3 MUST implement the `attestationIssuersURI` field as part of `daoURI` as described in [DAOIP-2](DAOIP-2) and/or [EIP-4824](https://eips.ethereum.org/EIPS/eip-4824).

```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "DAO",
	"attestationIssuersURI": "<URI>"
}
```

The target of `attestationIssuersURI` MUST return an array of entities, each represented by an `issuer`, who issue attestations on behalf of the DAO.

```json
{
	"@context": "http://www.daostar.org/schemas",
	"attestationIssuers": [
		{
			"type": "AttestationIssuer",
			"name": "<name of the attestation issuer>"
			"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
		},
		{
			"type": "AttestationIssuer",
			"name": "<name of the attestation issuer>"
			"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
		}
	]
}
```

### For Issuers: issuerURI and Attestation Endpoints

An *attestation issuer*, or just issuer, is an entity that issues and manages attestations, sometimes but not always on behalf of some other entity. Issuers often provide services, host data about organizations and their members, or are trusted in some other way.

Every issuer conforming to DAOIP-3 MUST implement an `issuerURI` endpoint describing the issuer and the endpoints that it publishes, following the Attestation Issuer JSON-LD Schema below. 

Attestation Issuer JSON-LD Schema
```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "AttestationIssuer",
	"name": "<name of the attestation issuer>",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"description": "<description of the attestation issuer>",
	"endpoints": {
		subjectAttestationsURI: "<URI>",
		subjectPresentationURI: "<URI>",
	}
	"apiURI": "<URI to specification or documentation of the issuer's API>",
}
```

Issuers MAY choose to publish an API documentation specification through `apiURI`. If so, it is RECOMMENDED that they return a JSON or YAML object following the [OpenAPI specification](https://spec.openapis.org/oas/latest.html).

### Subject Presentations
An issuer MAY implement a `subjectPresentationURI` endpoint which, given an `id` object such as `EthereumAddress` or `ENSAddress`, returns a list of organizations following the Subject Presentation JSON Schema below:

Subject Presentation JSON Schema
```json
{
	"@context": ["http://www.daostar.org/schemas", "https://www.w3.org/ns/credentials/v2"],
	"expirationDate": "<ISO DateTime>",
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"credentialSubject": {
		"type": "<e.g. EthereumAddress, DIDAddress, ENSAddress, CAIP10Address, HTTPAddress>",
		"id": "<subject's identifier, e.g. their Ethereum address, DID address, ENS address, CAIP-10 address, or HTTP address>",
		"organizations": [ ... ],
		"contributions": [ ... ]
	}
```

Further, note that the above schema is designed to attest to a member object by looking up its “identity”, where identity might be determined by Ethereum address, Cosmos address, CAIP-10 address, decentralized identity, ENS, BrightID, Disco, or any other service with a recognized identity type.

### daoURI Attestation
An issuer may publish a version of daoURI on behalf of a DAO as an attestation.

```json
{
	"type": ["VerifiableCredential", "Attestation", "daoURI"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"daoURI": "<URI>"
	}
}
```

### Membership Attestations 

```json
{
	"type": ["VerifiableCredential", "Attestation", "MembershipAttestation"],
	"issuer": "<URI returning data conforming to the Attestation Issuer JSON-LD Schema>",
	"attestationURI": "<the URI or API request from which someone can obtain the attestation>",
	"expirationDate": "<ISO DateTime>",
	"credentialSubject": {
		"memberOf": {
			"type": "DAO",
			"id": "<daoURI>",
		}
}
```

### Contribution Attestations

```json
{
	"type": "contributionAttestation",
	"expirationDate": "<ISO DateTime>",
	"attestationURI": "<the URI from which someone can obtain the attestation, in this case, the issuer's getMemberAttestationsURI>",
	"contributionType": "<arbitrary text, e.g. tweet>",
	"contributionURI": "<arbitrary URI giving information about the contribution>"
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

1. `josh.eth` owns enough DAO tokens to be a member of DAOstar One
2. `joshua.eth` owns an NFT needed to be a member of Nouns DAO

Our user logs into Avenue using `josh.eth`. When a third-party queries Avenue’s attestation endpoint, the response should be:

```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "arrayAttestation",
	"issuer": "<Avenue's issuerURI>",
	"member": {
		"type": "ENS",
		"id": "josh.eth"
	},
	"organizations": [
		{
			"expirationDate": "<ISO-datetime>",
			"attesterURI": "<DAOStar One's membersURI>",
			"name": "DAOstar One",
			"daoURI": "<DAOStar One's daoURI, following EIP-4824>"
		}
	]
}
```

Let’s now assume DAOstar One is using Govrn to track contributions and Avenue is integrating with Govrn to track data.

Any contributions the user allows to be publicly shared will also be available to Avenue. Even though a client would be querying Avenue’s attestation endpoint, the `contributions` field would relay any contributions made by Govrn. Querying the previous endpoint would return:

```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "arrayAttestation",
	"issuer": "<Avenue's issuerURI>",
	"member": {
		"type": "ENS",
		"id": "josh.eth"
	},
	"organizations": [
		{
			"expirationDate": "<ISO-datetime>",
			"attesterURI": "<DAOStar One's membersURI>",
			"name": "DAOstar One",
			"daoURI": "<DAOStar One's daoURI, following EIP-4824>"
		}
	],
	"contributions": [
		{
			"type": "contribution",
			"commit_type": "tweet",
			"reference?": "<URI reference to the tweet on Govrn's platform>",
			"attesterURI": "<Govrn's issuerURI>"
		}
	]
}
```

Notice the `contributions` field includes information issued by Govrn and relayed by Avenue. Making use of this information relay allows tools to easily integrate with a single one of the issuers but still have access to data of others without being aware of any implementation details. At the same time, there’s still confidence in the data being relayed since it can be validated by the `reference` field.

Let’s assume now that Avenue also integrates with Disco. Disco, in turn, attests user identities. If the user links both profiles (`josh.eth` and `joshua.eth`) in Disco, even though the former only has token access to DAOStar One, Disco can issue an attestation that it should be able to access groundw3rk as well. In essence, Disco is stating “`josh.eth` has tokens to access DAOStar One but, even though you can’t see it, I guarantee you its owner also has an address with the NFT to access groundw3rk”.

This is represented by returning the following data in Discos’ issuer endpoint:

```json
{
	"@context": "http://www.daostar.org/schemas",
	"type": "arrayAttestation",
	"issuer": "<Disco's issuerURI>",
	"member": {
		"type": "ENS",
		"id": "josh.eth"
	},
	"organizations": [
		{
			"expirationDate": "<ISO-datetime>",
			"attesterURI": "<DAOStar One's membersURI>",
			"name": "DAOstar One",
			"daoURI": "<DAOStar One's daoURI, following EIP-4824>"
		},
		{
			"expirationDate": "<ISO-datetime>",
			"attesterURI": "<Disco's URI>",
			"name": "groundw3rk",
			"daoURI": "<groundw3rk's daoURI, following EIP-4824>"
		}
	]
}
```

Notice how the `attesterURI` in this scenario points to Disco’s own URI. A third-party using this information to token gate access to a DAO should decide if they trust Disco’s attestation.

### Attestations
We require membersURI (and overload it with membersURI from daoURI) because a DAO's membersURI can be published by the DAO, or by an issuer. But DAOs attestations via membersURI are given special status relative to a typical issuer attestation. [But why? Why do we do this? Mainly, I suppose, because they are "by the DAO itself". Not every piece of data needs to take the form of an attestation.] We also considered naming `memberAttestationURI` as `membersURI`, i.e. overloading the name with the field expected from `daoURI`. One reason for doing so is because membersURI (and effectively any data coming from daoURI) is in some sense an attestation. This would define a clear way in which  I think the distinction is that data from an attestation is meant to be in some sense portable, whereas data from membersURI is served directly from the DAO's own API.

### Attestation types
Issuers will often need to publish additional data...

### For DAOs: attestationIssuers and issuerURI

The basic use-case for a DAO using `attestationIssuers` and `issuerURI` is so that the DAO can (1) declare what services they use, along with the data published by those service providers, and (2) to declare to other services where “authorized” third party data is being maintained about members of the data.

Attestations issued by an issuer listed in `attestationIssuers` should be considered acceptable evidence of membership in the DAO.

### Expiration

Since attestations can be easily (and freely) issued by the DAO issuer contract or a trusted party, we propose adding an expiry timestamp to the attestation schema. Having a (short-lived) self-expiring attestation avoids the rigmarole of maintaining a revocation registry and the underlying issues of trust and access to it.

With self-revoking credentials, the problem of storing is partially solved: they can at any time be reissued by the DAO contract or the trusted party. The approach also adds flexibility for storage by the user themselves (e.g. via a browser extension, that could potentially automatically refresh expired credentials).

## Acknowledgements

We would like to thank Aaron Soskin, Balazs Nemethi, Conner Swenberg, Rashmi Abbigeri, Muhammad Asghar, Cent Hosten, Ese Mentie, Pion Medvedeva, and Bryan Petes for their helpful comments and suggestions in the course of writing this article.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## Citation

Please cite this document as:

Fernando Mendes and Joshua Z. Tan, “Attestations for DAOs Working Paper”, July 8, 2022.