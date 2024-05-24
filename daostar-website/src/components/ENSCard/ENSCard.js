import React, { Fragment } from 'react';
import { Card, Divider } from '@blueprintjs/core';
import '../AttestationCard/AttestationCard.css';

const DisplayENSTextRecord = ({
 name,
 resolvedAddress
}) => {
  const daoName = name ?? "Unknown DAO";
  const daoAddress = resolvedAddress?.id ?? "Unknown DAO";
  // const daoURI = value ? value : "https://daostar.org/registration";

  return (
    <Card className='wizard-card attestation-card'>
      <Fragment>
        <h3>{daoName}</h3>
        <Divider />
        <div className="card-metadata">
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">ENS ID: </span>
            {daoName}
          </p>
          <p className="bp4-text-small wizard-no-margin">
            <span className="bp4-text-muted">DAO Address: </span>
            {daoAddress}
          </p>
          <p className="bp4-text-small wizard-no-margin" style={{ fontStyle: 'italic'}}>
            <span className="bp4-text-muted">DAO URI: </span>
            DAO URI Info will be displayed soon
          </p>
        </div>
      </Fragment>
    </Card>
  );
};

export default DisplayENSTextRecord;
