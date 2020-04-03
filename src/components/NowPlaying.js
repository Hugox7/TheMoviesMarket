import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Spin, Pagination } from 'antd';

import './nowPlaying.css';
import MovieCard from './MovieCard';

const NowPlaying = () => {

    //states
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // api call
    const URL = process.env.REACT_APP_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchMovies = async (page) => {
        let res = await axios.get(`${URL}movie/now_playing?page=${page}&api_key=${API_KEY}&language=fr`)
        setMovies(res.data.results);
        setTotalItems(res.data.total_results);
    }

    useEffect(() => {
        fetchMovies(currentPage);
    }, []);

    const handleChangePage = (pageNumber) => {
        fetchMovies(pageNumber);
    }


    if (!movies.length) {
        return (<div className="loading">
            <Spin spinning={!movies.length} size="large"/>
        </div>);
    }

    return (
        <div style={{ height: '100%' }}>
            <div className="moviesPlaying">
                {movies.map(movie => {
                    return <MovieCard movie={movie} key={movie.id}/>
                })}
            </div>
            <Pagination 
                defaultCurrent={1}
                style={{ margin: '40px' }} 
                total={totalItems} 
                defaultPageSize={20}
                showSizeChanger={false}
                className='nowPlayingPagination'
                onChange={handleChangePage}
            />
        </div>
    );
}

export default NowPlaying;