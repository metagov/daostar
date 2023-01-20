import React, { Fragment, useEffect, useState } from 'react';
import validator from 'validator';
import { Button, Callout, Divider, FormGroup, InputGroup } from '@blueprintjs/core';
import FieldWithViewLink from './FieldWithViewLink/FieldWithViewLink';
import InlineTextField from './InlineTextField/InlineTextField';
import useAxios from 'axios-hooks';

const EditRegistration = ({
    name,
    contractAddress,
    daoURI,
    managerAddress,
    description,
    onCancelEdit,
    membersURI,
    activityLogURI,
    proposalsURI,
    governanceURI,
    onSetCardScreen,
    setUpdatedData
}) => {

    const [daoContractAddress, setDaoContractAddress] = useState(() => contractAddress);
    const onChangeContract = (e) => setDaoContractAddress(e.target.value);

    const [daoManagerAddress, setDaoManagerAddress] = useState(() => managerAddress ? managerAddress : '');
    const onChangeManager = (e) => setDaoManagerAddress(e.target.value);

    const [daoDescription, setDaoDescription] = useState(() => description ? description : '');
    const onChangeDescription = (e) => setDaoDescription(e.target.value);

    const [daoMembersURI, setDaoMembersURI] = useState(() => membersURI ? membersURI : '');
    const onChangeMembersURI = (e) => setDaoMembersURI(e.target.value);

    const [daoActivityLogURI, setDaoActivityLogURI] = useState(() => activityLogURI ? activityLogURI : '');
    const onChangeActivityURI = (e) => setDaoActivityLogURI(e.target.value);

    const [daoProposalsURI, setDaoProposalsURI] = useState(() => proposalsURI ? proposalsURI : ''); 
    const onChangeProposalsURI = (e) => setDaoProposalsURI(e.target.value);

    const [daoGovURI, setDaoGovURI] = useState(() => governanceURI ? governanceURI : '');
    const onChangeGovURI = (e) => setDaoGovURI(e.target.value);

    const [errors, setErrors] = useState(null);
    const [apiError, setAPIError] = useState(null);

    const [
        { 
            data: registeredData, 
            loading: sendingRegistrationUpdate, 
            error: registrationUpdateError 
        }, 
        executeRegistrationUpdate
    ] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/immutable`,
            method: 'POST'
        },
        { manual: true }
    )

    // display an error if the server responds with an error
    useEffect(() => {
        if (registrationUpdateError) {
            setAPIError(`Something's not right – try again later`);            
        }
    }, [registrationUpdateError])

    const onSubmit = () => {
        let errors = [];
        if (!validator.isEthereumAddress(daoContractAddress)) errors.push('Contract address must be a valid ethereum address');
        if (daoManagerAddress && !validator.isEthereumAddress(daoManagerAddress)) errors.push('Manager address must be a valid ethereum address');
        if (!validator.isURL(daoMembersURI)) errors.push('Members URI must be a valid URI');
        if (!validator.isURL(daoActivityLogURI)) errors.push('Activity Log URI must be a valid URI');
        if (!validator.isURL(daoProposalsURI)) errors.push('Proposals URI must be a valid URI');
        if (daoGovURI !== '' && !validator.isURL(daoGovURI)) errors.push('Governance URI must be a valid URI');
        if (errors.length > 0) {
            setErrors(errors);
            window.scrollTo(0, 0);
        }
        if (errors.length === 0) {
            executeRegistrationUpdate({
                data: {
                    data: {
                        name: name,
                        description: daoDescription,
                        membersURI: daoMembersURI,
                        proposalsURI: daoProposalsURI,
                        activityLogURI: daoActivityLogURI,
                        governanceURI: daoGovURI
                    }
                } 
            }).then(response => {
                setUpdatedData({
                    daoURI: response.data.url,
                    daoContractAddress: daoContractAddress
                })
                onSetCardScreen('UPDATED');
            })
            
        }
    }

    const errorCallout = errors ? (
        <Callout
            intent='danger'
        >
            <p>Please address the following issues:</p>
            <ul>
                {errors.map((error, i) => {
                    return <li key={i}>{error}</li>
                })}
            </ul>
        </Callout>
    ) : null;

    return (
        <Fragment>
            <h3>{name}</h3>
            <Button
                className='edit-reg-btn'
                text='Cancel'
                onClick={onCancelEdit}
            />
            {errors && (
                <Fragment>
                    <Divider vertical />
                    <div className='card-metadata'>
                        {errorCallout}
                    </div>
                </Fragment>
            )}
            <Divider vertical />
            <div className='card-metadata'>
                <InlineTextField 
                    label='Contract address'
                    id='contract-address'
                    value={daoContractAddress}
                    onChange={onChangeContract}
                    warning='Changing the contract address will create a new registration for a new DAO'
                />
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>DAO URI: </span>
                    <span className='card-metadata-value'>{daoURI}</span>
                </p>
                <InlineTextField 
                    label='Manager address'
                    id='manager-address'
                    value={daoManagerAddress}
                    onChange={onChangeManager}
                    warning='Only the DAO can change the manager address'
                />
            </div>
            <Divider vertical />
            <div className='card-metadata'>
                <FormGroup
                    label='Description'
                    labelFor='description'
                    style={{ marginTop: 8 }}
                >
                    <InputGroup 
                        value={daoDescription} 
                        onChange={onChangeDescription}
                        id='description'
                    />
                </FormGroup>
            </div>
            <Divider vertical />
            <div className='card-metadata'>
                <p 
                    className='bp4-text-small wizard-margin-bottom-8'
                    style={{ 
                        marginTop: 12,
                        marginBottom: 16
                    }}
                >
                    URIs should conform to&nbsp; 
                    <a href='https://eips.ethereum.org/EIPS/eip-4824' target='_blank'>EIP-4824</a>
                    &nbsp;schemas
                </p>
                <FieldWithViewLink
                    label='Members'
                    id='members'
                    value={daoMembersURI}
                    onChange={onChangeMembersURI}
                    placeholder='https://api.daostar.org/eth/address/members'
                />
                <FieldWithViewLink
                    label='Activity Log'
                    id='activity-log'
                    value={daoActivityLogURI}
                    onChange={onChangeActivityURI}
                    placeholder='https://api.daostar.org/eth/address/activity'
                />
                <FieldWithViewLink
                    label='Proposals'
                    id='proposals'
                    value={daoProposalsURI}
                    onChange={onChangeProposalsURI}
                    placeholder='https://api.daostar.org/eth/address/proposals'
                />
                <FieldWithViewLink
                    label='Governance URI'
                    id='governance'
                    value={daoGovURI}
                    onChange={onChangeGovURI}
                    placeholder='https://api.daostar.org/eth/address/governance.md'
                />
            </div>
            <Divider vertical />
            <div className='card-metadata' style={{ marginTop: 12 }}>
                {apiError && (
                        <div className='wizard-row wizard-center'>
                        <Callout
                            intent='danger'
                        >
                            {apiError}
                        </Callout>
                    </div>
                )}
                <Button 
                    fill
                    text='Update'
                    onClick={onSubmit}
                    loading={sendingRegistrationUpdate}
                />
            </div>
        </Fragment>
    )
}

export default EditRegistration;