import React from 'react';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import { mockExploreData } from './mockExploreData';
import './ExplorePage.css';
import { useQuery } from '@apollo/client';
import REGISTRATIONS from './queries/registrations';

const ExplorePage = ({

}) => {

    const { loading, error, data } = useQuery(REGISTRATIONS);
    if (error) return 'error';
    if (loading) return 'loading...';

    console.log('data', data);

    const daoCards = data.newRegistrations.map((registration, i) => {
        return (
            <RegistrationCard 
                key={i}
                {...registration}
            />
        )
    })

    return (
        <div className='explore-page'>
            <div className='dao-cards'>
                {daoCards}
            </div>
        </div>
    )
}

export default ExplorePage;