---
daoip: 8
title: Recommended controls for DAOs (aka, DAO Security Standard)
description: A collection of recommended controls and policies for addressing various areas of vaguery surrounding DAO governance.
discussions-to: 
status: Draft
type: 
category: 
author: Amandeep <aman@daostar.org>, eth.limo <hello@eth.limo>, Raf Solari <raf@withtally.com>
created: 2024-10-22
---

## DAO Governance

DAO security is a multi-faceted concept. In the analysis below, we have considered multiple angles, including data transparency, decentralized ownership, vendor management, defense against governance attacks, physical security policy, etc. While the absence of some of these (for example, a physical security policy for delegates and key stakeholders) can lead to a critical security incident, others (for example, data transparency) may not have an immediate side effect. Even so, it may lead to second-order effects (e.g., low data transparency → loss of quality contributors → governance takeover).

Note that we also have a separate section for protocol DAOs, i.e, DAOs that control an on-chain protocol. All DAOs, whether or not they are a protocol DAO, are advised to consider the controls detailed in the first section.

## DAO Controls

| Control | Description |
| :--- | :--- |
| Data transparency | 1. `[MANDATORY]` The DAO should publish an up to date __governance document__, outlining the steps and stakeholders involved in governance.<br><br> Data transparency is critical to an organization’s security. The governance document should clearly define the person(s) responsible for its upkeep, along with a channel to reach out to them if information is incorrect or outdated.<br><br> Along with key details on governance design, and operational rules, the governance document __SHOULD__ include information on all *__privileged roles__* (details on who can do what). For example, can anyone create a new proposal, can proposals be vetoed, are proposal execution autonomous, etc? <br><br>2. `[RECOMMENDED]` The DAO should maintain a repository of all DAO-related artifacts.<br><br> DAO-related artifacts include (but are not limited to) grant programs; list of all smart contracts; list of functional committees, councils and multisigs; trusted service providers; and financial reporting. We recommend using the EIP-4824 standard to facilitate this, as it allows decentralized control of data by the DAO.|
| Ownership of digital assets | `[MANDATORY]` The DAO should release a public list of digital assets it owns and controls. The list could include ENS names and other naming services, dApps, frontends, etc. |
| Self defense, incident response, and vulnerability management | 1. `[MANDATORY]` The DAO must publish a self-defense and emergency management plan.<br><br> It is important to have an incident response plan, including details of what constitutes an emergency/incident. Note that the intention here is to prompt the creation of a plan - no critical details of the incident response plan need to be public. A template is available [here](https://www.michigan.gov/-/media/Project/Websites/msp/cjic/pdfs6/Example_Incident_Response_Policy.pdf?rev=4bf335b6d1344226a92a0947bc8688ec) (not Web3/DAO specific).<br><br>2. `[RECOMMENDED]` The DAO should publish a vulnerability management plan. Sample [template](https://frsecure.com/vulnerability-management-policy-template/) (not Web3/DAO specific).  |
| Vendor/service provider management Policy | 1. `[MANDATORY]` The DAO should publish a list of vendors/service providers it relies upon.<br><br> 2. `[RECOMMENDED]` The DAO should publish a vendor management policy. [Inspiration here](https://frameworks.securityalliance.org/external-security-reviews/vendor-selection.html).<br><br>*Vendors include all 3rd party service providers that provide a good or service to the DAO, including software services that are not paid by the DAO, but used for operations, governance or other avenues*.|
| Proposal safety | `[RECOMMENDED]` It is recommended to: <br><br><ul><li> Use a timelock before upgrading protocols that hold funds.</li><li>Simulate proposals before executing them.</li><li>Perform automated checks on proposals for common attacks.</li></ul> |
| Physical security policy | `[MANDATORY]` The DAO should publish a physical security policy, and provide training to combat wrench attacks.<br><br> While enforcing this is difficult, the DAO is recommended to focus on educational content that describes measures to be taken by key delegates, multisig signers, members of the foundation, and other important stakeholders to ensure security while traveling to conferences and other events. Inspiration taken from [here](https://github.com/OffcierCia/Crypto-OpSec-SelfGuard-RoadMap). |
| Community management | `[MANDATORY]` The DAO should follow secure community management processes, to secure community accounts on Twitter, Discord, Telegram, and other applications. Template [here](https://frameworks.securityalliance.org/community-management/index.html). |
| Compliance | `[MANDATORY]` The DAO must keep a record of its compliance efforts, including policies, procedures, and audit results. It should make its best efforts to comply with the regulatory frameworks applicable to its areas of incorporation.<br><br> Note that regardless of DAO jurisdiction or its regulatory standing, assets such as websites, frontends, forums, etc. can be subject to various data privacy laws. It is recommended to make a concerted effort to adhere to regulatory obligations to prevent future burdens or headaches such as “DSARs” and “Right to be forgotten” requests.|

## Protocol Controls

The following set of controls are authored for protocol DAOs, i.e DAOs that control an on-chain protocol. All DAOs, irrespective of whether they are a protocol DAO, are advised to follow the controls detailed in the previous section.

| Control | Description |
| :--- | :--- |
| Data transparency | 1. `[MANDATORY]` Code that the DAO governs should be available somewhere publicly, even if it is not open source. <br><br>2. `[RECOMMENDED]` All DAO related smart contracts including protocol, token, governance and treasury related smart contracts, should be verified on block explorers, if the provision exists.<br><br>3. `[RECOMMENDED]` There should be publicly accessible documentation on the protocol components, along with flow diagrams, design choices, dependencies and a record of critical privileged roles. |
| Code security | `[MANDATORY]` Protocol code __MUST__ be audited, and a comprehensive report detailing vulnerabilities and suggested improvements should be publicly available for the latest protocol version.|
| Proposal safety | `[RECOMMENDED]` It is recommended to: <br><br><ul><li> Use a timelock before upgrading protocols that hold funds.</li><li> Perform automated tests on code commits.</li></ul> |
| Bug bounty program | 1. `[RECOMMENDED]` The DAO is recommended to operate a bug bounty program, should it handle user funds.<br><br>2. `[RECOMMENDED]` The DAO is recommended to execute a white hat [Safe Harbor agreement](https://github.com/security-alliance/safe-harbor) if the provision exists.|
| Key management | `[MANDATORY]` Use isolated and purpose specific hardware wallets for multisig key holders and delegates. |
| Operational security policy for key entities |`[RECOMMENDED]` The DAO should require entities, including its foundation, founding company, or service providers with a long-term service agreement, to publish and adhere to an operational security policy.<br><br>Inspiration for the policy is [here](https://docs.google.com/document/d/1Aggn3oqT3lpTFyVmlncBTOowdpTsrGtPqCmdKcQnEdA/edit?usp=sharing). As above, the intention is to prompt operational security for all stakeholders and not to publish critical information publicly. |
| Subdomains for contracts and dApps | `[RECOMMENDED]` It is recommended to provide all contracts with ENS names. dApps should enforce ENS subdomain versioning schemas (v1, v2, etc) as mentioned [here](https://ethglobal.com/showcase/undefined-0ejxp).<br><br> This is a best practice for future management of organizational units when delegating responsibilities to working groups or other sub-organizations within the DAO. Additionally this provision helps ensure that versioning remains immutable and easy to understand.|

---

## Call to action

These controls are a community-driven initiative. Additional concerns warrant further discussion and research. Below are some areas that need further exploration:

* Development of proposal testing frameworks.
* How do DAOs execute white hat safe harbor agreements?
* Additional context on vulnerability management - if DAO code/applications become vulnerable to attack via known CVEs or outdated dependencies, how does the DAO identify, track, and remediate those? This includes proactive as well as reactive controls such as: pen testing, contract audits, CVE severity remediation timelines, proactive vulnerability scanning, access/audit log reviews and/or SIEM monitoring. 
