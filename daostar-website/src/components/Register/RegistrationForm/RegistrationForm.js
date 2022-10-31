import { Button, Callout, Divider, FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';
import useAxios from 'axios-hooks';
import React, { Fragment, useEffect, useState } from 'react';

const RegistrationForm = ({
    toggleRegScreen,
    setRegistrationData
}) => {

    const [daoContractNetwork, setDaoContractNetwork] = useState('eip155:1');
    const onChangeDaoContractNetwork = (e) => setDaoContractNetwork(e.target.value);

    const [daoContractAddress, setDaoContractAddress] = useState('0xff68126dE027016702a54F20c12B2587C3619b70');
    const [daoName, setDaoName] = useState('Registration Test DAO');
    const [daoFramework, setDaoFramework] = useState('custom'); 
    const [daoManagerAddress, setDaoManagerAddress] = useState('');
    const [daoGovDoc, setDaoGovDoc] = useState('Test');

    const [registrationError, setRegError] = useState(null);

    const [
        { 
            data: registeredData, 
            loading: sendingRegistration, 
            error: registerError 
        }, 
        executeRegistration
    ] = useAxios(
        {
            url: `http://localhost:8080/https://api.daostar.org/mutable`,
            method: 'POST'
        },
        { manual: true }
    )
    
    // display an error if the server responds with an error
    useEffect(() => {
        if (registerError) {
            switch (registerError.response.status) {
                case 409: setRegError(`That DAO has already been registered`); break;
                default: setRegError(`Something's not right – try again later`);
            }
            
        }
    }, [registerError])

    const onRegister = () => {
        const registrationData = {
            caip: `${daoContractNetwork}:${daoContractAddress}`,
            data: {
                name: daoName,
                governanceURI: daoGovDoc
            }
        }
        console.log('registering data...', registrationData);
        executeRegistration({
            data: registrationData
        }).then(response => {
            console.log('response', response);
            setRegistrationData({
                ...registrationData.data,
                daoURI: response.data.url,
                daoContractAddress: daoContractAddress
            })
            toggleRegScreen('REG_RECEIVED');
        });
    }

    const EthNetworksSelect = (
        <HTMLSelect 
            style={{ minWidth: 140 }}
            iconProps={{ icon: 'caret-down', color: '#fff' }}
            value={daoContractNetwork}
            onChange={onChangeDaoContractNetwork}
            options={[
                { label: 'Mainnet', value: 'eip155:1' },
                { label: 'Goerli', value: 'eip155:5' },
                { label: 'Sepolia', value: 'eip155:11155111' }
            ]}
        />
    )

    const FrameworkSelect = (
        <HTMLSelect 
            id='framework'
            fill
            iconProps={{ icon: 'caret-down', color: '#fff' }}
            placeholder='Select framework'
            options={[
                { label: 'Custom', value: 'custom' }
            ]}
        />
    )

    return (
        <Fragment>
            <h3>Register your DAO</h3>
                <Divider vertical />
                <div className='wizard-row wizard-row-flex'>
                    <FormGroup
                        label='Contract address'
                    >
                        {EthNetworksSelect}
                    </FormGroup>
                    <InputGroup 
                        fill
                        placeholder='Enter DAO contract address'
                    />
                </div>
                <div className='wizard-row'>
                    <FormGroup
                        label='Name'
                        labelFor='name'
                        fill
                    >
                        <InputGroup 
                            fill
                            id='name'
                            placeholder='Enter DAO name'
                        />
                    </FormGroup>
                </div>
                <div className='wizard-row'>
                    <FormGroup
                        label='Framework'
                        labelFor='framework'
                        fill
                    >
                        {FrameworkSelect}
                    </FormGroup>
                </div>
                <div className='wizard-row'>
                    <Divider />
                </div>
                <div className='wizard-row'>
                    <FormGroup
                        label='Manager address (optional)'
                        labelFor='manager-address'
                        fill
                    >
                        <InputGroup 
                            fill
                            id='manager-address'
                            placeholder='Enter address of DAO manager'
                        />
                    </FormGroup>
                </div>
                <div className='wizard-row'>
                    <FormGroup
                        label='Governance document (optional)'
                        labelFor='governance-document'
                        fill
                    >
                        <InputGroup 
                            fill
                            id='governance-document'
                            placeholder='Enter URI to governance document (.md)'
                        />
                    </FormGroup>
                </div>
                <Divider vertical />
                {registrationError && (
                        <div className='wizard-row wizard-center'>
                        <Callout
                            intent='danger'
                        >
                            {registrationError}
                        </Callout>
                    </div>
                )}
                <div className='wizard-row wizard-center'>
                    <Button
                        intent='primary'
                        text='Register'
                        loading={sendingRegistration}
                        onClick={onRegister}
                    />
                    <br/>
                    <p className='bp4-text-small wizard-no-margin'>
                        Registering will generate a DAO URI
                    </p>
                </div>
        </Fragment>
    )
}

export default RegistrationForm;