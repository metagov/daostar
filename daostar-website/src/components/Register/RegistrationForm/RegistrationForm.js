import React, { Fragment, useEffect, useState } from "react";
import validator from "validator";
import useAxios from "axios-hooks";
import {
  Button,
  Callout,
  Divider,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Switch,
  Dialog, DialogBody, DialogFooter,AnchorButton
} from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2"
import FRAMEWORK_URIs from "./FRAMEWORK_URIs";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "../../../utils/wagmi-utils";
import { useAccount, useNetwork, useContractRead } from "wagmi";
import { ethers } from 'ethers';

import RegistrationContract from "../../../abi/EASRegistrationContract";

const networkIds = {
  mainnet: 1,
  optimismSepolia: 11155420,
  // sepolia: 11155111
  chapel: 97,
  optimism: 10,
  arbitrum: 42161,
};

const RegistrationForm = ({ toggleRegScreen, setRegistrationData }) => {
  const {address,isConnected} = useAccount();
  const signer = useSigner();
  const {chain} = useNetwork();
  const [showEASRegisterDialog, setShowEASRegisterDialog] = useState(false);
  const [attestationURL, setAttestationURL] = useState('');
  const [easNetworkID, setEasNetworkID] = useState(1);
  const onChangeEASNetworkID = (e) => {
    const networkID = parseInt(e.target.value, 10);

    setEasNetworkID(networkID);
  };

  const [daoContractNetwork, setDaoContractNetwork] = useState("mainnet");
  const onChangeDaoContractNetwork = (e) => {
    setDaoContractNetwork(e.target.value);
    const networkName = e.target.value;
    setDaoContractNetwork(networkName);

    const framework = daoFramework;
    const address = daoContractAddress.toLowerCase();
    const networkId = networkIds[networkName];

    // if the user chooses a DAO framework, default the URIs to framework-specific values
    if (FRAMEWORK_URIs[framework] && address && networkId) {
      const frameworkSettings = FRAMEWORK_URIs[framework];
      if (frameworkSettings) {
        if (frameworkSettings.membersURI) {
          setDaoMembersURI(
            FRAMEWORK_URIs[framework].membersURI(address, networkId)
          );
        }
        if (frameworkSettings.proposalsURI) {
          setDaoProposalsURI(
            FRAMEWORK_URIs[framework].proposalsURI(address, networkId)
          );
        }
      }
    } else {
      setDaoMembersURI("");
      setDaoProposalsURI("");
    }
  };

  const [daoContractAddress, setDaoContractAddress] = useState("");
  const onChangeDaoContractAddress = (e) => {
    const address = e.target.value;
    setDaoContractAddress(address);

    const framework = daoFramework;
    const networkName = daoContractNetwork;
    const networkId = networkIds[networkName];

    // if the user chooses a DAO framework, default the URIs to framework-specific values
    if (FRAMEWORK_URIs[framework] && address && networkId) {
      const frameworkSettings = FRAMEWORK_URIs[framework];
      if (frameworkSettings) {
        if (frameworkSettings.membersURI) {
          setDaoMembersURI(
            FRAMEWORK_URIs[framework].membersURI(address, networkId)
          );
        }
        if (frameworkSettings.proposalsURI) {
          setDaoProposalsURI(
            FRAMEWORK_URIs[framework].proposalsURI(address, networkId)
          );
        }
      }
    } else {
      setDaoMembersURI("");
      setDaoProposalsURI("");
    }
  };

  const [registerByEAS, setRegisterByEAS] = useState(false);
  const onChangeRegisterType = (e) => {
    setErrors(null);
    setRegisterByEAS(!registerByEAS);
  };

  const [daoName, setDaoName] = useState("");
  const onChangeDaoName = (e) => setDaoName(e.target.value);

  const [daoURI, setDaoURI] = useState("");
  const onChangeDAOURI = (e) => setDaoURI(e.target.value)

  const [daoDescription, setDaoDescription] = useState("");
  const onChangeDaoDescription = (e) => setDaoDescription(e.target.value);

  const [daoMembersURI, setDaoMembersURI] = useState("");
  const onChangeMembersURI = (e) => setDaoMembersURI(e.target.value);

  const [contractAddress, setContractAddress] = useState("");
  const onChangeContractAddress = (e) => setContractAddress(e.target.value)

  const [issuerName, setIssuerName] = useState("");
  const onChangeIssuerName = (e) => setIssuerName(e.target.value)

  const [issuerDescription, setIssuerDescription] = useState("");
  const onChangeIssuerDescription = (e) => setIssuerDescription(e.target.value)

  const [daoIssuersURI, setDaoIssuersURI] = useState("");
  const onChangeIssuersURI = (e) => setDaoIssuersURI(e.target.value);

  const [daoActivityURI, setDaoActivityURI] = useState("");
  const onChangeActivityURI = (e) => setDaoActivityURI(e.target.value);

  const [daoProposalsURI, setDaoProposalsURI] = useState("");
  const onChangeProposalsURI = (e) => setDaoProposalsURI(e.target.value);

  const [daoContractsRegistryURI, setDaoContractsRegistryURI] = useState("");
  const onChangeContractsRegistryURI = (e) =>
    setDaoContractsRegistryURI(e.target.value);

  const [daoManagerAddress, setDaoManagerAddress] = useState("");
  const onChangeDaoManager = (e) => setDaoManagerAddress(e.target.value);

  const [daoGovURI, setDaoGovURI] = useState("");
  const onChangeDaoGovURI = (e) => setDaoGovURI(e.target.value);

  const [daoFramework, setDaoFramework] = useState("custom");
  const onChangeDaoFramework = (e) => {
    const framework = e.target.value;
    const address = daoContractAddress.toLowerCase();
    const networkName = daoContractNetwork;
    const networkId = networkIds[networkName];

    setDaoFramework(framework);
    // if the user chooses a DAO framework, default the URIs to framework-specific values
    if (FRAMEWORK_URIs[framework] && address && networkId) {
      const frameworkSettings = FRAMEWORK_URIs[framework];
      if (frameworkSettings) {
        if (frameworkSettings.membersURI) {
          setDaoMembersURI(
            FRAMEWORK_URIs[framework].membersURI(address, networkId)
          );
        }
        if (frameworkSettings.proposalsURI) {
          setDaoProposalsURI(
            FRAMEWORK_URIs[framework].proposalsURI(address, networkId)
          );
        }
      }
    } else {
      setDaoMembersURI("");
      setDaoProposalsURI("");
    }
  };

  const [registrationError, setRegError] = useState(null);

  const [validationErrors, setErrors] = useState(null);

  const [registerLoading, setRegisterLoading] = useState(false);

  const [
    {
      data: registeredData,
      loading: sendingRegistration,
      error: registerError,
    },
    executeRegistration,
  ] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/immutable`,
      method: "POST",
    },
    { manual: true }
  );

  // display an error if the server responds with an error
  useEffect(() => {
    if (registerError) {
      switch (registerError.response.status) {
        case 409:
          setRegError(`That DAO has already been registered`);
          break;
        default:
          setRegError(`Something's not right – try again later`);
      }
    }
  }, [registerError]);

  const onRegister = () => {
    let errors = [];
    if (daoFramework === "snapshot") {
      if (!daoContractAddress.includes(".eth"))
        errors.push("Must be valid ENS name");
    } else {
      if (
        !validator.isEthereumAddress(daoContractAddress) &&
        daoFramework !== "custom"
      )
        errors.push("Contract address must be a valid ethereum address");
    }
    if (daoName === "") errors.push(`DAO must have a name`);
    if (daoManagerAddress && !validator.isEthereumAddress(daoManagerAddress))
      errors.push("Manager address must be a valid ethereum address");
    if (daoGovURI !== "" && !validator.isURL(daoGovURI))
      errors.push("Governance URI must be a valid URI");
    if (daoMembersURI !== "" && !validator.isURL(daoMembersURI))
      errors.push(`Members URI must be a valid URI`);
    if (daoActivityURI !== "" && !validator.isURL(daoActivityURI))
      errors.push(`Activity Log URI must be a valid URI`);
    if (daoProposalsURI !== "" && !validator.isURL(daoProposalsURI))
      errors.push(`Proposals URI must be a valid URI`);
    if (
      daoContractsRegistryURI !== "" &&
      !validator.isURL(daoContractsRegistryURI)
    )
      errors.push(`Contracts Registry URI must be a valid URI`);
    if (daoIssuersURI !== "" && !validator.isURL(daoIssuersURI))
      errors.push(`Issuer URI must be a valid URI`);

    if (errors.length > 0) {
      setErrors(errors);
      window.scrollTo(0, 0);
    }
    if (errors.length === 0) {
      let registrationData = {
        data: {
          name: daoName,
          description: daoDescription,
          governanceURI: daoGovURI,
          membersURI: daoMembersURI,
          proposalsURI: daoProposalsURI,
          activityLogURI: daoActivityURI,
          contractsRegistryURI: daoContractsRegistryURI,
          managerAddress: daoManagerAddress,
          issuersURI: daoIssuersURI,
        },
      };
      executeRegistration({
        data: registrationData,
      }).then((response) => {
        setRegistrationData({
          daoURI: response.data.url,
          daoContractAddress: daoContractAddress,
          daoContractNetwork: daoContractNetwork,
          daoName: daoName,
          daoDescription: daoDescription,
          managerAddress: daoManagerAddress,
          governanceURI: daoGovURI,
          membersURI: daoMembersURI,
          proposalsURI: daoProposalsURI,
          activityLogURI: daoActivityURI,
          contractsRegistryURI: daoContractsRegistryURI,
          issuersURI: daoIssuersURI,
        });
        toggleRegScreen("REG_RECEIVED");
      });
    }
  };

  function validateField(spec) {
    const { name, value, validator, errorMessage, type } = spec;

    // Handling undefined or empty values
    if (value === undefined || value === '') {
        return errorMessage || `Empty value for field "${name}"`;
    }

    // Directly using validator for specific checks
    if (validator && !validator(value)) {
        return errorMessage || `Invalid value for field "${name}"`;
    }

    if (type === 'uint256' && (!Number.isInteger(value) || value < 0)) {
        return `Invalid type for field "${name}". Expected uint256, got ${typeof value} got ${value}`;
    }
    if (type === 'string' && typeof value !== 'string') {
        return `Invalid type for field "${name}". Expected string, got ${typeof value}`;
    }

    return null; 
}

function validateAll(fields) {
    const errors = fields.map(validateField).filter(error => error !== null);
    return errors;
}


  const onRegisterByEAS = async () => {
    let validationErrors = [];

    if (!isConnected || !chain) {
      validationErrors.push(`Please connect your wallet and ensure chain information is available.`);
      setErrors(validationErrors);
      window.scrollTo(0, 0);
      return;
  }

      // Setting Environment based on chain ID
      let easscanURL = chain.id === 11155420 ? "https://optimism-sepolia.easscan.org/schema/view" : 'https://optimism.easscan.org/schema/view';
      let schemaUid = chain.id === 11155420 ? '0x306fda1c3128d08699d4c5b4e3f397fa31c8f5927b0e751f40f45ee1273ac504' : '0x1b1837dfb994702896d5d19bb0d66cf16ea30d8523765b938ec029088f90f904';
      let registrationContract = chain.id === 11155420 ? '0xF124Aca94e664Bfd5373feA9E2410FD799a8a08B' : '0xb35AA0cB89eC35f04c30E19B736b8ae1904EC26b';
    
    const fields = [
      { name: 'DAO NetworkID', value: easNetworkID, type: 'uint256', errorMessage: "Network ID of Contract Address must be provided" },
      { name: 'DAO Name', value: daoName, type: 'string', errorMessage: "DAO must have a name" },
      { name: 'DAO URI', value: daoURI, type: 'string', validator: validator.isURL, errorMessage: "DAO URI must be a valid URI" },
      { name: 'Contract Address', value: contractAddress, validator: validator.isEthereumAddress, type: 'address', errorMessage: "Contract address must be a valid Ethereum address" },
      { name: 'Issuer Name', value: issuerName, type: 'string', errorMessage: "Issuer name must be provided" },
      { name: 'Issuer Description', value: issuerDescription, type: 'string', errorMessage: "Issuer description must be provided" },
  ];

  validationErrors = validateAll(fields);

  if (!isConnected) validationErrors.push(`Please connect your wallet to Optimism Mainnet`);
  if (!(chain.id === 10 || chain.id === 11155420)) {
    validationErrors.push(`Switch to Optimism Mainnet`);
}
  if (validationErrors.length > 0) {
      setErrors(validationErrors);
      window.scrollTo(0, 0);
      return;
  }

  const data = fields.map(({ name, value, type }) => ({ name, value, type }));

  let encodedData;
  try {
      const schemaEncoder = new SchemaEncoder("uint256 networkID,string daoName,string daoURI,address contractAddress,string issuerName,string issuerDescription");
      encodedData = schemaEncoder.encodeData(data);
  } catch (error) {
      console.error(`Data encoding error: ${error.message}`);
      setErrors([`Data encoding error: ${error.message}`]);
      return;
  }

  
    setRegisterLoading(true);
  
    try {
      // Checking authority
      const contract = new ethers.Contract(registrationContract, RegistrationContract, signer);
      const memberRole = await contract.MEMBER_ROLE();
      const isMember = await contract.hasRole(memberRole, address);
  
      if (!isMember) throw new Error('You have no authorization.');
  
      const eas = new EAS('0x4200000000000000000000000000000000000021');
      eas.connect(signer);
  
      // Performing attestation
      const attestation = await eas.attest({
        schema: schemaUid,
        data: {
          recipient: address,
          expirationTime: 0,
          revocable: true,
          refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          data: encodedData,
          value: 0,
        },
      });
  
      setAttestationURL(`${easscanURL}/${schemaUid}`);
      setShowEASRegisterDialog(true);
    } catch (e) {
      console.error("Attest error:", e);
      setErrors([`Register Error. ${e.message || e.toString()}`]);
    } finally {
      setRegisterLoading(false);
    }
  };
  

  const onHandleCloseEASRegisterDialog = () => {
    setShowEASRegisterDialog(false);
  }

  const EthNetworksSelect = (
    <HTMLSelect
      style={{ minWidth: 140 }}
      iconProps={{ icon: "caret-down", color: "#fff" }}
      value={daoContractNetwork}
      onChange={onChangeDaoContractNetwork}
      options={[
        { label: "Mainnet", value: "mainnet" },
        { label: "Optimism", value: "optimism" },
        { label: "Optimism Sepolia", value: "optimismSepolia" },
        { label: "Arbitrum", value: "arbitrum" },
        { label: "BNB Bruno", value: "chapel" },
      ]}
    />
  );

  const FrameworkSelect = (
    <HTMLSelect
      id="framework"
      fill
      iconProps={{ icon: "caret-down", color: "#fff" }}
      onChange={onChangeDaoFramework}
      placeholder="Select framework"
      options={[
        { label: "Custom", value: "custom" },
        { label: "Moloch", value: "molochv2" },
        { label: "Safe", value: "safe" },
        { label: "DAODAO", value: "daodao" },
        { label: "Snapshot", value: "snapshot" },
      ]}
    />
  );

  const errorCallout = validationErrors ? (
    <Callout intent="danger">
      <p>Please address the following issues:</p>
      <ul>
        {validationErrors.map((error, i) => {
          return <li key={i}>{error}</li>;
        })}
      </ul>
    </Callout>
  ) : null;

  return (
    <Fragment>
      <div style={{display: "flex", justifyContent: "space-between", alignItems:"baseline", paddingRight:"20px"}}>
        <h3>Register your DAO</h3>
        <Switch checked={registerByEAS} alignIndicator={'right'} labelElement={<label>Register through EAS</label>} large onChange={onChangeRegisterType} />
      </div>
      {validationErrors && (
        <Fragment>
          <Divider vertical />
          <div className="card-metadata">{errorCallout}</div>
        </Fragment>
      )}
      <Divider vertical={true} />

      {!registerByEAS && (
          <div style={{width:'100%'}}>
            <div className="wizard-row wizard-row-flex">
              <FormGroup label="Contract address">{EthNetworksSelect}</FormGroup>
              <InputGroup
                  fill
                  placeholder="Enter DAO address or id (eg ENS for snapshot)"
                  value={daoContractAddress}
                  onChange={onChangeDaoContractAddress}
                  disabled={daoFramework !== "custom" ? false : true}
              />
            </div>
            <div className="wizard-row">
              <FormGroup label="Name" labelFor="name" fill>
                <InputGroup
                    fill
                    id="name"
                    placeholder="Enter DAO name"
                    value={daoName}
                    onChange={onChangeDaoName}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="Description" labelFor="description" fill>
                <InputGroup
                    fill
                    id="description"
                    placeholder="Enter DAO description"
                    value={daoDescription}
                    onChange={onChangeDaoDescription}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="Framework" labelFor="framework" fill>
                {FrameworkSelect}
              </FormGroup>
            </div>
            <div className="wizard-row">
              <Divider />
            </div>
            <div>
              <div className="wizard-row">
                <FormGroup label="Members URI" labelFor="members-uri" fill>
                  <InputGroup
                      fill
                      id="members-uri"
                      value={daoMembersURI}
                      placeholder="Enter URI to members"
                      onChange={onChangeMembersURI}
                  />
                </FormGroup>
              </div>
              <div className="wizard-row">
                <FormGroup label="Activity Log URI" labelFor="activity-log-uri" fill>
                  <InputGroup
                      fill
                      id="activity-log-uri"
                      placeholder="Enter URI to activity log"
                      value={daoActivityURI}
                      onChange={onChangeActivityURI}
                  />
                </FormGroup>
              </div>
              <div className="wizard-row">
                <FormGroup label="Proposals URI" labelFor="proposals-uri" fill>
                  <InputGroup
                      fill
                      id="proposals-uri"
                      placeholder="Enter URI to proposals"
                      value={daoProposalsURI}
                      onChange={onChangeProposalsURI}
                  />
                </FormGroup>
              </div>
              <div className="wizard-row">
                <FormGroup label="Issuers URI" labelFor="proposals-uri" fill>
                  <InputGroup
                      fill
                      id="issuer-uri"
                      placeholder="Enter URI for Issuers"
                      value={daoIssuersURI}
                      onChange={onChangeIssuersURI}
                  />
                </FormGroup>
              </div>
              <div className="wizard-row">
                <FormGroup
                    label="Contracts Registry URI (optional)"
                    labelFor="contracts-registry-uri"
                    fill
                >
                  <InputGroup
                      fill
                      id="contracts-registry-uri"
                      placeholder="Enter URI to contracts registry"
                      value={daoContractsRegistryURI}
                      onChange={onChangeContractsRegistryURI}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="wizard-row">
              <FormGroup
                  label="Manager address (optional)"
                  labelFor="manager-address"
                  fill
              >
                <InputGroup
                    fill
                    id="manager-address"
                    placeholder="Enter address of DAO manager"
                    value={daoManagerAddress}
                    onChange={onChangeDaoManager}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup
                  label="Governance document (optional)"
                  labelFor="governance-document"
                  fill
              >
                <InputGroup
                    fill
                    id="governance-document"
                    placeholder="Enter URI to governance document (.md)"
                    value={daoGovURI}
                    onChange={onChangeDaoGovURI}
                />
              </FormGroup>
            </div>
            <Divider vertical={true} />
            {registrationError && (
                <div className="wizard-row wizard-center">
                  <Callout intent="danger">{registrationError}</Callout>
                </div>
            )}
            <div className="wizard-row wizard-center">
              <Button
                  intent="primary"
                  text="Register"
                  loading={sendingRegistration}
                  onClick={onRegister}
              />
              <br />
              <p className="bp4-text-small wizard-no-margin">
                Registering will generate a DAO URI
              </p>
            </div>
          </div>
      )}
      {registerByEAS && !showEASRegisterDialog && (
          <div style={{width:'100%'}}>
            <div className="wizard-row wizard-row-flex">
              <FormGroup label="DAO Network ID">
                <HTMLSelect
                    style={{ minWidth: 140 }}
                    iconProps={{ icon: "caret-down", color: "#fff" }}
                    value={easNetworkID}
                    onChange={onChangeEASNetworkID}
                    options={[
                      { label: "Ethereum", value: 1 },
                      { label: "Optimism", value: 10 },
                      { label: "Arbitrum", value: 42161 },
                    ]}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="DAO Name" labelFor="dao-name" fill>
                <InputGroup
                    fill
                    id="dao-name"
                    placeholder="Enter DAO name"
                    value={daoName}
                    onChange={onChangeDaoName}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="DAO URI" labelFor="dao-uri" fill>
                <InputGroup
                    fill
                    id="dao-uri"
                    value={daoURI}
                    placeholder="Enter DAO URI"
                    onChange={onChangeDAOURI}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="DAO Contract Address" labelFor="contract-address" fill>
                <InputGroup
                    fill
                    id="contract-address"
                    value={contractAddress}
                    placeholder="Enter Contract Address"
                    onChange={onChangeContractAddress}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="Issuer Name" labelFor="issuer-name" fill>
                <InputGroup
                    fill
                    id="issuer-name"
                    value={issuerName}
                    placeholder="Enter Issuer Name"
                    onChange={onChangeIssuerName}
                />
              </FormGroup>
            </div>
            <div className="wizard-row">
              <FormGroup label="Issuer Description" labelFor="issuer-description" fill>
                <InputGroup
                    fill
                    id="issuer-description"
                    value={issuerDescription}
                    placeholder="Enter Issuer Description"
                    onChange={onChangeIssuerDescription}
                />
              </FormGroup>
            </div>
            <div style={{display:"flex", justifyContent:'space-between', margin: '40px 24px'}}>
              <AnchorButton
                  href={`https://docs.daostar.org/How%20To's/DifferentPaths`}
                  target="_blank"
                  icon="link"
                  text='Get More Details'
                  small={true}
                  fill={false}
              />
              <Button
                  intent="primary"
                  text="Register"
                  loading={registerLoading}
                  onClick={onRegisterByEAS}
              />
            </div>
          </div>
      )}
      {registerByEAS && showEASRegisterDialog && (
          <div style={{ width:'100%'}}>
            <div style={{margin:"40px 24px",display:"flex",justifyContent:"center"}}>
              <p style={{fontSize:"15px"}}>
                <strong>
                  Congratulations, DAO registered.
                </strong>
              </p>
            </div>
            <div style={{margin:"60px 24px",display:"flex",justifyContent:"center"}}>
              <AnchorButton
                  intent="primary"
                  href={attestationURL}
                  target="_blank"
                  icon="share"
                  fill={false}
              >
                View onchain
              </AnchorButton>
            </div>
          </div>
      )}

    </Fragment>
  );
};

export default RegistrationForm;
