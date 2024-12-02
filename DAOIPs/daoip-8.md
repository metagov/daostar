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

# Simple Summary

A set of applicable controls for improving DAO security

# Motivation

DAO security is a multi-faceted concept. Because of their decentralized nature, security measures vary across DAOs. DAOIP-8 aims to establish a minimum viable security standard among DAOs. Our intention is to ensure that at least the controls defined in this guide are standard practice in all organizations, irrespective of their scale. In writing this, we have considered data transparency, decentralized ownership, proposal safety, vendor management, defense against governance attacks, physical security, code upgrades, and other angles. While the absence of some of these (for example, a physical security policy for delegates) can lead to a critical security incident, others (for example, data transparency) may not have an immediate side effect. Even so, it may lead to second-order effects (e.g., low data transparency → loss of quality contributors → governance takeover). Hence, all DAOs are recommended to make their best effort to follow the controls outlined below.

Please note that this guide is a work in progress. It should not be taken as the gold standard when it comes to DAO security, but rather as the minimum. Several sections (for example, _vendor management policy_, or _incident response_) need to be polished to fit the design of your DAO. Security practices in web2 organizations are generally more mature than in web3 organizations like DAOs. Therefore, many of the templates and inspiration documents referenced have web2 origins. We urge DAOs to modify them considering their unique properties.

Controls below are categorized into: 
1. `[MANDATORY]`: includes measures that are critical to ensuring DAO security.
2. `[RECOMMENDED]`: includes measures that may not have an immediate effect, but have second-order security effects.

We recommend following both categories of controls to ensure maximum security in your DAO.

The second section is for _protocol DAOs_, i.e., DAOs that control an on-chain protocol. All DAOs, whether or not they are a _protocol DAO_, are advised to consider the controls detailed in the first section.

Community contributions are essential for the ongoing evolution of this guide. Kindly refer to the contribution guide below for instructions.

# Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## DAO Controls

| Control | Description |
| :--- | :--- |
| Data transparency | 1. `[MANDATORY]` The DAO should publish an up to date __governance document__, outlining the steps and stakeholders involved in governance.<br><br> Data transparency is critical to an organization’s security. The governance document should clearly define the person(s) responsible for its upkeep, along with a channel to reach out to them if information is incorrect or outdated. The governance document should include but not limit to the following:<br><br><ul><li>Mandatroy steps in the governance process (temp checks, RFCs, timelines, vote thresholds), type of election (ranked choice, single choice, first past the post, etc).</li><li>Rules of elections, and elected position descriptions and contact information.</li></ul> Along with key details on governance design, and operational rules, the governance document __SHOULD__ include information on all *__privileged roles__* (details on who can do what). Privileged roles should include information pertaining to the powers delegated to said role and identify the addresses associated with each role. For example, can anyone create a new proposal, can proposals be vetoed, are proposal executions autonomous, etc?<br><br>In addition to the governance process, all official service providers and their respective responsibilities should be detailed along with contact information for each team. <br><br>2. `[RECOMMENDED]` The DAO should maintain a repository of all DAO-related artifacts.<br><br> DAO-related artifacts include (but are not limited to) grant programs; list of all smart contracts; list of functional committees, councils and multisigs; trusted service providers; and financial reporting. We recommend using the EIP-4824 standard to facilitate this, as it allows decentralized control of data by the DAO.|
| Ownership of assets | `[MANDATORY]` The DAO should make public a list of all assets it owns and controls. The list could include crypto tokens, ENS names and other naming services, dApps, frontends, physical assets, etc. |
| Self defense, incident response, auditing, and vulnerability management |It is imperative to have a course of action or otherwise defensive capability for responding to security incidents and events which pose a risk to the core operations of a DAO or it's technical assets. This includes things such as CVE remediation, DNS hijacking/infrastructure compromise, KPI definitions for security event monitoring and response. The intention here is to prompt the creation of a plan - no critical details of the incident response plan need to be public. A template for inspiration is available [here](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf) (not Web3/DAO specific). While there are many overlapping security considerations with Web2 practices, it is important to take DAO specific concerns into account. Additionally, it is necessary to also consider proactive controls for things such as MFA requirements, IAM best practices and regular reviews/audits of permissions for developers or technical contributors. <br><br> 1. `[MANDATORY]` The DAO must publish a self-defense and emergency management plan.<br><br> 2. `[RECOMMENDED]` The DAO should publish a vulnerability management plan. Sample [template](https://frsecure.com/vulnerability-management-policy-template/) (not Web3/DAO specific).  |
| Vendor/service provider management Policy | 1. `[MANDATORY]` The DAO should publish a list of vendors/service providers it relies upon.<br><br> 2. `[RECOMMENDED]` The DAO should publish a vendor management policy. [Inspiration here](https://frameworks.securityalliance.org/external-security-reviews/vendor-selection.html).<br><br>*Vendors include all 3rd party service providers that provide a good or service to the DAO, including software services that are not paid by the DAO, but used for operations, governance or other avenues*.|
| Proposal safety | `[RECOMMENDED]` It is recommended to: <br><br><ul><li> Use a timelock before upgrading protocols that hold funds.</li><li>Simulate proposals before executing them.</li><li>Perform automated checks on proposals for common attacks.</li><li>Quorum threshold definitions for core governance changes.</li><li>Auditing and review of governance mutating transactions by qualified contributors to ensure expected outcomes match voter preferences.</li></ul> |
| Physical security training | `[MANDATORY]` The DAO should publish a physical security recommendation and provide training to combat wrench attacks.<br><br> The DAO is recommended to focus on educational content that describes measures to be taken by key delegates, multisig signers, members of the foundation, and other important stakeholders to ensure security while traveling to conferences and other events. Inspiration taken from [here](https://github.com/OffcierCia/Crypto-OpSec-SelfGuard-RoadMap). Key recommendations could include the following:<br><br><ul><li>Hardware wallet management.</li><li>Laptop security.</li><li>Usage of public WiFi.</li><li>Social engineering defense.</li><li>AirBnB/hotel security.</li></ul> |
| Community management | `[MANDATORY]` The DAO should follow secure community management processes, to secure community accounts on Twitter, Discord, Telegram, and other applications. This section is intended to be a companion to the incident response and emergency management recommendations. For example, a defined process for responding to and remediating a compromised social media account. Template [here](https://frameworks.securityalliance.org/community-management/index.html). |
| Compliance | `[MANDATORY]` The DAO must keep a record of its compliance efforts, including policies, procedures, and audit results. It should make its best efforts to comply with the regulatory frameworks applicable to its areas of incorporation.<br><br> Note that regardless of DAO jurisdiction or its regulatory standing, assets such as websites, frontends, forums, etc. can be subject to various data privacy laws. It is recommended to make a concerted effort to adhere to regulatory obligations to prevent future burdens or headaches such as “DSARs” and “Right to be forgotten” requests.|

## Protocol Controls

The following set of controls are authored for protocol DAOs, i.e DAOs that control an on-chain protocol. All DAOs, irrespective of whether they are a protocol DAO, are advised to follow the controls detailed in the previous section.

| Control | Description |
| :--- | :--- |
| Data transparency | 1. `[MANDATORY]` Code that the DAO governs should be available somewhere publicly. <br><br>2. `[RECOMMENDED]` All DAO related smart contracts including protocol, token, governance and treasury related smart contracts, should be documented, as well as verified on block explorers, if the provision exists. For example, there should be publicly accessible documentation on the protocol components, along with flow diagrams, design choices, dependencies and a record of critical privileged roles. |
| Code security | `[MANDATORY]` Protocol code __MUST__ be audited, and a comprehensive report detailing vulnerabilities and suggested improvements should be publicly available for the latest protocol version.|
| Bug bounty program | 1. `[RECOMMENDED]` The DAO is recommended to operate a bug bounty program.<br><br>2. `[RECOMMENDED]` The DAO is recommended to execute a white hat [Safe Harbor agreement](https://github.com/security-alliance/safe-harbor) if the provision exists.|
| Key management | `[MANDATORY]` Use isolated and purpose specific hardware wallets for multisig key holders and delegates. SAFEs or other account abstraction implementations should also be deployed in all operational areas. |
| Operational security policy for key entities |`[RECOMMENDED]` The DAO should require entities, including its foundation, founding company, or service providers with a long-term service agreement, to publish and adhere to an operational security policy.<br><br>Inspiration for the policy is [here](https://docs.google.com/document/d/1Aggn3oqT3lpTFyVmlncBTOowdpTsrGtPqCmdKcQnEdA/edit?usp=sharing). As above, the intention is to prompt operational security for all stakeholders and not to publish critical information publicly. |
| Subdomains for contracts and dApps | `[RECOMMENDED]` It is recommended to provide all contracts with ENS names. dApps should enforce ENS subdomain versioning schemas (v1, v2, etc) as mentioned [here](https://ethglobal.com/showcase/undefined-0ejxp).<br><br> This is a best practice for future management of organizational units when delegating responsibilities to working groups or other sub-organizations within the DAO. Additionally this provision helps ensure that versioning remains immutable and easy to understand.|

---

# Discussions, Contribution Guide & Call to Action

We welcome community contributions to improve DAOIP-8! Here’s how you can contribute:

1. **Fork the Repository:**
   - Visit [DAOIP-8 on GitHub](https://github.com/metagov/daostar/edit/main/DAOIPs/daoip-8.md) and fork the repository.

2. **Make Your Changes:**
   - Edit the file to make improvements, fix errors, or add new controls.
   - Ensure your changes are clear, concise, and align with the purpose of the standard.

3. **Submit a Pull Request (PR):**
   - Once you've made your changes, create a pull request explaining the modifications.
   - Add a brief description of why your changes are necessary or how they enhance the standard.

4. **Review Process:**
   - Your PR will be reviewed by maintainers.
     
5. **Join the Discussion:**
   - For major changes or new ideas, consider starting a discussion in this telegram group first (invite link: https://t.me/+3vBZY4NhWBhmN2U9)

Thank you for helping improve DAOIP-8!

**Below are some areas that need further exploration:**

* Development of proposal testing frameworks.
* Creation of DAO specific policies for vendor management, vulnerability management, etc. 
* How can DAOs execute white hat safe harbor agreements?
* How to better enforce the controls defined above?
