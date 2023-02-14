import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { createDAO } from "../../graphql/mutations";
import cleanDeep from "clean-deep";

import validator from "validator";
import {
  Button,
  Callout,
  Checkbox,
  Divider,
  FormGroup,
  Radio,
  RadioGroup,
} from "@blueprintjs/core";
import TextInput from "./TextInput";
import RepeatableTextInput from "./RepeatableTextInput";
import RepeatableObjectInput from "./RepeatableObjectInput";
import Helptext from "./Helptext";

const RegistrationForm = () => {
  const navigate = useNavigate();

  // FORM STATE
  const [submitting, setSubmitting] = useState(false);
  const [registrationError, setRegError] = useState(null);
  const [validationErrors, setErrors] = useState(null);
  const [DaoId, setDaoId] = useState(null);
  const [daoStatus, setDaoStatus] = useState("withGovernance");
  const [daoType, setDaoType] = useState([]);
  const [amlStatus, setAmlStatus] = useState("false");
  const [daoRegistrations, setDaoRegistrations] = useState([]);
  const [daoName, setDaoName] = useState("");
  const [formationDate, setFormationDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [fora, setFora] = useState([""]);
  const [factories, setFactories] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [presence, setPresence] = useState([""]);
  const [treasuryAddresses, setTreasuryAddresses] = useState([
    { address: "", description: "" },
  ]);
  const [tokenAddresses, setTokenAddresses] = useState([
    { address: "", description: "" },
  ]);
  const [legalRepresentative, setLegalRepresentative] = useState({
    name: "",
    contact: [""],
  });
  const [wrappers, setWrappers] = useState([
    { name: "", jurisdiction: "", regulator: "", functions: "" },
  ]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactRole, setContactRole] = useState("");

  // CHANGE HANDLERS
  const handleTypeChange = (e) => {
    const { name } = e.target;
    if (daoType.includes(name)) {
      setDaoType(daoType.filter((type) => type !== name));
    } else {
      setDaoType([...daoType, name]);
    }
  };

  const handleRegistrationsChange = (e) => {
    const { name } = e.target;
    if (daoRegistrations.includes(name)) {
      return setDaoRegistrations(
        daoRegistrations.filter((type) => type !== name)
      );
    }
    setDaoRegistrations([...daoRegistrations, name]);
  };

  const handleLegalRepChange = (val, key) => {
    setLegalRepresentative({ ...legalRepresentative, [key]: val });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors(null);
    setRegError(null);

    let errors = [];

    const payload = {
      name: daoName,
      searchField: daoName.toLowerCase(),
      treasuryAddresses,
      tokenAddresses,
      factories,
      fora,
      formationDate,
      reviewDate,
      status: daoStatus,
      type: daoType,
      amlStatus,
      legalRepresentative,
      registrations: daoRegistrations,
      presence,
      exclusions,
      wrappers,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        company: contactCompany,
        role: contactRole,
      },
    };

    // iterate through payload and check for empty fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "") {
        errors.push(`${key} is required`);
      }
    });

    // check all address fields are valid

    for (let i = 0; i < payload.treasuryAddresses.length; i++) {
      const element = payload.treasuryAddresses[i];
      if (!element.address || !validator.isEthereumAddress(element.address)) {
        errors.push(
          `Treasury Address ${i + 1} is not a valid Ethereum address`
        );
      }
    }
    for (let i = 0; i < payload.tokenAddresses.length; i++) {
      const element = payload.tokenAddresses[i];
      if (!element.address || !validator.isEthereumAddress(element.address)) {
        errors.push(`Token Address ${i + 1} is not a valid Ethereum address`);
      }
    }

    // check review date is after formation date
    if (
      payload.formationDate &&
      payload.reviewDate &&
      payload.formationDate > payload.reviewDate
    ) {
      errors.push(`Review date must be after formation date`);
    }

    // check all email fields are valid
    if (!validator.isEmail(payload.contact.email)) {
      errors.push(`Contact email is not a valid email address`);
    }

    if (errors.length > 0) {
      setErrors(errors);
      setSubmitting(false);
      window.scrollTo(0, 0);
      return;
    }

    try {
      console.log("registrationData", payload);
      const res = await API.graphql(
        graphqlOperation(createDAO, { input: cleanDeep(payload) })
      );
      setDaoId(res.data.createDAO.id);
    } catch (err) {
      console.log("error creating DAO:", err);
      setRegError("An error occurred during registration.");
    }

    setSubmitting(false);
  };

  return (
    <>
      <h1 style={{ marginLeft: 20 }}>Register a DAO</h1>
      <div className="wizard-row" style={{ fontSize: 12 }}>
        Fill in all mandatory fields below to register a DAO. Your DAO is
        designated as a DAO* and an associated DAO* NFT will be minted to the
        DAO's Treasury address once validated. Failure to complete any of the
        mandatory fields may result in the expiration of your DAO* designation{" "}
      </div>

      <Button
        intent="primary"
        text="Explore registered DAOs"
        onClick={() => navigate("/test/explore")}
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      />
      {validationErrors && (
        <>
          <Divider vertical="true" />
          <div className="card-metadata">
            <Callout intent="danger">
              <p>Please address the following issues:</p>
              <ul>
                {validationErrors.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
              </ul>
            </Callout>
          </div>
        </>
      )}

      <Divider vertical="true" />

      <TextInput
        value={daoName}
        onChange={(val) => setDaoName(val)}
        label="DAO Name"
        placeholder="DAO Name"
        required
      />

      <Divider />
      <div className="wizard-row">
        <h3>DAO Addresses</h3>
      </div>

      <RepeatableObjectInput
        groupLabel="Treasury Addresses"
        value={treasuryAddresses}
        onChange={(val) => setTreasuryAddresses(val)}
        helptext="Ethereum Name Service (ENS) are not currently accepted."
        fields={[
          {
            placeholder: "DAO Treasury Address",
            name: "address",
            isValid: (val) => validator.isEthereumAddress(val),
            validationErrorMsg:
              "Contract address must be a valid Ethereum address",
            required: true,
          },
          {
            placeholder: "DAO Treasury Description (optional)",
            name: "description",
          },
        ]}
      />

      <RepeatableObjectInput
        groupLabel="Token Addresses"
        value={tokenAddresses}
        onChange={(val) => setTokenAddresses(val)}
        helptext="Ethereum Name Service (ENS) are not currently accepted."
        fields={[
          {
            placeholder: "DAO Token Address",
            name: "address",
            isValid: (val) => validator.isEthereumAddress(val),
            validationErrorMsg:
              "Contract address must be a valid Ethereum address",
            required: true,
          },
          {
            placeholder: "DAO Token Description (optional)",
            name: "description",
            helptext: `One of: Fungible (ERC-20), Non-fungible (ERC-725) or Semi-fungible (ERC-1155)`,
          },
        ]}
      />

      <RepeatableTextInput
        groupLabel="DAO Factory Protocols"
        value={factories}
        onChange={(val) => setFactories(val)}
        helptext="Factory protocols can include contracts and processes, such as https://github.com/lawfidao/daocontracts"
        fields={[
          {
            placeholder: "Factory Name",
          },
        ]}
      />

      <Divider />
      <div className="wizard-row">
        <h3>Formation and Status</h3>
      </div>

      <RepeatableTextInput
        groupLabel="DAO Governance Forums"
        helptext="Links to places for formal and informal governance discussions and voting such as Discord, Console, Snapshot, e.g. https://snapshot.org/#/lawfidao.eth "
        value={fora}
        onChange={(val) => setFora(val)}
        fields={[
          {
            placeholder: "Forum location",
            required: true,
          },
        ]}
      />

      <TextInput
        value={formationDate}
        onChange={(val) => setFormationDate(val)}
        label="Date of Formation"
        helptext={`Either the date of DAO token contract deployment, multisig wallet deployment, or white paper published.`}
        placeholder="YYYY-MM-DD"
        required
        isValid={(val) => {
          if (val === "") return true;
          return validator.isISO8601(val);
        }}
        validationErrorMsg="Date must be in YYYY-MM-DD format"
      />
      <TextInput
        value={reviewDate}
        onChange={(val) => setReviewDate(val)}
        label="Date of Review (optional)"
        helptext={`DAOs require review within one year of registration to maintain their DAO* status. You will be prompted by email to review the DAO's registration ahead of this review date.`}
        placeholder="YYYY-MM-DD"
        isValid={(val) => {
          if (val === "") return true;
          return validator.isISO8601(val);
        }}
        validationErrorMsg="Date must be in YYYY-MM-DD format"
      />
      <div className="wizard-row" style={{ marginBottom: 40 }}>
        <RadioGroup
          label="Status"
          onChange={(e) => setDaoStatus(e.target.value)}
          selectedValue={daoStatus}
        >
          <Helptext>
            To operate with governance, you need at least one proposal planned
            for the year and two paid contributors. Without governance, the
            factory protocols are not monitored or controlled by paid
            contributors.
          </Helptext>
          <Radio label="Operating with governance" value="withGovernance" />
          <Radio
            label="Operating without governance"
            value="withoutGovernance"
          />
          <Radio label="Warning (security risk unresolved)" value="warning" />
          <Radio label="Shut down" value="shutdown" />
          <Radio label="Restructured" value="restructured" />
        </RadioGroup>
      </div>

      <div className="wizard-row">
        <FormGroup label="Type of DAO" labelFor="type" fill>
          <Checkbox
            checked={daoType.includes("publicUseProtocol")}
            label="Public Use Protocol"
            name="publicUseProtocol"
            onChange={handleTypeChange}
          />
          <Checkbox
            checked={daoType.includes("memberUseProtocol")}
            label="Member Use Protocol"
            name="memberUseProtocol"
            onChange={handleTypeChange}
          />
        </FormGroup>
      </div>

      <div className="wizard-row" style={{ marginBottom: 40 }}>
        <RadioGroup
          label="AML/CTF status"
          onChange={(e) => {
            setAmlStatus(e.target.value);
          }}
          selectedValue={amlStatus}
        >
          <Helptext>Have you completed the AML/CTF module?</Helptext>
          <Radio label="Yes" value={"true"} />
          <Radio label="No" value={"false"} />
        </RadioGroup>
      </div>

      <Divider />
      <div className="wizard-row">
        <h3>Legal Representative</h3>
      </div>

      <TextInput
        value={legalRepresentative.name}
        onChange={(val) => handleLegalRepChange(val, "name")}
        placeholder="Name"
        label="Representative Name"
        helptext={`Such as "Example DAO Legal Representative Pty Ltd"`}
        required
      />
      <RepeatableTextInput
        value={legalRepresentative.contact}
        onChange={(val) => handleLegalRepChange(val, "contact")}
        groupLabel="Representative Contact"
        helptext={`Add all handles (Discord / Telegram), contact numbers and email addresses that are monitored and can provide a response within 24 hours.`}
        fields={[
          {
            placeholder: "Contact Details",
            required: true,
          },
        ]}
      />

      <Divider />
      <div className="wizard-row">
        <h3>Jursidictions</h3>
      </div>

      <div className="wizard-row">
        <FormGroup label="Registrations" labelFor="registrations" fill>
          <Helptext>
            Jurisdictions where the DAO is registered as a DAO (or equivalent).
            This field does not relate to legal wrappers.
          </Helptext>
          {[
            { label: "None", value: "NONE" },
            { label: "Delaware, USA", value: "US_DE" },
            { label: "Vermont, USA", value: "US_VT" },
            { label: "Wyoming, USA", value: "US_WY" },
            { label: "Bermuda", value: "BM" },
            { label: "Malta", value: "MT" },
            { label: "Marshall Islands", value: "MH" },
            { label: "Switzerland", value: "CH" },
          ].map((option, i) => (
            <Checkbox
              key={option.value}
              checked={daoRegistrations.includes(option.value)}
              label={option.label}
              name={option.value}
              onChange={handleRegistrationsChange}
            />
          ))}
        </FormGroup>
      </div>

      <RepeatableTextInput
        groupLabel="Presence"
        value={presence}
        onChange={(val) => setPresence(val)}
        helptext="Jurisdictions where members of the DAO (not its legal wrapper) are contributing and being paid from the DAO treasury or incentives paid in the DAO's tokens."
        fields={[
          {
            placeholder: "Jurisdiction",
            required: true,
          },
        ]}
      />
      <RepeatableTextInput
        groupLabel="Excluded Reach"
        helptext={`Jurisdictions that the DAO has geo-blocked.`}
        value={exclusions}
        onChange={(val) => setExclusions(val)}
        fields={[
          {
            placeholder: "Jurisdiction",
            required: true,
          },
        ]}
      />

      <RepeatableObjectInput
        groupLabel="Legal Wrappers"
        value={wrappers}
        onChange={(val) => setWrappers(val)}
        fields={[
          {
            placeholder: "Name",
            name: "name",
            helptext:
              "Such as LLC, cooperative, foundation, delegates and trustees. This field does not include service entities.",
          },
          {
            placeholder: "Jurisdiction",
            name: "jurisdiction",
          },
          {
            placeholder: "Regulator",
            name: "regulator",
          },
          {
            placeholder: "Functions",
            name: "functions",
            helptext:
              "List the key responsibilities managed by the DAO's legal entity, such as managing member relationships, handling disputes, protecting liability, managing taxes, and complying with laws.",
          },
        ]}
      />

      <Divider />
      <div className="wizard-row">
        <h3>Your details</h3>
      </div>
      <TextInput
        value={contactName}
        onChange={(val) => setContactName(val)}
        label="Your name"
        placeholder="Name"
        required
      />
      <TextInput
        value={contactEmail}
        onChange={(val) => setContactEmail(val)}
        label="Your email"
        placeholder="Email"
        required
        isValid={(val) => validator.isEmail(val)}
        validationErrorMsg="Email must be valid"
      />
      <TextInput
        value={contactPhone}
        onChange={(val) => setContactPhone(val)}
        label="Your number"
        placeholder="Phone number"
        required
      />
      <TextInput
        value={contactCompany}
        onChange={(val) => setContactCompany(val)}
        label="Company name"
        placeholder="Company you are representing"
        required
      />
      <TextInput
        value={contactRole}
        onChange={(val) => setContactRole(val)}
        label="Your Role"
        placeholder="Role"
        required
      />

      <Divider vertical="true" />

      {registrationError && (
        <div className="wizard-row wizard-center">
          <Callout intent="danger">
            <p>Required information is missing.</p>
            <p>Please fill out all fields.</p>
          </Callout>
        </div>
      )}
      {DaoId && (
        <div className="wizard-row wizard-center">
          <Callout intent="success">
            <p>Successfully registered</p>
            <p>{`Your DAO* ID is: ${DaoId}`}</p>
          </Callout>
        </div>
      )}

      <div className="wizard-row wizard-center">
        <Button
          intent="primary"
          text="Register"
          loading={submitting}
          onClick={handleSubmit}
        />
        <br />
        <p className="bp4-text-small wizard-no-margin">
          Registering will generate a DAO URI
        </p>
      </div>
    </>
  );
};

export default RegistrationForm;
