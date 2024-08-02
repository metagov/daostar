import { useQuery } from '@apollo/client';
import { Button, Card, Spinner } from '@blueprintjs/core';
import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import DisplayLeanRegistration from '../RegistrationCard/DisplayRegistration/DisplayLeanRegistration';
import queries from '../ExplorePage/queries/registrations';

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
}

const RegistrationPage = () => {
    const { regID } = useParams();
    const network = regID.split(':')[0];
    const address = regID.split(':')[1];
    const lean = regID.split(':')[2]
    
    console.log({ network, address, lean });

    const { loading, error, data } = useQuery(queries.REGISTRATION, {
        context: { apiName: network },
        variables: { id: address },
    });

    if (loading) {
        return (
            <div className="centered-wizard">
                <Card className="wizard-card" style={{ height: 120 }}>
                    <div className="wizard-center wizard-row">
                        <Spinner color="fff" />
                    </div>
                </Card>
            </div>
        );
    }

    if (error) return <p>Error!</p>;

    console.log('reg data', data);

    const { registrationInstance } = data;

    return (
        <div className="centered-wizard">
            <Card className="wizard-card">
                {lean ? (
                    <DisplayLeanRegistration
                        id={registrationInstance.id}
                        network={registrationInstance.registrationNetwork.id}
                        daoURI={registrationInstance.daoURI}
                        contractAddress={registrationInstance.daoAddress}
                        contractVersion="1.0" // or you can dynamically fetch the version if available
                    />
                ) : (
                    <RegistrationCard
                        contractAddress={registrationInstance.daoAddress}
                        standalone={true}
                        {...registrationInstance}
                    />
                )}
            </Card>
            <div className="wizard-center" style={{ marginTop: 36 }}>
                <Link to="/explore">
                    <Button large text="Explore all DAOs" />
                </Link>
            </div>
        </div>
    );
};

export default RegistrationPage;
