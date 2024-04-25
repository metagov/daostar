---
daoip: 7
title: Attestation Schema Registry for EAS
description: A registry of schemas on Ethereum Attestation Service(EAS), conforming to DAOIP-3.
discussions-to: https://github.com/metagov/daostar/discussions/228
status: Draft
type: 
category: 
author: Amandeep <aman@daostar.org>, Joshua Tan <josh@metagov.org>
created: 2024-04-25
---
# Simple summary
A registry of schemas on Ethereum Attestation Service, conforming to DAOIP-3.  

# Motivation
[DAOIP-3](https://github.com/metagov/daostar/blob/main/DAOIPs/daoip-3.md) composes with daoURI ([DAOIP-2 / EIP-4824](https://github.com/metagov/daostar/blob/main/DAOIPs/daoip-2.md)) in order to specify a permissionless attestation framework so that service providers and other entities can publish information about the DAO and its members. To meet the rising usage of Ethereum Attestation Service ([EAS](https://attest.org/)) among DAOs and tooling providers, DAOIP-7 creates a registry, referred to hereon as **DAO Schema Registry**, that'll keep track of EAS schemas which comply with DAOIP-3 and, by extension, the verifiable credential standard. Notably, this specification ensures that attestations made through compliant EAS schemas will be interoperable with attestations and credentials not issued through EAS. 
Accompanying this standard is a **DAO Attestation List website** to further improve the visibility and usability of DAO-related attestations. 

# Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

# Context 
A DAOIP-7 compliant EAS schema MUST declare an associated context. In other words, it must take the following form:
```json
{
"@context": ["https://www.w3.org/ns/credentials/v2", "https://daostar.org/schemas"],
	"mySubjectProperty": "<mySubjectValue>",
}
```
The context MAY be a separate inline field as shown above or it MAY be set via the [EAS-context-attestation method](https://docs.attest.sh/docs/tutorials/schema-context), i.e. a specific schema on EAS that allows schema owners to attest to the context of their (already-published) schemas. We RECOMMEND setting the context using the EAS method.

If there is a conflict between the inline context and the context set through the EAS method, the inline context MUST take priority.

# Schema Registration
Once a context is set, schemas SHOULD be added to the DAO Schema Registry by its owner through an on-chain attestation.

The DAO Schema Registry is deployed on Optimism Mainnet (UID: 0x25eb07102ee3f4f86cd0b0c4393457965b742b8acc94aa3ddbf2bc3f62ed1381)
<img width="491" alt="Screenshot 2024-04-05 at 3 29 44 PM" src="https://github.com/metagov/daostar/assets/68982632/95d99718-8072-49f6-8404-c86ef5c62b93">

An attestation issuer SHOULD register their schemas here by providing: 

`Schema UID`: {UIDs} of the schemas the attestation issuer wishes to register
`Schema Description`: {descriptions} of the schemas the attestation issuer wishes to register
`Network ID`: {network IDs} of the schemas the attestation issuer wishes to register ([refer](https://chainlist.org/))
`Issuer Name`: name of the attestation issuer 
`Issuer Description`: description of the attestation issuer 
`Logo`: link to attestation issuer’s logo. Enter NA if not available 
`apiDocsURI`: link to the attestation issuer’s API documentation.  Enter NA if not available 

# Rationale
The registry set-up above is an opt-in, public repository for EAS schemas conforming to DAOIP-3. Together with the DAO Attestation Lists website, it enhances the context and usability of DAO-related attestations on EAS. 

By ensuring that only registrations from schema owners will be considered valid, we have scam-protection for the registry. And by maintaining the DAO Attestation Lists Website, we hope to give more visibility to DAO activity happening through EAS. Often times, the gap between an ok-data economy and an interoperable data-economy is good facilitation. 

You may note that in this specification, compliance with DAOIP-3 has been ensured in a rather lightweight manner. Specifically, we have refrained from mandating the `Attestations JSON-LD Schema` defined by DAOIP-3 at each EAS schema level, or requiring each attestation issuer to publish a separate Attestation Issuer endpoint following the `Attestation Issuer JSON-LD Schema` defined by DAOIP-3, or predefining `attestation types` as in DAOIP-3. This is a result of EAS’s architecture and the primitives it makes available by default. 

For example, consider the `Attestations JSON-LD Schema` specified by DAOIP-3:
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
Evaluating the above JSON in the light of EAS reveals that: 

- every EAS attestation is directly linked to the schema it utilizes and thereby, to the schema owner. As anyone can query the registry for information on the schema owner, it is unnecessary to have an `issuer` field in every attestation;
-  every EAS attestation, by default, has an attestation UID using which anyone can obtain the data associated to the attestation. This can essentially be treated as the `attestationURI` of each attestation;
-  `expirationDate` of any EAS attestation can be set as well as retrieved without it being enforced at the schema level;
-  `context` can be set via the the EAS-context-attestation method, hence setting it at the schema level is not required;
-  `credentialSubject` is part of the explicit and implicit structure of the verifiable credential standard and thus of DAOIP-3, which organizes all attestations as declarations about an entity. EAS does not natively call out a credentialSubject, however, we ALWAYS expect the data in your attestation to reference one or more "subjects", per the VC standard. Additionally, as we have removed all components that ensure interoperability at the schema level, we expect each field (other than `context`, if it is an inline field) simply being a `credentialSubject` property. There may be exceptions to this;
-  note that each schema is in essence an attestation type. Hence it seemed best not to pre-define `attestation types` due to the diversity of schemas supported by EAS. 

Consider the `Attestation Issuer URI` defined by DAOIP-3: 

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
Note that the registry essentially captures this information. The only difference is that instead of every attestation issuer hosting this endpoint on their own, they can simply attest a copy of this info to the registry. As EAS provides a GraphQL API to query attestations about an entity, and since the registry will store all schemas by the issuer, it eliminates the need for a separate `subjectAttestationsURI`. 

Note that an attestation issuer may have deployed EAS schemas using more than one address. The front-end (DAO Attestation List website) aims to aggregate all of them under the same _issuer profile_. 

To summarize, the environment DAOIP-3 was authored to operate in is very different from the environment EAS provides. When it comes to EAS, attestations are by default connected to each other and to the schemas they use, which are by default connected to the schema owner. DAOIP-3 does not assume this interconnectedness, which is why it mandated each attestation to establish a connection with the issuer and include details like expiration date at the schema level. When we operate on EAS’s backdrop, this is not necessary. But, the DAO Schema Registry, specified above adds a missing piece to EAS - a repository of schemas conforming to a particular standard (DAOIP-3), which is more or less a repository of DAO builders utilizing EAS. 

# Example

DAOstar wants to add one of their schemas (UID: 0x25eb07102ee3f4f86cd0b0c4393457965b742b8acc94aa3ddbf2bc3f62ed1381) to the DAO Schema Registry. Here is how they went about it: 

Step 1: Set a context. A context (https://daostar.org/schemas) was added via [EAS- context- attestation method](https://docs.attest.sh/docs/tutorials/schema-context). This is the [context attestation](https://optimism.easscan.org/attestation/view/0x7eb4c9c33b7c4b897be7057e74b64578b92d33437588e409548f0ca6bb1b76d1https://optimism.easscan.org/attestation/view/0x7eb4c9c33b7c4b897be7057e74b64578b92d33437588e409548f0ca6bb1b76d1). You can view the set context on the EAS app. 

Step 2: Added their schema to the DAO Schema registry. The schema owner (0x7AcE0b7a0cFb2980aa25310af5c2602144d58db2), added the details of their schema along with the details of the issuer through this [attestation](https://optimism.easscan.org/attestation/view/0x5914e97bce4f4b6e94924afb6aaf127967e440386e8376382d4398d3dd1a4df1).  

After completing the above steps, DAOstar also chose to get added to the [DAO Attestation List website](https://attestations.daostar.org). While this is optional, it helped boost the visibility of their schemas in the wider ecosystem. 

# Acknowledgements
We are grateful for helpful comments and suggestions from Mahesh Murty, Kahn Yuan, Mike, Rashmi V Abbigeri, Fernando Mendez and Bryce Alan. 

# Copyright
Copyright and related rights waived via CC0.



