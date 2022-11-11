import React, { Fragment, useEffect, useState } from 'react';
import validator from 'validator';
import useAxios from 'axios-hooks';
import { Button, Callout, Divider, FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';

const RegistrationForm = ({
    toggleRegScreen,
    setRegistrationData
}) => {

    const [daoContractNetwork, setDaoContractNetwork] = useState('eip155:1');
    const onChangeDaoContractNetwork = (e) => setDaoContractNetwork(e.target.value);

    const [daoContractAddress, setDaoContractAddress] = useState('');
    const onChangeDaoContractAddress = (e) => setDaoContractAddress(e.target.value);

    const [daoName, setDaoName] = useState('');
    const onChangeDaoName = (e) => setDaoName(e.target.value);

    const [daoFramework, setDaoFramework] = useState('custom'); 
    const onChangeDaoFramework = (e) => setDaoFramework(e.target.value);

    const [daoManagerAddress, setDaoManagerAddress] = useState('');
    const onChangeDaoManager = (e) => setDaoManagerAddress(e.target.value);

    const [daoGovURI, setDaoGovURI] = useState('');
    const onChangeDaoGovURI = (e) => setDaoGovURI(e.target.value);

    const [registrationError, setRegError] = useState(null);

    const [validationErrors, setErrors] = useState(null);

    const [
        { 
            data: registeredData, 
            loading: sendingRegistration, 
            error: registerError 
        }, 
        executeRegistration
    ] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/immutable`,
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
        let errors = [];
        if (daoName === '') errors.push(`DAO must have a name`);
        if (!validator.isEthereumAddress(daoContractAddress)) errors.push('Contract address must be a valid ethereum address');
        if (daoManagerAddress && !validator.isEthereumAddress(daoManagerAddress)) errors.push('Manager address must be a valid ethereum address');
        if (daoGovURI !== '' && !validator.isURL(daoGovURI)) errors.push('Governance URI must be a valid URI');
        if (errors.length > 0) {
            setErrors(errors);
            window.scrollTo(0, 0);
        }
        if (errors.length === 0) {
            const registrationData = {
                data: {
                    name: daoName,
                    governanceURI: daoGovURI,
                }
            }
            executeRegistration({
                data: registrationData
            }).then(response => {
                setRegistrationData({
                    daoURI: response.data.url,
                    daoContractAddress: daoContractAddress
                })
                toggleRegScreen('REG_RECEIVED');
            });
        }
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

    const errorCallout = validationErrors ? (
        <Callout
            intent='danger'
        >
            <p>Please address the following issues:</p>
            <ul>
                {validationErrors.map((error, i) => {
                    return <li key={i}>{error}</li>
                })}
            </ul>
        </Callout>
    ) : null;

    return (
        <Fragment>
            <h3>Register your DAO</h3>
                {validationErrors && (
                    <Fragment>
                        <Divider vertical />
                        <div className='card-metadata'>
                            {errorCallout}
                        </div>
                    </Fragment>
                )}
                <Divider vertical={true} />
                <div className='wizard-row wizard-row-flex'>
                    <FormGroup
                        label='Contract address'
                    >
                        {EthNetworksSelect}
                    </FormGroup>
                    <InputGroup 
                        fill
                        placeholder='Enter DAO contract address'
                        value={daoContractAddress}
                        onChange={onChangeDaoContractAddress}
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
                            value={daoName}
                            onChange={onChangeDaoName}
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
                            value={daoManagerAddress}
                            onChange={onChangeDaoManager}
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
                            value={daoGovURI}
                            onChange={onChangeDaoGovURI}
                        />
                    </FormGroup>
                </div>
                <Divider vertical={true} />
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