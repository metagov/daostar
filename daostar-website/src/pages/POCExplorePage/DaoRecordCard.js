import React from "react";
import { Divider } from "@blueprintjs/core";

const firstCharToUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ObjListCard = ({ children }) => {
  return (
    <>
      {Object.keys(children).map((key) => (
        <p key={key}>
          {firstCharToUpperCase(key)}: {children[key]}
        </p>
      ))}
    </>
  );
};

const ListCard = ({ children }) => {
  // if array retun as list
  if (Array.isArray(children) && typeof children[0] === "string") {
    return children.map((child) => <p key={child}>{child}</p>);
  }

  // if array of objects return as json
  if (Array.isArray(children) && typeof children[0] === "object") {
    return children.map((item, index) => (
      <div style={{ marginBottom: 20 }} key={index}>
        <ObjListCard>{item}</ObjListCard>
      </div>
    ));
  }

  // if object return as json
  return JSON.stringify(children, null, 2);
};

const DaoRecordCard = ({ onClickEdit, data }) => {
  return (
    <>
      <h2
        style={{
          textAlign: "left",
          margin: "0 20px 20px",
          textTransform: "inherit",
        }}
      >
        {data.name}
      </h2>
      <Divider />
      <div className="card-metadata">
        <p className="bp4-text-small wizard-no-margin">
          <span className="bp4-text-muted">DAO ID: {data.id}</span>
        </p>
        <p className="bp4-text-small wizard-no-margin">
          <span className="bp4-text-muted">
            Date registered: {data.createdAt}
          </span>
        </p>
      </div>
      <Divider />

      <div className="card-metadata">
        <h3>DAO Addresses</h3>
        {[
          { label: "Treasury Addresses", value: data.treasuryAddresses },
          { label: "Token Addresses", value: data.tokenAddresses },
          { label: "DAO Factories", value: data.factories },
        ].map((item, index) => (
          <div className="card-metadata-row" key={item.label}>
            <div className="card-metadata-item">
              <h5>{item.label}</h5>
              {typeof item.value === "string" ? (
                <p className="bp4-text-large">{item.value}</p>
              ) : (
                <ListCard>{item.value}</ListCard>
              )}
            </div>
          </div>
        ))}

        <Divider style={{ marginTop: 20 }} />

        <h3>Formation and Status</h3>
        {[
          { label: "DAO Governance Forums", value: data.fora },
          { label: "Date of Formation", value: data.formationDate },
          { label: "Date of Review", value: data.reviewDate },
          { label: "DAO Status", value: data.status },
          { label: "Type of DAO", value: data.type },
          {
            label: "AML/CTF Status",
            value: data.amlStatus ? "Completed" : "Incomplete",
          },
        ].map((item, index) => (
          <div className="card-metadata-row" key={item.label}>
            <div className="card-metadata-item">
              <h5>{item.label}</h5>
              {typeof item.value === "string" ? (
                <p className="bp4-text-large">{item.value}</p>
              ) : (
                <ListCard>{item.value}</ListCard>
              )}
            </div>
          </div>
        ))}

        <Divider style={{ marginTop: 20 }} />

        <h3>Legal Representative</h3>
        <div className="card-metadata-row">
          <div className="card-metadata-item">
            <h5>Name</h5>
            <p className="bp4-text-large">
              {data.legalRepresentative.name || "None"}
            </p>
          </div>
        </div>
        <div className="card-metadata-row">
          <div className="card-metadata-item">
            <h5>Contact Details</h5>
            <div className="bp4-text-large">
              <ListCard>{data.legalRepresentative.contact}</ListCard>
            </div>
          </div>
        </div>

        <Divider style={{ marginTop: 20 }} />

        <h3>Jurisdictions</h3>
        {[
          { label: "Registrations", value: data.registrations },
          { label: "Presence", value: data.presence },
          { label: "Excluded Reach", value: data.exclusions },
          { label: "Legal Wrappers", value: data.wrappers },
        ].map((item, index) => (
          <div className="card-metadata-row" key={item.label}>
            <div className="card-metadata-item">
              <h5>{item.label}</h5>
              {typeof item.value === "string" ? (
                <p className="bp4-text-large">{item.value}</p>
              ) : (
                <ListCard>{item.value}</ListCard>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DaoRecordCard;
