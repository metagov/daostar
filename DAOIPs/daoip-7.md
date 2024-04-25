---
daoip: 7
title: Attestation Schema Registry for EAS
description: A registry of schemas conforming to DAOIP-3 on Ethereum Attestation Service (EAS)
discussions-to: https://github.com/metagov/daostar/discussions/51
status: Draft
type: 
category: 
author: Amandeep <aman@daostar.org>, Joshua Tan <josh@metagov.org>
created: 2024-04-25
---
# Simple summary
A registry of schemas conforming to DAOIP-3 on Ethereum Attestation Service. 

# Motivation
DAOIP-3 composes with daoURI (DAOIP-2 / EIP-4824) in order to specify a permissionless attestation framework so that service providers and other entities can publish information about the DAO and its members. To meet the rising usage of Ethereum Attestation Service (EAS) among DAOs and tooling providers, DAOIP-7 creates a registry, referred to as DAO Schema Registry, to keep track of EAS schemas that comply with DAOIP-3 and, by extension, the verifiable credential standard. Notably, this specification ensures that attestations made through compliant EAS schemas will be interoperable with attestations and credentials not issued through EAS. 
Accompanying this standard is a DAO Attestation List website to further improve the visibility and usability of DAO-related attestations. 

# Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

# Context 
A DAOIP-7 compliant EAS schema MUST declare an associated context. In other words, it must take the following form:
