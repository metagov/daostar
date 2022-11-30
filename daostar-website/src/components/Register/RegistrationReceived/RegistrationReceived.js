import { Button, Divider, FormGroup, Icon, InputGroup, TextArea } from '@blueprintjs/core';
import { useConnectModal } from '@web3modal/react';
import { ethers } from 'ethers';
import React, { Fragment } from 'react';
import RegistrationContract from '../../../abi/RegistrationContract';
import CopyField from '../../ui/CopyField/CopyField';

const RegistrationReceived = ({
    daoURI,
    daoContractAddress,
    isUpdate = false
}) => {

    const { isOpen, open } = useConnectModal();
    const factoryContracts = {
        mainNet: `TBD`,
        goerli: `0x5ef59b7cDe41b744f36b6e07fEF230884F800529`
    }

    const regContract = new ethers.Contract(`0x5ef59b7cDe41b744f36b6e07fEF230884F800529`, RegistrationContract);
    const salt = `0x1000000000000000000000000000000000000000000000000000000000000000`;
    const managerExample = `0x5ef59b7cDe41b744f36b6e07fEF230884F800529`;
    const contracts = [];
    const bytes = [];
    const regData = [
        salt,
        daoURI,
        managerExample,
        contracts,
        bytes
    ]
    const rawRegData = regContract.interface.encodeFunctionData("summonRegistration", [...regData]);

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
                        text={factoryContracts.goerli}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Value'
                    labelFor='value'
                >
                    <CopyField
                        fill
                        id='value'
                        text={'0'}
                    />
                </FormGroup>
            </div>
            <div className='wizard-row'>
                <FormGroup
                    label='Function'
                    labelFor='function'
                >
                    <CopyField
                        fill
                        id='function'
                        text={`summonRegistration(bytes32 salt,string daoURI_,address manager,address[] contracts,bytes[] data)`}
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
                        // disabled
                        id='advanced-settings'
                        value={rawRegData}
                        growVertically
                        style={{ minHeight: 200 }}
                    />
                </FormGroup>
            </div>
        </Fragment>
    )
}

export default RegistrationReceived;