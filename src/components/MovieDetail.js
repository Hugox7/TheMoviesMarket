import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import moment from 'moment';
import 'moment/locale/fr';

import './movieDetail.css';
import PeopleCard from './PeopleCard';

moment.locale('fr');

const MovieDetail = (props) => {

    const URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const { id } = props.match.params;

    const [credits, setCredits] = useState({});
    const [movie, setMovie] = useState({});

    const fetchData = () => {

        const fetchCredits = axios.get(`${URL}movie/${id}/credits?api_key=${API_KEY}`);
        const fetchMovie = axios.get(`${URL}movie/${id}?api_key=${API_KEY}&language=fr`);

        axios.all([fetchCredits, fetchMovie])
            .then(axios.spread((...res) => {
                setCredits(res[0].data);
                setMovie(res[1].data);
                console.log(res);
            }))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const director = credits.crew && credits.crew.length 
        ? credits.crew.filter(elem => elem.job === "Director")[0]
        : null;
    const movieGenres = movie.genres ? <p>{movie.genres.map(genre => {
        return `${genre.name} `
    })}</p> : null;
    const budget = new Intl.NumberFormat('fr-FR').format(movie.budget);
    const revenue = new Intl.NumberFormat('fr-FR').format(movie.revenue);

    const directorPart = director ?
        <><p>Réalisateur</p>
        <Link className="moreInfo-element" to={`/people/${director.id}`}>
            <p>{director.name}</p>
        </Link></> : <p>Réalisateur</p>;


    if (Object.entries(movie).length == 0) {
        return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Spin spinning size="large" />
                </div>
    }

    const rating = movie.vote_average * 10;
    let ratingClass;
    if (rating >= 0 && rating <50) {
        ratingClass = 'bad';
    } else if (rating >= 50 && rating < 60) {
        ratingClass = 'average';
    } else if (rating >= 60 && rating < 80) {
        ratingClass = 'good';
    } else if (rating >= 80 && rating <= 100) {
        ratingClass = 'excellent'
    }

    return (
        <div id="movie-detail-wrapper">
            <div id="info">
                <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="movie-poster" />
                <div id="titleAndOverview">
                    <h1>{movie.title}</h1>
                    <div style={{ display: 'flex' }}>
                        {movieGenres}
                        <p style={{ margin: '0 15px' }}>-</p>
                        <p>{`${movie.runtime} min`}</p>
                    </div>
                    <div id="detail-rating" className={ratingClass}>
                        {rating} <span style={{ fontSize: '15px' }}>%</span>
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: '18px', marginTop: '20px' }}>
                        {movie.tagline}
                    </p>
                    <p>{movie.overview}</p>
                    <div id="moreInfo">
                        <div>
                            <p>Date de sortie</p>
                            <p className="moreInfo-element">{moment(movie.release_date).format('LL')}</p>
                        </div>
                        <div>
                            {directorPart}
                        </div>
                        <div>
                            <p>Budget</p>
                            <p className="moreInfo-element">{`${budget} $`}</p>
                        </div>
                        <div>
                            <p>Recettes</p>
                            <p className="moreInfo-element">{`${revenue} $`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="additional-info">
                <h2>Casting</h2>
                <div className="movie-cast">
                    {credits.cast.map((elem, index) => {
                        return (
                            <Link to={`/people/${elem.id}`} key={index}>
                                <PeopleCard cast={elem} />
                            </Link>
                        );
                    })}
                </div>
                <br />
                <Link to={`/movie/crew/${id}`}><h2>Voir l'equipe technique</h2></Link>
            </div>
            
        </div>
    );
}

export default MovieDetail;