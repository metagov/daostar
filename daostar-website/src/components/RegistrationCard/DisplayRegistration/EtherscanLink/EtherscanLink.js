import React from 'react';
import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import './EtherscanLink.css';

const EtherscanLink = ({
    address
}) => {

    const url = `https://etherscan.io/address/${address}`;

    return (
        <div className='etherscan-link'>
            <a 
                href={url} 
                className='no-underline'
                target="_blank"
            >
                {address}
                <Tooltip2
                    content={'View on Etherscan'}
                    placement='top'
                >
                    <Icon 
                        style={{
                            marginLeft: 4,
                            position: 'relative',
                            top: -2
                        }}
                        icon='link' 
                        size={10}
                    />
                </Tooltip2>
            </a>
        </div>
    )
}

export default EtherscanLink;