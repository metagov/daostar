import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import logo from '../../img/logo_dao.png';
import { useConnectModal } from '@web3modal/react';
import './TopNavigation.css';

const TopNavigation = (props) => {

    const { isOpen, open } = useConnectModal();

    return (
        <header className='top-navigation'>
            <a href="index.html"><img src={logo} className="logo" alt='DAOstar' /></a>
            
            <nav className="menu">
                <Link to='/#standard'>Standard</Link>
                <Link to='/register'>Register</Link>
                <Link to='/explore'>Explore</Link>
                <Link to='/#roundtable'>Roundtable</Link>
                <Button 
                    className='web3-connect'
                    text='Connect'
                    onClick={open}
                    loading={isOpen}
                />
                {/* <Web3Button 
                /> */}
            </nav>
        </header>
    )
}

export default TopNavigation;