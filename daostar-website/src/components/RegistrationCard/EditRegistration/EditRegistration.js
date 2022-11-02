import { Button, Divider, EditableText, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { Fragment } from 'react';

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
    governanceURI
}) => {
    return (
        <Fragment>
            <h3>{name}</h3>
            <Button
                className='edit-reg-btn'
                text='Cancel'
                onClick={onCancelEdit}
            />
            <Divider vertical />
            <div className='card-metadata'>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>Contract address: </span>
                    <span className='card-metadata-value'>
                        <EditableText value={contractAddress} />
                    </span>
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>DAO URI: </span>
                    <span className='card-metadata-value'>{daoURI}</span>
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>Manager address: </span>
                    <span className='card-metadata-value'>None provided</span>
                </p>
            </div>
            <Divider vertical />
            <div className='card-metadata'>
                <FormGroup
                    label='Description'
                    labelFor='description'
                >
                    <InputGroup 
                        value={description} 
                        id='description'
                    />
                </FormGroup>
            </div>
            <Divider vertical />
            <div className='card-metadata'>
                <FormGroup
                    label='Members'
                    labelFor='members'
                >
                    <InputGroup 
                        value={membersURI} 
                        id='members'
                    />
                </FormGroup>
                <FormGroup
                    label='Activity Log'
                    labelFor='activityLog'
                >
                    <InputGroup 
                        value={activityLogURI} 
                        id='activityLog'
                    />
                </FormGroup>
                <FormGroup
                    label='Proposals'
                    labelFor='proposals'
                >
                    <InputGroup 
                        value={proposalsURI} 
                        id='proposals'
                    />
                </FormGroup>
                <FormGroup
                    label='Governance'
                    labelFor='governance'
                >
                    <InputGroup 
                        value={governanceURI} 
                        id='governance'
                    />
                </FormGroup>
                <Divider vertical />
                <div style={{ marginTop: 12 }}>
                    <Button 
                        fill
                        text='Next'
                    />
                </div>
            </div>

        </Fragment>
    )
}

export default EditRegistration;