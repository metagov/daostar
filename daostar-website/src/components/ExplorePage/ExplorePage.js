import React, { useEffect, useState } from 'react'
import RegistrationCard from '../RegistrationCard/RegistrationCard'
import { mockExploreData } from './mockExploreData'
import './ExplorePage.css'
import validator from 'validator'
import { useQuery } from '@apollo/client'
import queries from './queries/registrations'
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

const ExplorePage = ({}) => {
    const [filterVal, setFilterVal] = useState('')
    const onChangeFilter = (e) => setFilterVal(e.target.value)

    const mainnetRes = useQuery(queries.REGISTRATIONS_MAINNET, { context: { apiName: 'mainnet' } })
    const goerliRes = useQuery(queries.REGISTRATIONS_GOERLI, { context: { apiName: 'goerli' } })
    console.log({ mainnetRes, goerliRes })
    const { loading, error, data: mainnetData } = mainnetRes
    const { loading: goerliLoading, error: goerliError, data: goerliData } = goerliRes
    console.log({ error, loading, mainnetData })
    console.log({ goerliError, goerliLoading, goerliData })

    if (error || goerliError) return 'error'
    if (loading || goerliLoading) return 'loading...'
    const registrationInstances = mainnetData.registrationInstances.concat(goerliData.registrationInstances)

    console.log({ registrationInstances })

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
