import React, {useState} from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './header.css';
import logo from '../img/movie.png';

const Header = () => {

    return (
        <div id="header">
        <div style={{ display: 'flex' }}>
            <div id="logo-wrapper">
                <img src={logo} alt="logo"/>
            </div>
            <h1>The Movies Market</h1>
        </div>
            <Link to="/search">
                <Button style={{ marginRight: '20px' }} type="primary">Rechercher</Button>
            </Link>
        </div>
    );
}

export default Header;