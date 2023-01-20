import React, { useState } from 'react';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import { mockExploreData } from './mockExploreData';
import './ExplorePage.css';
import validator from 'validator';
import { useQuery } from '@apollo/client';
import REGISTRATIONS from './queries/registrations';
import { InputGroup } from '@blueprintjs/core';

export const filterRegistrations = (registration, filterVal = '') => {
    if (!registration.daoName) {
        return false;
    }
    if (filterVal !== '') {
        return registration.daoName.toLowerCase().includes(filterVal.toLowerCase());
    }
    return true;
}

const ExplorePage = ({

}) => {

    const [filterVal, setFilterVal] = useState('');
    const onChangeFilter = (e) => setFilterVal(e.target.value);

    const { loading, error, data } = useQuery(REGISTRATIONS);
    if (error) return 'error';
    if (loading) return 'loading...';

    const daoCards = data.registrationInstances
                        .filter(reg => filterRegistrations(reg, filterVal))
                        .map((registration, i) => {
        return (
            <RegistrationCard 
                key={i}
                {...registration}
            />
        )
    })

    return (
        <div className='explore-page'>
            <div className='filter'>
                <InputGroup
                    large
                    placeholder='Filter DAOs...'
                    value={filterVal}
                    onChange={onChangeFilter}
                />
            </div>
            <div className='dao-cards'>
                {daoCards}
            </div>
        </div>
    )
}

export default ExplorePage;