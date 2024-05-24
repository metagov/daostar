import React, { useState, useEffect, Fragment } from 'react';
import { Card, Divider } from '@blueprintjs/core';
import '../AttestationCard/AttestationCard.css';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { addEnsContracts } from '@ensdomains/ensjs';
import { getTextRecord } from '@ensdomains/ensjs/public';

const client = createPublicClient({
  chain: addEnsContracts(mainnet),
  transport: http(),
});

const DisplayENSTextRecord = ({
  name,
  resolvedAddress
}) => {
  const [daoURI, setDaoURI] = useState("Loading...");
  const daoName = name ?? "Unknown DAO";
  const daoAddress = resolvedAddress?.id ?? "Unknown DAO";

  useEffect(() => {
    const fetchDaoURI = async () => {
      try {
        const uri = await getTextRecord(client, {
          name,
          key: 'daouri',
        });
        setDaoURI(uri || "https://daostar.org/registration");
      } catch (error) {
        console.error("Error fetching DAO URI:", error);
        setDaoURI("https://daostar.org/registration");
      }
    };

    fetchDaoURI();
  }, [name]);

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
