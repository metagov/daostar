import { useQuery, useLazyQuery } from '@apollo/client';
import { Button, Card, Spinner } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RegistrationLeanCard from '../RegistrationCard/RegistrationLeanCard';
import queries from '../ExplorePage/queries/registrations';

const RegistrationLeanPage = () => {
    const { regID } = useParams();
    const network = regID.split(':')[0];
    const address = regID.split(':')[1];
    console.log({ network, address });

    // First query to get the registration instance
    const { loading: loadingRegInstance, error: errorRegInstance, data: dataRegInstance } = useQuery(queries.GET_REG_INSTANCE, {
        context: { apiName: network },
        variables: { registrationInstanceId: address },
    });

    console.log(dataRegInstance)
    // Lazy query to get DAO metadata
    const [getDaoMetaData, { loading: loadingDaoMeta, error: errorDaoMeta, data: dataDaoMeta }] = useLazyQuery(queries.GET_DAOMETA_DATA);

    // Trigger the DAO metadata query when the registration instance is loaded
    useEffect(() => {
        if (dataRegInstance) {
            const daoURI = dataRegInstance.registrationInstance.daoURI; // Extract daoURI
            const uri_hash = daoURI.length >= 46 ? daoURI.substr(-46) : daoURI;
            getDaoMetaData({ variables: { daometadataId: uri_hash  }, context: { apiName: network } });
        }
    }, [dataRegInstance, getDaoMetaData, address, network]);

    if (loadingRegInstance || loadingDaoMeta) {
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

    if (errorRegInstance || errorDaoMeta) {
        return <p>Error: {errorRegInstance?.message || errorDaoMeta?.message}</p>;
    }

    return (
        <div className="centered-wizard">
            <RegistrationLeanCard
                contractAddress={dataRegInstance.registrationInstance.daoAddress}
                standalone={true}
                {...dataRegInstance.registrationInstance}
            />
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
    );
};

export default RegistrationLeanPage;
