import React from 'react';

import './peopleCard.css';
import placeholder from '../img/placeholder.png';

const PeopleCard = ({ cast }) => {

    const avatar = cast.profile_path 
        ? `http://image.tmdb.org/t/p/w185/${cast.profile_path}`
        : placeholder;

    return (
        <div id="people-card">
            <img src={avatar} alt="people profile picture" />
            <div id="people-info">
                <h3>{cast.character || cast.job}</h3>
                <p>{cast.name}</p>
            </div>
        </div>
    );
}

export default PeopleCard;