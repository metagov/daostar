import { Button, Card, Spinner } from '@blueprintjs/core';
import useAxios from 'axios-hooks';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RegistrationCard from '../RegistrationCard/RegistrationCard';

const RegistrationPage = ({

}) => {

    const { regID } = useParams();
    const requestURI = `${process.env.REACT_APP_API_URL}/mutable/${regID}`
    const daoURI = `https://api.daostar.org/${regID}`
    const contractAddress = regID.substring(9);
    const [{ data, loading, error }] = useAxios(requestURI)
    
    if (loading) return (
        <div className='centered-wizard'>
            <Card
                className='wizard-card'
                style={{ height: 120 }}
            >
                <div className='wizard-center wizard-row'>
                    <Spinner color='fff' />
                </div>
            </Card>
        </div>
    )
    if (error) return <p>Error!</p>

    return (
        <div className='centered-wizard'>
            <RegistrationCard 
                daoURI={daoURI}
                contractAddress={contractAddress}
                standalone={true}
                {...data}
            />
            <div 
                className='wizard-center'
                style={{
                    marginTop: 36
                }}
            >
                <Link to='/explore'>
                    <Button
                        large
                        text='Explore all DAOs'
                    />
                </Link>
            </div>
        </div>
    )
}

export default RegistrationPage;