import React from 'react';
import { Card, Button } from 'antd';

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

    return (
        <Card
            key={movie.id}
            className="movie-card"
            style={{ width: 200 }}
            cover={
            <img
                alt="movie-poster"
                src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            />
            }
        >
            <Meta
            title={movie.title}
            />
            <div className={`rating ${rateColor}`}>{rating} <span>%</span></div>
        </Card>
    );
}

export default MovieCard;