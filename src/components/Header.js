import React, {useState} from 'react';
import axios from 'axios';
import { Button, AutoComplete } from 'antd';
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
            <h1>The Movies Fair</h1>
        </div>
            <Link to="/search-movie"><Button style={{ marginRight: '20px' }} type="primary">Rechercher un film</Button></Link>
            {/* <AutoComplete 
                placeholder="Rechercher un film"
                style={{ width: 200, marginRight: '30px' }}
                onChange={handleChange}
                options={movieSearch || []}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            /> */}
        </div>
    );
}

export default Header;