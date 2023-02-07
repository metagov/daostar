import React, { Fragment, useEffect, useState } from 'react';
import validator from 'validator';
import useAxios from 'axios-hooks';
import { Button, Callout, Divider, FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';
import FRAMEWORK_URIs from './FRAMEWORK_URIs';

const RegistrationForm = ({
    toggleRegScreen,
    setRegistrationData
}) => {

    const [daoContractNetwork, setDaoContractNetwork] = useState('mainnet');
    const onChangeDaoContractNetwork = (e) => setDaoContractNetwork(e.target.value);

    const [daoContractAddress, setDaoContractAddress] = useState('');
    const onChangeDaoContractAddress = (e) => setDaoContractAddress(e.target.value);

    const [daoName, setDaoName] = useState('');
    const onChangeDaoName = (e) => setDaoName(e.target.value);

    const [daoMembersURI, setDaoMembersURI] = useState('');
    const onChangeMembersURI = (e) => setDaoMembersURI(e.target.value);

    const [daoActivityURI, setDaoActivityURI] = useState('');
    const onChangeActivityURI = (e) => setDaoActivityURI(e.target.value);

    const [daoProposalsURI, setDaoProposalsURI] = useState('');
    const onChangeProposalsURI = (e) => setDaoProposalsURI(e.target.value);

    const [daoContractsRegistryURI, setDaoContractsRegistryURI] = useState('');
    const onChangeContractsRegistryURI = (e) => setDaoContractsRegistryURI(e.target.value);

    const [daoManagerAddress, setDaoManagerAddress] = useState('');
    const onChangeDaoManager = (e) => setDaoManagerAddress(e.target.value);

    const [daoGovURI, setDaoGovURI] = useState('');
    const onChangeDaoGovURI = (e) => setDaoGovURI(e.target.value);

    const [daoFramework, setDaoFramework] = useState('custom'); 
    const onChangeDaoFramework = (e) => {
        setDaoFramework(e.target.value);
        // if the user chooses a DAO framework, default the URIs to framework-specific values
        setDaoMembersURI(FRAMEWORK_URIs[e.target.value].membersURI);
        setDaoActivityURI(FRAMEWORK_URIs[e.target.value].activityURI);
        setDaoProposalsURI(FRAMEWORK_URIs[e.target.value].proposalsURI);
        setDaoGovURI(FRAMEWORK_URIs[e.target.value].governanceURI);
    }

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
        if (!validator.isEthereumAddress(daoContractAddress)) errors.push('Contract address must be a valid ethereum address');
        if (daoName === '') errors.push(`DAO must have a name`);
        if (daoManagerAddress && !validator.isEthereumAddress(daoManagerAddress)) errors.push('Manager address must be a valid ethereum address');
        if (daoGovURI !== '' && !validator.isURL(daoGovURI)) errors.push('Governance URI must be a valid URI');
        if (daoMembersURI !== '' && !validator.isURL(daoMembersURI)) errors.push(`Members URI must be a valid URI`);
        if (daoActivityURI !== '' && !validator.isURL(daoActivityURI)) errors.push(`Activity Log URI must be a valid URI`);
        if (daoProposalsURI !== '' && !validator.isURL(daoProposalsURI)) errors.push(`Proposals URI must be a valid URI`);
        if (daoContractsRegistryURI !== '' && !validator.isURL(daoContractsRegistryURI)) errors.push(`Contracts Registry URI must be a valid URI`);
        
        if (errors.length > 0) {
            setErrors(errors);
            window.scrollTo(0, 0);
        }
        if (errors.length === 0) {
            let registrationData = {
                data: {
                    name: daoName,
                    governanceURI: daoGovURI,
                }
            }
            if (daoFramework === 'custom') {
                registrationData.data.membersURI = daoMembersURI;
                registrationData.data.proposalsURI = daoProposalsURI;
                registrationData.data.activityLogURI = daoActivityURI;
                registrationData.data.contractsRegistryURI = daoContractsRegistryURI;
            }
            executeRegistration({
                data: registrationData
            }).then(response => {
                setRegistrationData({
                    daoURI: response.data.url,
                    daoContractAddress: daoContractAddress,
                    daoContractNetwork: daoContractNetwork
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
                { label: 'Mainnet', value: 'mainnet' },
                { label: 'Goerli', value: 'goerli' }
            ]}
        />
    )

    const FrameworkSelect = (
        <HTMLSelect 
            id='framework'
            fill
            iconProps={{ icon: 'caret-down', color: '#fff' }}
            onChange={onChangeDaoFramework}
            placeholder='Select framework'
            options={[
                { label: 'Custom', value: 'custom' },
                { label: 'Moloch', value: 'moloch' },
                { label: 'Safe', value: 'safe' },
                { label: 'DAODAO', value: 'daodao' },
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
                <div>
                    <div className='wizard-row'>
                        <FormGroup
                            label='Members URI'
                            labelFor='members-uri'
                            fill
                        >
                            <InputGroup 
                                fill
                                id='members-uri'
                                value={daoMembersURI}
                                placeholder='Enter URI to members'
                                onChange={onChangeMembersURI}
                            />
                        </FormGroup>
                    </div>
                    <div className='wizard-row'>
                        <FormGroup
                            label='Activity Log URI'
                            labelFor='activity-log-uri'
                            fill
                        >
                            <InputGroup 
                                fill
                                id='activity-log-uri'
                                placeholder='Enter URI to activity log'
                                value={daoActivityURI}
                                onChange={onChangeActivityURI}
                            />
                        </FormGroup>
                    </div>
                    <div className='wizard-row'>
                        <FormGroup
                            label='Proposals URI'
                            labelFor='proposals-uri'
                            fill
                        >
                            <InputGroup 
                                fill
                                id='proposals-uri'
                                placeholder='Enter URI to proposals'
                                value={daoProposalsURI}
                                onChange={onChangeProposalsURI}
                            />
                        </FormGroup>
                    </div>
                    <div className='wizard-row'>
                        <FormGroup
                            label='Contracts Registry URI (optional)'
                            labelFor='contracts-registry-uri'
                            fill
                        >
                            <InputGroup 
                                fill
                                id='contracts-registry-uri'
                                placeholder='Enter URI to contracts registry'
                                value={daoContractsRegistryURI}
                                onChange={onChangeContractsRegistryURI}
                            />
                        </FormGroup>
                    </div>
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