import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to='/#standard'>Standard</Link>
                <Link to='/register'>Register</Link>
                <Link to='/explore'>Explore</Link>
                <Link to='/#roundtable'>Roundtable</Link>
                <ConnectWallet />
            </nav>
        </header>
    )
}

export default TopNavigation;