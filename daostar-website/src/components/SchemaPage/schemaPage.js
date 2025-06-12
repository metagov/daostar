import React, { useState } from 'react';
import { Card, Button } from '@blueprintjs/core';
import SEO from '../SEO/SEO';
import './schemaPage.css';
const SchemaPage = (props) => {

    return (
        <div>
            <SEO 
                title="DAO Schemas | DAOstar"
                description="DAOIP Schemas standardize metadata for DAOs, making it easier to manage governance, activity logs, and proposals in a transparent and interoperable manner."
                image="https://daostar.org/img/daostar.png"
            />
            {/* Schema Card */}
            <div className='centered-wizard'>
                <Card className='wizard-card' >
                <h3>DAOIP Schemas</h3>

                    <div style={{paddingLeft: '24px'}}>
                    <p>
                        DAOIP Schemas standardize metadata for DAOs, making it easier to manage governance, activity logs, and proposals in a transparent and interoperable manner. Check out the details of DAOIP-1 to get started.
                    </p>
                    <Button
                        intent="primary"
                        text="Get Started"
                        style={{marginTop: '10px'}}
                        onClick={() => window.open('https://github.com/metagov/daostar/blob/main/DAOIPs/daoip-1.md', '_blank')}
                    />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SchemaPage;
