import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo_dao.png';

const TopNavigation = (props) => {
    return (
        <header>
            <a href="index.html"><img src={logo} className="logo" alt='DAOstar' /></a>
            
            <nav className="menu">
                <Link to='/#standard'>Standard</Link>
                <Link to='/register'>Register</Link>
                <Link to='/#upgrade'>Upgrade</Link>
                <Link to='/#discussion'>Discussion</Link>
                <Link to='/#roundtable'>Roundtable</Link>
            </nav>
        </header>
    )
}

export default TopNavigation;