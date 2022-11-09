import React, { useState } from 'react';
import { Card } from '@blueprintjs/core';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import RegistrationReceived from './RegistrationReceived/RegistrationReceived';
import './Register.css';

const mockRegistrationData = {
    daoURI: `https://api.daostar.org/immutable/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu`,
    daoContractAddress: `0xb794f5ea0ba39494ce839613fffba74279579268`,
    daoManagerAddress: `0xb794f5ea0ba39494ce839613fffba74279579268`,
    name: "MyDAO",
    description: "Demonstrates DAOstar setup process",
    membersURI: "ipfs://Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
    proposalsURI: "https://mydao.github.io/proposals",
    activityLogURI: "https://mydao.com/activityLog.json",
    governanceURI: "https://github.com/MyDAO/MyDAO/governance.md"
}

const Register = (props) => {

    const [registrationScreen, setRegistrationScreen] = useState('REGISTER'); // REGISTER | REG_RECEIVED
    const onToggleRegScreen = (screen) => setRegistrationScreen(screen);
    
    const [registrationData, setRegistrationData] = useState(null);

    return (
        <div>
            <div className='centered-wizard'>
                <Card className='wizard-card'>
                    {registrationScreen === 'REGISTER' && (
                        <RegistrationForm 
                            toggleRegScreen={onToggleRegScreen}
                            setRegistrationData={setRegistrationData}
                        />
                    )}
                    {registrationScreen === 'REG_RECEIVED' && (
                        <RegistrationReceived {...registrationData} />
                    )}
                </Card>
            </div>
        </div>
        
    )
}

export default Register;