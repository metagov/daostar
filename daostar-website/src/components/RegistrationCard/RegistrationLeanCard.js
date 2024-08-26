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

const RegistrationLeanCard = (
    instance,
) => {
    let network = instance.registrationNetwork.id;
    console.log(instance.id);
    if (network === "arbitrum-one");
    {
        network = "arbitrum"
    }
    return (
            <Card className="wizard-card registration-card">
                    <DisplayLeanRegistration
                        id={instance.id}
                        daoURI={instance.daoURI}
                        contractAddress={instance.daoAddress}
                        network={network}
                        contractVersion="1.0" // or you can dynamically fetch the version if available
                    />
            </Card>
    );
};

export default RegistrationLeanCard;
