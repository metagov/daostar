import React, { useState } from 'react';
import { Button, Card, Divider, FormGroup } from '@blueprintjs/core';
import './RegistrationCard.css';
import { Link } from 'react-router-dom';
import DisplayRegistration from './DisplayRegistration/DisplayRegistration';
import EditRegistration from './EditRegistration/EditRegistration';

const RegistrationCard = ({
    name,
    daoURI,
    managerAddress,
    description,
    membersURI,
    activityLogURI,
    proposalsURI,
    governanceURI,
    standalone = false // whether this card is presented within the explore view or on its own page
}) => {

    const [cardScreen, setScreen] = useState('DISPLAY'); // DISPLAY | EDIT | UPDATED
    const onClickEdit = () => setScreen('EDIT');
    const onCancelEdit = () => setScreen('DISPLAY');

    const contractAddress = daoURI.substring(daoURI.indexOf('0x'));
    const regID = daoURI.substring(daoURI.indexOf('eip'));

    const regCard = (
        <Card
            className='wizard-card registration-card'
        >
            {cardScreen === 'DISPLAY' && (
                <DisplayRegistration
                    onClickEdit={onClickEdit}
                    daoURI={daoURI}
                    contractAddress={contractAddress}
                    description={description}
                    name={name}
                    managerAddress={managerAddress}
                    standalone={standalone}
                />
            )}
            {cardScreen === 'EDIT' && (
                <EditRegistration
                    name={name}
                    daoURI={daoURI}
                    contractAddress={contractAddress}
                    description={description}
                    onCancelEdit={onCancelEdit}
                    membersURI={membersURI}
                    activityLogURI={activityLogURI}
                    proposalsURI={proposalsURI}
                    governanceURI={governanceURI}
                />
            )}
        </Card>
    )

    if (!standalone) {
        return (
            <Link to={`/registration/${regID}`} className='card-link'>
                {regCard}
            </Link>
        )
    }

    return regCard;
}

export default RegistrationCard;