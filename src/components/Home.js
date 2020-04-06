import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import './home.css';
import MovieCard from './MovieCard';

const Home = () => {

    // states
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    //api calls
    const URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchNowPlaying = axios.get(`${URL}movie/now_playing?page=1&api_key=${API_KEY}&language=fr`);
    const fetchPopular = axios.get(`${URL}movie/popular?page=1&api_key=${API_KEY}&language=fr`);
    const fetchTopRated = axios.get(`${URL}movie/top_rated?page=1&api_key=${API_KEY}&language=fr`);
    const fetchUpcoming = axios.get(`${URL}movie/upcoming?page=1&api_key=${API_KEY}&language=fr`);

    const fetchAllData = () => {
       axios.all([fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming])
        .then(axios.spread((...res) => {
            setNowPlaying(res[0].data.results.slice(0, 6));
            setPopular(res[1].data.results.slice(0, 6));
            setTopRated(res[2].data.results.slice(0, 6));
            setUpcoming(res[3].data.results.slice(0, 6));
        }))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    if (!nowPlaying.length || !popular.length || !topRated.length || !upcoming.length) {
        return (
            <div id="home-loading">
                <Spin spinning size="large" />
            </div>
        ) ;
    }

    return (
        <div id="home">
            <h2>En ce moment au cinéma :</h2>
            <div id="now-playing">
                {nowPlaying.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    );
                })}
                <Link to="/now-playing">
                    <Button type="dashed" style={{ width: 200, height: 367, margin: 20, position: 'relative' }}>
                        <PlusCircleOutlined style={{ fontSize: 80, position: 'absolute', top: 140, left: 58 }} />
                    </Button>
                </Link>
            </div>
            <h2>Films populaires :</h2>
            <div id="popular">
                {popular.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    );
                })}
                <Link to="/popular">
                    <Button type="dashed" style={{ width: 200, height: 367, margin: 20, position: 'relative' }}>
                        <PlusCircleOutlined style={{ fontSize: 80, position: 'absolute', top: 140, left: 58 }} />
                    </Button>
                </Link>
            </div>
            <h2>Films les mieux notés :</h2>
            <div id="top">
                {topRated.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    );
                })}
                <Link to="/top-rated">
                    <Button type="dashed" style={{ width: 200, height: 367, margin: 20, position: 'relative' }}>
                        <PlusCircleOutlined style={{ fontSize: 80, position: 'absolute', top: 140, left: 58 }} />
                    </Button>
                </Link>
            </div>
            <h2>Bientôt en salles :</h2>
            <div id="upcoming">
                {upcoming.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    );
                })}
                <Link to="/upcoming">
                    <Button type="dashed" style={{ width: 200, height: 367, margin: 20, position: 'relative' }}>
                        <PlusCircleOutlined style={{ fontSize: 80, position: 'absolute', top: 140, left: 58 }} />
                    </Button>
                </Link>
            </div>
                
        </div>
    );
}

export default Home;