import React from 'react';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import { mockExploreData } from './mockExploreData';
import './ExplorePage.css';

const ExplorePage = ({

}) => {

    console.log('mockExploreData', mockExploreData);

    const daoCards = mockExploreData.map((dao, i) => {
        return (
            <RegistrationCard 
                key={i}
                {...dao}
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