import { Button, Divider } from "@blueprintjs/core";
import React, { Fragment } from "react";
import EtherscanLink from "./EtherscanLink/EtherscanLink";
import JunoAtomScanLink from "./Junochain/JunoAtomScanLink";
import OsmosisAtomScanLink from "./Osmosis/OsmosisLink";
import StargazeAtomScanLink from "./Stargaze/StargazeLink";
import { useQuery, gql } from '@apollo/client';
import queries from '../../ExplorePage/queries/registrations'
import URILink from "./URILink/URILink";
import { Link } from "react-router-dom";

const IPFS_GATEWAY = `https://ipfs.io/ipfs`;
const getHttpDaoURI = (daoURI) => {
    if (daoURI.includes(`ipfs://`)) {
        const uri_hash = daoURI.substring(7);
        return `${IPFS_GATEWAY}/${uri_hash}`;
    }
    return daoURI;
};

const DisplayLeanRegistration = ({
    id,
    network,
    contractAddress,
    daoURI,
    contractVersion,
}) => {
    const httpDaoURI = getHttpDaoURI(daoURI);
    let uri_hash = daoURI.length >= 46 ? daoURI.substr(-46) : daoURI;


    const { loading, error, data } = useQuery(queries.GET_DAOMETA_DATA, {
        variables: { daometadataId: uri_hash },
        context: { apiName: "arbitrum" },
        skip: !uri_hash || uri_hash.length !== 46  // Optional: Skip executing the query under certain conditions
    });

    // Check if uri_hash is properly formed (assuming it must be a certain length or format)
    if (!uri_hash || uri_hash.length !== 46) {
        return (<div className="card-metadata card-metadata-row">
            <div className="card-metadata-item">
                <p>Error: Invalid DAO Metadata ID provided.</p>
            </div>
        </div>);
    }

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("GraphQL Error:", error);
        return (<div className="card-metadata card-metadata-row">
            <div className="card-metadata-item">
                <p>Error: {error.message}</p>
            </div>
        </div>);
    }

    if (!data || !data.daometadata) {
        console.log(id,
            network,
            contractAddress,
            daoURI,
            contractVersion,)
        console.log("No data returned for DAO Metadata ID:", uri_hash);
        return (<div className="card-metadata card-metadata-row">
            <div className="card-metadata-item">
                <p>No data available for this DAO Metadata ID.</p>
            </div>
        </div>);
    }

    const {
        daoName,
        daoDescription,
        membersURI,
        issuersURI,
        proposalsURI,
        governanceURI,
        activityLogURI,
        contractsRegistryURI,
        managerAddress
    } = data.daometadata;


    if (network === "optimism-goerli") {
        network = "optimismGoerli";
    }

    if (network === "arbitrum-goerli") {
        network = "arbitrumGoerli";
    }

    if (network === "arbitrum-one") {
        network = "arbitrum";
    }

    const renderNetworkLink = (network, address) => {
        switch (network) {
            case "Juno":
                return <JunoAtomScanLink address={address} />;
            case "Osmosis":
                return <OsmosisAtomScanLink address={address} />;
            case "Stargaze":
                return <StargazeAtomScanLink address={address} />;
            default:
                return <EtherscanLink address={address} />;
        }
    };

    const renderNetworkName = (network) => {
        switch (network) {
            case "mainnet":
                return <span className="card-metadata-value">Ethereum Mainnet</span>;
            case "ethereum":
                return <span className="card-metadata-value">Ethereum Mainnet</span>;
            default:
                return <span className="card-metadata-value">{network}</span>;
        }
    };
    const lean = true;
    return (
        <Fragment>
           <Link to={`/registration/${network}:${id}:${lean}`} className="underline">
            <h3>{daoName}</h3>
            </Link>
            <Divider />
            <div className="card-metadata">
                <p className="bp4-text-small wizard-no-margin">
                    <span className="bp4-text-muted">Registration Contract: </span>
                    {renderNetworkLink(network, id)}
                </p>
                <p className="bp4-text-small wizard-no-margin">
                    <span className="bp4-text-muted">Contract Owner: </span>
                    {renderNetworkLink(network, contractAddress)}
                </p>
                <p className="bp4-text-small wizard-no-margin">
                    <span className="bp4-text-muted">DAO URI: </span>
                    <span className="card-metadata-value">
                        <a
                            href={httpDaoURI}
                            target="_blank"
                            className="no-underline"
                            rel="noreferrer"
                        >
                            {httpDaoURI}
                        </a>
                    </span>
                </p>
                <p className="bp4-text-small wizard-no-margin">
                    <span className="bp4-text-muted">Contract Version: </span>
                    <span className="card-metadata-value">{contractVersion}</span>
                </p>
            </div>
            <Fragment>
                <div>

                </div>
                <div className="card-metadata">
                    <h6>Description</h6>
                    <p className="bp4-text-large card-description">
                        {daoDescription ? daoDescription : "None provided"}
                    </p>
                    <div className="card-metadata-row">
                        <div className="card-metadata-item">
                            <h6>Members URI:</h6>
                            <p className="bp4-text-large">
                                <URILink uri={membersURI || "N/A"} />
                            </p>
                        </div>
                        <div className="card-metadata-item">
                            <h6>Proposals URI:</h6>
                            <p className="bp4-text-large">
                                <URILink uri={proposalsURI || "N/A"} />
                            </p>
                        </div>
                        <div className="card-metadata-item">
                            <h6>Governance URI:</h6>
                            <p className="bp4-text-large">
                                <URILink uri={governanceURI || "N/A"} />
                            </p>
                        </div>
                        <div className="card-metadata-item">
                            <h6>Issuers URI:</h6>
                            <p className="bp4-text-large">
                                <URILink uri={issuersURI || "N/A"} />
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>

        </Fragment>
    );
};

export default DisplayLeanRegistration;
