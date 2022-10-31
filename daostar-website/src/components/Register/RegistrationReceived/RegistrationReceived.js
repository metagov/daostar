import { Button, Divider, FormGroup, Icon, InputGroup, TextArea } from '@blueprintjs/core';
import { useConnectModal } from '@web3modal/react';
import React, { Fragment } from 'react';
import CopyField from '../../ui/CopyField/CopyField';

const RegistrationReceived = ({
    registrationData
}) => {

    const { isOpen, open } = useConnectModal();

    const callDataText = `
        registerDAO (${registrationData.daoContractAddress}) { daoURI; managerAddress }
    `

    return (
        <Fragment>
            <h3>Registration received!</h3>
            <Divider vertical />
            <div className='wizard-row wizard-center'>
                <p className='wizard-margin-bottom-8'>
                    Your DAO URI has been created.
                </p>
                <div className='wizard-margin-bottom-8'>
                    <CopyField
                        text={registrationData.daoURI}
                    />
                </div>
                <p className='wizard-margin-bottom-8'>
                    To complete registration, propose this transaction to your DAO:
                </p>
                <Button 
                    className='wizard-margin-bottom-8'
                    intent='primary'
                    text='Connect as DAO'
                    onClick={open}
                    loading={isOpen}
                />
            </div>
            <Divider vertical />
            <div className='wizard-row'>
                <p className='wizard-center'>
                    Or, manually copy transaction to your DAO:
                </p>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Address'
                    labelFor='address'
                >
                    <CopyField
                        id='address'
                        fill={true}
                        text={registrationData.daoContractAddress}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Value'
                    labelFor='value'
                >
                    <CopyField
                        id='value'
                        fill={true}
                        text={`0`}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Call Data'
                    labelFor='call-data'
                >
                    <CopyField
                        id='call-data'
                        fill={true}
                        text={callDataText}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Advanced Settings'
                    labelFor='advanced-settings'
                >
                    <TextArea 
                        fill
                        id='advanced-settings'
                    />
                </FormGroup>
            </div>
        </Fragment>
    )
}

export default RegistrationReceived;