import React, { Fragment } from 'react';
import { Button, Divider, FormGroup, TextArea } from '@blueprintjs/core';
import { useWeb3Modal } from '@web3modal/react';
import { ethers } from 'ethers';
import RegistrationContract from '../../../abi/RegistrationContract';
import CopyField from '../../ui/CopyField/CopyField';

const RegistrationReceived = ({
    daoURI,
    daoContractAddress,
    daoContractNetwork,
    isUpdate = false
}) => {

    const { isOpen, open } = useWeb3Modal();
    const factoryContracts = {
        mainnet: `0x37dF3fC47C1c3A2acaFd2Dad9c1C00090a8655Bc`,
        goerli: `0x5ef59b7cDe41b744f36b6e07fEF230884F800529`,
        gnosis: `0x4f2c9028fe7107d9f1a8a9cff34aa2d3f28600fa`,
        polygon: `0x37dF3fC47C1c3A2acaFd2Dad9c1C00090a8655Bc`,
        optimism: `0x37dF3fC47C1c3A2acaFd2Dad9c1C00090a8655Bc`
    }

    const regContract = new ethers.Contract(`0x5ef59b7cDe41b744f36b6e07fEF230884F800529`, RegistrationContract);
    const saltNumber = Math.floor(100000000000 + Math.random() * 900000000000)
    const salt = `0x${saltNumber}0000000000000000000000000000000000000000000000000000`; // TODO: generate salt
    console.log('salt', salt);
    const managerExample = `0x5ef59b7cDe41b744f36b6e07fEF230884F800529`;
    const contracts = [];
    const bytes = [];
    const daoIPFS_URI = `ipfs://${daoURI.substring(daoURI.indexOf(`immutable/`) + 10)}`;
    console.log('ipfs', daoIPFS_URI);
    const regData = [
        salt,
        daoIPFS_URI,
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
                        text={factoryContracts[daoContractNetwork]}
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