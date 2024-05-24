import React, { Fragment } from 'react';
import { Card, Divider } from '@blueprintjs/core';
import '../AttestationCard/AttestationCard.css';

const DisplayENSTextRecord = ({
  id,
  key,
  value,
  resolver
}) => {
  const daoName = resolver?.domain?.name ?? "Unknown DAO";
  const daoAddress = resolver?.domain?.resolvedAddress?.id ?? "Unknown DAO";
  const daoURI = value ? value : "https://daostar.org/registration";

  return (
    <Card className='wizard-card attestation-card'>
      <Fragment>
        <h3>{daoName}</h3>
        <Divider />
        <div className="card-metadata">
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">ENS ID: </span>
            {id}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">DAO Address: </span>
            {daoAddress}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">DAO URI: </span>
            {daoURI}
          </p>
        </div>
      </Fragment>
    </Card>
  );
};

export default DisplayENSTextRecord;
