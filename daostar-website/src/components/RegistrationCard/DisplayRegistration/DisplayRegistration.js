import { Button, Divider } from '@blueprintjs/core';
import React, { Fragment, MouseEventHandler } from 'react';

const DisplayRegistration = ({
    onClickEdit,
    contractAddress,
    daoURI,
    description,
    name,
    standalone 
}) => {
 
    return (
        <Fragment>
            <h3>{name}</h3>
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
                    <span className='card-metadata-value'>{contractAddress}</span>
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>DAO URI: </span>
                    <span className='card-metadata-value'>{daoURI}</span>
                </p>
                <p className='bp4-text-small wizard-no-margin'>
                    <span className='bp4-text-muted'>Manager address: </span>
                    <span className='card-metadata-value'>None provided</span>
                </p>
            </div>
            <Divider />
            <div className='card-metadata'>
                <h6>Description</h6>
                <p className='bp4-text-large'>{description}</p>
                <div className='card-metadata-row'>
                    <div className='card-metadata-item'>
                        <h6>Members</h6>
                        <p className='bp4-text-large'>16</p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Proposals</h6>
                        <p className='bp4-text-large'>10</p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Governance</h6>
                        <p className='bp4-text-large'>16</p>
                    </div>
                    <div className='card-metadata-item'>
                        <h6>Issuers</h6>
                        <p className='bp4-text-large'>10</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DisplayRegistration;