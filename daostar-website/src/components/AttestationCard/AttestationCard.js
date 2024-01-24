import React, { useState, Fragment } from 'react';
import { Button, Card, Divider, FormGroup, Spinner } from '@blueprintjs/core';
import EtherscanLink from "../RegistrationCard/DisplayRegistration/EtherscanLink/EtherscanLink";
import './AttestationCard.css'
import { Link } from 'react-router-dom';

const DisplayAttestation = ({
    id,
    data,
    decodedDataJson,
    recipient,
    attester,
    time,
    expirationTime,
    revocable,
    revoked,
    schemaId,
    ipfsHash,
    isOffchain,
    onClickEdit,
    standalone
  }) => {
    const decodedData = JSON.parse(decodedDataJson);
  
    const renderEtherscanLink = (address) => (
      <EtherscanLink address={address} />
    );
  
    const formatTime = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleString();
    };
  
    //Extract DAO Name
    const daoName = decodedData.find(item => item.name === "daoName")?.value.value || "Unknown DAO";
    const daoURI = decodedData.find(item => item.name === "daoURI")?.value.value || "https://daostar.org/registration";


    return (
    <Card
        className='wizard-card attestation-card'
    >
      <Fragment>
        <h3>{daoName}</h3>

        {standalone === true && (
          <Button
            className="edit-reg-btn"
            icon="edit"
            text="Edit"
            onClick={onClickEdit}
          />
        )}
        <Divider />
        <div className="card-metadata">
        <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Attestation ID: </span>
            {id}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Recipient Address: </span>
            {renderEtherscanLink(recipient)}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Attester Address: </span>
            {renderEtherscanLink(attester)}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Time: </span>
            <span className="card-metadata-value">{formatTime(time)}</span>
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Expiration Time: </span>
            <span className="card-metadata-value">{expirationTime ? formatTime(expirationTime) : 'None'}</span>
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Revocable: </span>
            <span className="card-metadata-value">{revocable ? 'Yes' : 'No'}</span>
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Revoked: </span>
            <span className="card-metadata-value">{revoked ? 'Yes' : 'No'}</span>
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Schema ID: </span>
            {schemaId}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">IPFS Hash: </span>
            {ipfsHash}
          </p>
         
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Offchain: </span>
            <span className="card-metadata-value">{isOffchain ? 'Yes' : 'No'}</span>
          </p>
          <Divider style={{ marginTop: '5px', marginBottom: '5px'}}/>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">DAO URI: </span>
            <Link target='_blank'  to={daoURI}>{daoURI}</Link>
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">Network: Optimism Goerli</span>
          </p>
        </div>
        <Divider />
        {decodedData && (
          <div className="card-metadata">
            <h6>Decoded Data:</h6>
            {decodedData.map((item, index) => (
              <p key={index} className="bp4-text-large">
                <strong>{item.name}:</strong> {item.value.value}
              </p>
            ))}
          </div>
        )}
      </Fragment>
      </Card>
    );
  };
  
  export default DisplayAttestation;