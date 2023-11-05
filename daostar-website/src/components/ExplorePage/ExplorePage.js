import React, { useEffect, useState } from 'react'
import RegistrationCard from '../RegistrationCard/RegistrationCard'
import { useQuery } from "@apollo/client";
import queries from "../ExplorePage/queries/registrations";

import './ExplorePage.css'
import { InputGroup } from '@blueprintjs/core'

export const filterRegistrations = (registration, filterVal = '') => {
    if (!registration.daoName) {
        return false
    }
    if (filterVal !== '') {
        return registration.daoName.toLowerCase().includes(filterVal.toLowerCase())
    }
    return true
}

const ExplorePage = ({registrationInstances}) => {
    const [filterVal, setFilterVal] = useState('')
    const onChangeFilter = (e) => setFilterVal(e.target.value)

    const daoCards = registrationInstances
        .filter((reg) => filterRegistrations(reg, filterVal))
        .map((registration, i) => {
            return <RegistrationCard key={i} {...registration} />
        })

    return (
        <div className="explore-page">
            <div className="filter">
                <InputGroup large placeholder="Filter DAOs..." value={filterVal} onChange={onChangeFilter} />
            </div>
            <div className="dao-cards">{daoCards}</div>
        </div>
    )
}

export default ExplorePage
