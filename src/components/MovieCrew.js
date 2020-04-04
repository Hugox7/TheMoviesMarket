import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Spin } from 'antd';

import './moviecrew.css';
import placeholder from '../img/placeholder.png';
import PeopleCard from './PeopleCard';

const MovieCrew = (props) => {

    const URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const { id } = props.match.params;

    const [crew, setCrew] = useState([]);
    const [movie, setMovie] = useState([]);

    const fetchData = async () => {
        const fetchCredits = axios.get(`${URL}movie/${id}/credits?api_key=${API_KEY}`);
        const fetchMovie = axios.get(`${URL}movie/${id}?api_key=${API_KEY}&language=fr`);

        axios.all([fetchCredits, fetchMovie])
            .then(axios.spread((...res) => {
                setCrew(res[0].data.crew);
                setMovie(res[1].data);
                console.log(res);
            }))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    // data filtered by department
    const producers = crew && crew.length
        ? crew.filter(elem => elem.department === "Production") 
        : [];

    const directors = crew && crew.length
        ? crew.filter(elem => elem.department === "Directing") 
        : [];

    const artists = crew && crew.length
        ? crew.filter(elem => elem.department === "Art") 
        : [];

    const editors = crew && crew.length
        ? crew.filter(elem => elem.department === "Editing") 
        : [];

    const sound = crew && crew.length
        ? crew.filter(elem => elem.department === "Sound") 
        : [];

    const costumes = crew && crew.length
        ? crew.filter(elem => elem.department === "Costume & Make-Up") 
        : [];
    
    const writing = crew && crew.length
        ? crew.filter(elem => elem.department === "Writing") 
        : []; 

    const poster = movie.poster_path 
        ? `http://image.tmdb.org/t/p/w92/${movie.poster_path}`
        : placeholder;

    if (!crew || !crew.length) {
        return <Spin spinning />
    }
    return (
        <div id="movie-crew">
            <div id="which-movie">
                <img src={poster} alt={`Affiche du film ${movie.title}`} />
                <div>
                    <h1>{movie.title}</h1>
                    <p>L'équipe technique du film</p>
                </div>
                
            </div>
            <div id="lists">
                <h2>{directors.length ? 'Réalisation' : null}</h2>
                <div className="crew-list">
                    {directors.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{producers.length ? 'Production' : null}</h2>
                <div className="crew-list">
                    {producers.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{writing.length ? 'Ecriture' : null}</h2>
                <div className="crew-list">
                    {writing.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{artists.length ? 'Artistique' : null}</h2>
                <div className="crew-list">
                    {artists.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{editors.length ? 'Montage' : null}</h2>
                <div className="crew-list">
                    {editors.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{sound.length ? 'Son' : null}</h2>
                <div className="crew-list">
                    {sound.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
                <h2>{costumes.length ? 'Costumes et maquillage' : null}</h2>
                <div className="crew-list">
                    {costumes.map((elem, index) => {
                        return <PeopleCard cast={elem} key={index} />
                    })}
                </div>
            </div>
            
        </div>
    );
}

export default MovieCrew;