import React from 'react';
import './header.css';
import logo from '../img/movie.png';

const Header = () => {

    return (
        <div id="header">
            <div id="logo-wrapper">
                <img src={logo} alt="logo"/>
            </div>
            <h1>The Movies Fair</h1>
        </div>
    );
}

export default Header;