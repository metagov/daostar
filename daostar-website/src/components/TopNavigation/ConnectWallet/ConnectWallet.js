import React, { Fragment, useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import './ConnectWallet.css';

const ConnectWallet = ({}) => {

    return (
        <ConnectKitButton.Custom
        >
            {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                <button 
                    onClick={show}
                    className='ConnectButton'
                >
                    {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
                </button>
                );
            }}
        </ConnectKitButton.Custom>
    )
}

export default ConnectWallet;