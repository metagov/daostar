import { Button, Divider, Icon } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import EtherscanLink from './EtherscanLink/EtherscanLink';
import URILink from './URILink/URILink';

const IPFS_GATEWAY = `https://ipfs.io/ipfs`

const getHttpDaoURI = (daoURI) => {
    if (daoURI.includes(`ipfs://`)) {
        const uri_hash = daoURI.substring(7);
        return `${IPFS_GATEWAY}/${uri_hash}`
    }
    return daoURI;
};

const DisplayRegistration = ({
    id,
    onClickEdit,
    contractAddress,
    managerAddress,
    daoURI,
    description,
    name,
    standalone,
    membersURI,
    activityLogURI,
    issuersURI,
    proposalsURI,
    governanceURI
}) => {

    const httpDaoURI = getHttpDaoURI(daoURI);
 
    return (
        <Fragment>
            {standalone === true ? (
                <h3>{name}</h3>
            ) : (
                <Link to={`/registration/${id}`} className='underline'>
                    <h3>{name}</h3>
                </Link>
            )}
            {standalone === true && (
                <Button
                    className='edit-reg-btn'
                    icon='edit'
                    text='Edit'
                    onClick={onClickEdit}
                />
            )}
            <Divider />
            <div className='card-metadata'>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>Contract address: </span>
                    <EtherscanLink address={contractAddress} />
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>DAO URI: </span>
                    <span className='card-metadata-value'>
                        <a 
                            href={httpDaoURI} 
                            target="_blank"
                            className='no-underline'
                        >
                            {httpDaoURI}
                        </a>
                    </span>
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>Manager address: </span>
                    {managerAddress ? (
                        <EtherscanLink address={managerAddress} />
                    ) : (
                        <span className='card-metadata-value'>None provided</span>
                    )}
                </p>
            </div>
            <Divider />
            <div className='card-metadata'>
                <h6>Description</h6>
                <p className='bp4-text-large'>
                    {description ? description : 'None provided'}
                </p>
                <div className='card-metadata-row'>
                    <div className='card-metadata-item'>
                        <h6>Members</h6>
                        <p className='bp4-text-large'>
                            <URILink uri={membersURI} />
                        </p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Proposals</h6>
                        <p className='bp4-text-large'>
                            <URILink uri={proposalsURI} />
                        </p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Governance</h6>
                        <p className='bp4-text-large'>
                            <URILink uri={governanceURI} />
                        </p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Issuers</h6>
                        <p className='bp4-text-large'>
                            <URILink uri={issuersURI} />
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DisplayRegistration;