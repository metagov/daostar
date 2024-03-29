import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../../img/logo_dao.png';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import './TopNavigation.css';

const TopNavigation = ({
    injectedWallet
}) => {

    return (
        <header className='top-navigation'>
            <Link to='/'>
                <img src={logo} className="logo" alt='DAOstar' />
            </Link>
            
            <nav className="menu">
                <HashLink to='/#standard'>Standard</HashLink>
                <a href='/register'>Register</a>
                <Link to='/explore'>Explore</Link>
                <HashLink to='/#build'>Build</HashLink>
                <ConnectWallet />
            </nav>
        </header>
    )
}

export default TopNavigation;