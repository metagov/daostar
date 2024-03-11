---
daoip: 6
title: daoURI via ENS or DNS
description: Data standards for grants systems
discussions-to: https://github.com/metagov/daostar/discussions/211
status: Draft
type: 
category: 
author: Alex T. Netto <alex@blockful.io>, Joshua Z. Tan <josh@daostar.org>a
created: 2024-3-11
---

# Simple summary
Publish and index daoURI through a text field on an entity’s ENS or DNS domain name.

# Motivation
ENS is a commonly-used platform for identity and namespace in Ethereum. Many DAOs possess ENS names. Many DAOs have also delegated management of their ENS name to a manager, similar to how registration contracts work in [DAOIP-2](daoip-2.md). This specification facilitates adoption of daoURI as specified in DAOIP-2 by specifying a method for a DAO or representative of a DAO to publish a daoURI by adding a simple TXT record to their ENS or DNS records.

# Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## Text record via ENS
The ENS name related to the organization MUST add a text record with name `daoURI` and a value that resolves to a URI or gateway, following EIP-4824.

The ENS name reporting daoURI SHOULD be owned by, be managed by, resolve to, and be the primary name of the primacy governance contract of the DAO. If not, see the “Indexing priority” section.

## TXT record via DNS
To set a daoURI through a DNS TXT record, set a TXT record of the following sort:

| Domain         | Record type | Host | Value                                     | TTL       |
| -------------- | ----------- | ---- | ----------------------------------------- | --------- |
| exampledao.com | TXT         | @    | daoURI=https://api.daostar.org/exampleDAO | Automatic |

The owner of the domain name MAY also claim the domain name through ENS. This “DNS name on ENS” SHOULD be owned by, be managed by, resolve to, and be the primary name of the primacy governance contract of the DAO. If not, see the “Indexing priority” section.

Off-chain organizations MAY report daoURI or similar record directly through their DNS.

## Indexing priority
Suppose that a given DAO has its primary governance contract at address 0x123. Then daoURI indexers following DAOIP-# should prioritize displaying, in order:

1. The daoURI declared through a registration contract deployed by the governance contract at 0x123 (see DAOIP-2).
2. The daoURI inherited directly within the governance contract at 0x123 (see DAOIP-2).
3. The daoURI reported through an ENS name which has been set as the [ENS primary name](https://support.ens.domains/en/articles/7890756-the-primary-name) through an interaction between 0x123 with an ENS Public Resolver contract.
4. The daoURI reported through an ENS name whose owner, manager, and resolver are all 0x123.
5. The daoURI reported through an ENS name whose owner and resolver are 0x123.
6. The daoURI reported through an attestation by a service provider trusted by the DAO (see DAOIP-3).
7. The daoURI reported through an attestation by a generally-trusted service provider (see DAOIP-3).
8. The daoURI reported through an ENS name whose manager and resolver are 0x123.
9. The daoURI reported through an ENS name whose resolver is 0x123.

## Rationale
The goal here is to make the relation between the DAO URI record and the DAO itself as trustworthy as possible, for that we can use ENS’s primary name mechanic, which makes an Ethereum address point to an ENS domain. The only way that a DAO’s governance contract can have a primary name is if the contract itself calls ENS, meaning that it need to pass through a governance decision.

So if we have a record pointing to a DAO URI through this ENS, then we have a really high level of trust. There are some other factors that can make it more secure, like the ownership of the domain being under the DAO treasury and the manager of the domain being at least a multisig of a working group.

Having a ENS name that's imported from DNS also is a great way to officially bind the web2 domain with the contracts.

### Community Consensus
This standard was authored in consultation with contributors to ENS (including Blockful) as well as members of Verisign.

## Acknowledgements
Thanks to Amandeep for comments.

## Copyright
Copyright and related rights waived via CC0.
