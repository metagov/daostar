import React from 'react';
import { Button, Card, Divider, FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';
import './Register.css';

const Register = (props) => {

    const EthNetworksSelect = (
        <HTMLSelect 
            style={{ minWidth: 140 }}
            iconProps={{ icon: 'caret-down', color: '#fff' }}
            options={[
                { label: 'Mainnet', value: 'mainnet' },
                { label: 'Ropsten', value: 'ropsten' },
                { label: 'Rinkeby', value: 'rinkeby' },
                { label: 'Kovan', value: 'kovan' },
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
        <div>
            <div className='centered-wizard'>
                <Card className='wizard-card'>
                    <h3>Register your DAO</h3>
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
                        />
                    </div>
                    <div className='wizard-row'>
                        <FormGroup
                            label='Description'
                            labelFor='description'
                            fill
                        >
                            <InputGroup 
                                fill
                                id='description'
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
                            label='Manager address'
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
                            label='Manager address'
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
                            label='Governance document'
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
                    <Divider vertical={true} />
                    <div className='wizard-row wizard-center'>
                        <Button 
                            intent='primary'
                            text='Register'
                        />
                        <br/>
                        <p className='bp4-text-small wizard-no-margin'>Registering will generate a DAO URI</p>
                    </div>
                </Card>
            </div>
        </div>
        
    )
}

export default Register;