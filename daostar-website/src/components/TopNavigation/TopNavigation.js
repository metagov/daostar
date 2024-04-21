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
                <a href='https://docs.daostar.org/'>Build</a>
                <a href='https://daostar.substack.com'>Universe</a>
                <ConnectWallet />
            </nav>
        </header>
    )
}

export default TopNavigation;