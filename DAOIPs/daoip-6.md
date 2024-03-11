---
daoip: 6
title: daoURI via ENS or DNS
description: Publish daoURI through ENS or DNS text records
discussions-to: https://github.com/metagov/daostar/discussions/211
status: Draft
type: 
category: 
author: Joshua Z. Tan <josh@daostar.org>, Alex T. Netto <alex@blockful.io>
created: 2024-3-11
---

# Simple summary
Publish and index daoURI through a text field on an entity’s ENS or DNS domain name.

# Motivation
ENS is a commonly-used platform for identity and namespace in Ethereum. Many DAOs possess ENS names. Many DAOs have also delegated management of their ENS name to a manager, similar to how registration contracts work in [DAOIP-2](daoip-2.md). This specification facilitates adoption of daoURI as specified in DAOIP-2 by specifying a method for a DAO or representative of a DAO to publish a daoURI by adding a simple TXT record to their ENS or DNS records.

# Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## Text record via ENS
The ENS name related to the organization MUST add a text record with name `daoURI` and a value that resolves to a URI or gateway, following DAOIP-2.

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
There are many methods through which a DAO can publish a daoURI (i.e. metadata about itself), each of which may only imperfectly reflect the DAO’s intent.

The most trustworthy way of publishing a daoURI is through an on-chain registration contract (see [DAOIP-2](daoip-2.md)—in this case, it is clear that the data reflects the active will of the DAO. If the DAO inherits daoURI directly through its contract, then this is also trustworthy, though slightly less so as it typically reflects the decisions of a DAO framework rather than the DAO directly.

The only way that a DAO’s governance contract can have a primary name on ENS is if the contract itself calls ENS, meaning that it needs to pass through an on-chain governance interaction. This suggests that it is also highly trustworthy.

A daoURI reported through an ENS name whose owner, manager, and resolver are all set to the DAO’s primary governance contract is a relatively faithful example of the DAO’s intent. DAOs may not wish to manage ENS names through governance, so an ENS name which is managed by someone who is not the DAO (but which is still owned by and resolves to the DAO’s primary governance contract) is only slightly less trustworthy.

Service providers to a DAO, e.g. Snapshot, often publish relevant information including daoURI-style data, about the DAO. While not a reflection of the DAO’s own intent, it is often based on public, trustworthy data about the DAO. For additional rationale, see [DAOIP-3](daoip-3.md).

The last two methods (via an ENS name whose manager and resolver, or just resolver, are set to the DAO’s primary governance contract) are not trustworthy. But they are still sometimes useful for publishing certain kinds of information. Obviously, anyone owning an ENS name can set the manager and resolver to a DAO’s primary governance contract, so these methods are susceptible to spam. However, this arrangement might be legitimate in some cases, e.g. because the DAO decides to hold certain assets in a separate treasury or governance contract.

### Community Consensus
This standard was authored in consultation with contributors to ENS (including Blockful) as well as members of Verisign.

## Acknowledgements
Thanks to Amandeep and Eugene Leventhal for helpful comments.

## Copyright
Copyright and related rights waived via CC0.
