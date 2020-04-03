import React, {Component} from 'react';
import axios from 'axios';
import { Input } from 'antd';

import MovieCard from './MovieCard';

class SearchMovie extends Component {

    state = {
        searchValue: '',
        moviesList: [],
    }

    fetchData = async () => {
        const URL = process.env.REACT_APP_BASE_URL;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const {searchValue} = this.state;

        if (searchValue && searchValue.length > 0) {
            let res = await axios.get(`${URL}search/movie?api_key=${API_KEY}&query=${searchValue}&language=fr`);
            this.setState({moviesList: res.data.results}, () => console.log(res.data));
        } else {
            this.setState({moviesList: []});
        }
        
    }

    handleChange = (e) => {
        this.setState({searchValue: e.target.value},  this.fetchData)
    }

    render() {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Input
                    style={{ width: 400, margin: '40px' }}
                    placeholder="Rechercher un film"
                    onChange={this.handleChange}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.moviesList.map(movie => {
                        return <MovieCard movie={movie} />
                    })}
                </div>
            </div>
            
        );
    }
}

export default SearchMovie;