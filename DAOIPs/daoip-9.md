---
daoip: 9
title: Legal Communication
description: 
author: Joni Pirovich (<joni@ccocounsel.com>), Joshua Tan (@thelastjosh)
discussions-to: https://github.com/metagov/daostar/discussions/272
status: Draft
type: 
category: 
created: 2024-11-26
---

## Simple summary
An official mechanism for DAOs to receive and send legal communications, as well as to display legal information to the public.

## Motivation
The goal of this specification is to define a clear, easy method, legalURI, for communicating legal information to and from online communities—whether a DAO or other form of entity—that may or may not be recognised as legal or tax persons but that do have an on-chain presence.

You can think of legalURI as roughly equivalent to the standard “Terms and Conditions” or “Privacy Statement” that one finds at the bottom of many websites.

## Specification
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

To comply with this specification, you MUST publish a daoURI or entityURI following the EIP-4824 / DAOIP-2 DAO JSON-LD Schema and include a field called legalURI.

The legalURI MUST include an email field that provides a valid email address (e.g., legal@communityname.io). Email is recognized as a legally binding form of communication in many jurisdictions and ensures a reliable, accessible, and universally accepted channel for legal correspondence.

Additional optional fields, such as a webpage with terms and conditions, an IPFS file URI, or a smart contract address, may be included to supplement the mandatory email field and enhance transparency.

```json
{
    "@context": "http://www.daostar.org/schemas",
    "type": "DAO",
    "name": "<name of the DAO>",
    "description": "<description>",
     "legalURI": {
        "email": "legal@communityname.io",
        "legalDocument": <RECOMMENDED: An URI pointing to the legal document of Terms and Conditions>,
    }
}
```
You MAY point legalURI back to the daoURI address, which would indicate that all data published through daoURI constitutes legally-approved communication.

## Rationale
This specification is intended to help online communities collate and share data and information that is relevant for legal and compliance purposes, as well as to have an official line of communication to both members and to external parties. Doing so fosters transparency and trust within the community and the broader public.

Having an official channel ensures that important legal communications are promptly received and addressed. DAOs can set up:
- an email address dedicated to legal matters (e.g. legal@communityname.io)
- a Telegram handle specifically for legal correspondence.
- a dedicated channel on the official Discord server for legal notices.

Making legal information accessible to all participants is also vital. DAOs might use:
- a webpage on the DAO's official site to host legal documents and updates; and/or
- a designated channel on the official Discord server where legal information is posted and regularly updated.

Legal communications can include:
- Requests for information from regulators or private parties.
- Notices of legal proceedings initiated against the DAO or its members.
- Submissions to regulators, such as policy positions or compliance documentation.

Providing clear legal information helps participants understand their rights and obligations. Examples include:
- Jurisdictional disclaimers: Specifying regions where participation is restricted due to legal constraints.
- Terms of participation: Outlining codes of conduct, constitutions, or operating rules for DAO members.
- Terms of use for protocols: Detailing how participants can interact with the DAO governed activities and protocols.
- Feature and risk disclosures: Informing participants about the functionalities and potential risks of the DAO governed protocols.
- Tax treatment summaries: Offering general guidance on how interactions with the protocol may be taxed in different jurisdictions.
- Tax information statements: Providing documents like spreadsheets of crypto activity per address to assist with tax compliance, such as those aligning with the OECD’s Crypto-Asset Reporting Framework.
- Distribution statements: Sharing records of DAO Treasury payments or staking rewards distributed to participants.

## Copyright
Copyright and related rights waived via [CC0](https://eips.ethereum.org/LICENSE).