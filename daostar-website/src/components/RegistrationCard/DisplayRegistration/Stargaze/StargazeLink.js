import React from 'react';
import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import '../EtherscanLink/EtherscanLink.css';

const StargazeAtomScanLink = ({
    address
}) => {

    const url = `https://atomscan.com/stargaze/accounts/${address}`;

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

export default StargazeAtomScanLink;