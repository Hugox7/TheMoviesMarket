import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import './movieCard.css';
import placeholder from '../img/placeholder.png';

const { Meta } = Card;

const MovieCard = ({ movie }) => {

    const rating = movie.vote_average * 10;

    let rateColor;
    if (rating >= 0 && rating < 50) {
        rateColor = "red";
    } else if (rating < 60 && rating >= 50) {
        rateColor = "orange"
    } else if (rating >= 60 && rating < 80 ) {
        rateColor = "lightGreen"
    } else if (rating <= 100 && rating >= 80) {
        rateColor = "darkGreen"
    } else {
        rateColor = "white"
    }

    const poster = movie.poster_path 
        ? `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
        : placeholder;

    return (
        <Link to={`/movie/${movie.id}`}>
        <Card
            key={movie.id}
            className="movie-card"
            style={{ width: 200 }}
            cover={
                <img
                    alt="movie-poster"
                    src={poster}
                    className="card-poster"
                /> 
            }
        >
            <Meta
                title={movie.title}
            />
            <div className={`rating ${rateColor}`}>{rating} <span>%</span></div>
        </Card>
        </Link>
    );
}

export default MovieCard;