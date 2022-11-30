import React, { useState } from 'react';
import { Button, Card, Divider, FormGroup, Spinner } from '@blueprintjs/core';
import './RegistrationCard.css';
import { Link } from 'react-router-dom';
import DisplayRegistration from './DisplayRegistration/DisplayRegistration';
import EditRegistration from './EditRegistration/EditRegistration';
import RegistrationReceived from '../Register/RegistrationReceived/RegistrationReceived';
import useAxios from 'axios-hooks';

const RegistrationCard = ({
    daoURI,
    daoAddress,
    managerAddress,
    standalone = false // whether this card is presented within the explore view or on its own page
}) => {
    
    // TODO: use daoURI when real registrations exist
    const mockDaoURI = `${process.env.REACT_APP_API_URL}/immutable/QmQxai8pjtJg8wSZCvP2YcSDMAMLMEqQJjaS45brkFCvho`;
    const regID = mockDaoURI.substring(mockDaoURI.indexOf('immutable/')).substring(10);
    console.log('regID', regID);
    const [{ data, loading, error }] = useAxios(mockDaoURI);

    const [cardScreen, setScreen] = useState('DISPLAY'); // DISPLAY | EDIT | UPDATED
    const onClickEdit = () => setScreen('EDIT');
    const onSetCardScreen = (screen) => setScreen(screen);
    const onCancelEdit = () => setScreen('DISPLAY');
    const [updatedData, setUpdatedData] = useState(null);

    if (error) return 'error';
    if (loading) return (
        <Card className='wizard-card registration-card'>
            <Spinner size={16} color={'#ffffff'} />
        </Card>
    );

    const { 
        name, 
        description, 
        membersURI, 
        proposalsURI, 
        activityLogURI, 
        governanceURI 
    } = data;

    const contractAddress = daoAddress;
    
    const regCard = (
        <Card
            className='wizard-card registration-card'
        >
            {cardScreen === 'DISPLAY' && (
                <DisplayRegistration 
                    onClickEdit={onClickEdit}
                    daoURI={mockDaoURI}
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
                    onSetCardScreen={onSetCardScreen}
                    setUpdatedData={setUpdatedData}
                />
            )}
            {cardScreen === 'UPDATED' && (
                <RegistrationReceived 
                    isUpdate
                    {...updatedData} 
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