import { useQuery } from '@apollo/client'
import { Button, Card, Spinner } from '@blueprintjs/core'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RegistrationCard from '../RegistrationCard/RegistrationCard'
import queries from '../ExplorePage/queries/registrations'

const RegistrationPage = ({}) => {
    const { regID } = useParams()
    const network = regID.split(':')[0]
    const address = regID.split(':')[1]
    console.log({network, address})
    const { loading, error, data } = useQuery(queries.REGISTRATION, {
        context: { apiName: network },
        variables: { id: address },
    })
    if (error) return error
    if (loading)
        return (
            <div className="centered-wizard">
                <Card className="wizard-card" style={{ height: 120 }}>
                    <div className="wizard-center wizard-row">
                        <Spinner color="fff" />
                    </div>
                </Card>
            </div>
        )
    if (error) return <p>Error!</p>

    console.log('reg data', data)

    return (
        <div className="centered-wizard">
            <RegistrationCard contractAddress={data.registrationInstance.daoAddress} standalone={true} {...data.registrationInstance} />
            <div
                className="wizard-center"
                style={{
                    marginTop: 36,
                }}
            >
                <Link to="/explore">
                    <Button large text="Explore all DAOs" />
                </Link>
            </div>
        </div>
    )
}

export default RegistrationPage
