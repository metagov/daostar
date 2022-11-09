import { Button, Divider, FormGroup, Icon, InputGroup, TextArea } from '@blueprintjs/core';
import { useConnectModal } from '@web3modal/react';
import React, { Fragment } from 'react';
import CopyField from '../../ui/CopyField/CopyField';

const RegistrationReceived = ({
    daoURI,
    daoContractAddress,
    isUpdate = false
}) => {

    const { isOpen, open } = useConnectModal();

    return (
        <Fragment>
            <h3>{isUpdate ? 'Updated registration received' : 'Registration received!'}</h3>
            <Divider vertical={true} />
            <div className='wizard-row wizard-center'>
                <p className='wizard-margin-bottom-8'>
                    Your DAO URI has been created.
                </p>
                <div className='wizard-margin-bottom-8'>
                    <CopyField
                        text={daoURI}
                    />
                </div>
                <p className='wizard-margin-bottom-8'>
                    To complete registration, propose this transaction to your DAO:
                </p>
                <Button 
                    disabled
                    className='wizard-margin-bottom-8'
                    intent='primary'
                    text='Connect as DAO (coming soon)'
                    onClick={open}
                    loading={isOpen}
                />
            </div>
            <Divider vertical={true} />
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
                        text={daoContractAddress}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Call Data'
                    labelFor='call-data'
                >
                    <TextArea 
                        fill
                        id='advanced-settings'
                        value={'{ ABI would go here }'}
                    />
                </FormGroup>
            </div>
        </Fragment>
    )
}

export default RegistrationReceived;