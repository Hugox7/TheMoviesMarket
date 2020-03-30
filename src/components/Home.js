import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';

import './home.css';

const { Meta } = Card;

const Home = () => {

    // states
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    //api calls
    const fetchNowPlaying = axios.get(`${process.env.REACT_APP_BASE_URL}movie/now_playing?page=1&api_key=${process.env.REACT_APP_API_KEY}`);
    const fetchPopular = axios.get(`${process.env.REACT_APP_BASE_URL}movie/popular?page=1&api_key=${process.env.REACT_APP_API_KEY}`);
    const fetchTopRated = axios.get(`${process.env.REACT_APP_BASE_URL}movie/top_rated?page=1&api_key=${process.env.REACT_APP_API_KEY}`);
    const fetchUpcoming = axios.get(`${process.env.REACT_APP_BASE_URL}movie/upcoming?page=1&api_key=${process.env.REACT_APP_API_KEY}`);

    const fetchAllData = async () => {
       axios.all([fetchNowPlaying, fetchPopular, fetchTopRated, fetchUpcoming])
        .then(axios.spread((...res) => {
            console.log(res);
            setNowPlaying(res[0].data.results.slice(0, 7));
            setPopular(res[1].data.results.slice(0, 7));
            setTopRated(res[2].data.results.slice(0, 7));
            setUpcoming(res[3].data.results.slice(0, 7));
        }))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    if (!nowPlaying.length || !popular.length || !topRated.length || !upcoming.length) {
        return <div>Loading...</div>
    }

    return (
        <div id="home">
            <h2>En ce moment au cinéma :</h2>
            <div id="now-playing">
                {nowPlaying.map(movie => {

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
                            style={{ width: 190 }}
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
                })}
            </div>
                
        </div>
    );
}

export default Home;