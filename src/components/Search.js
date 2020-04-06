import React, {Component} from 'react';
import axios from 'axios';
import { Input, Select } from 'antd';

import MovieCard from './MovieCard';
import PeopleCard from './PeopleCard';

const { Option } = Select;

class Search extends Component {

    state = {
        searchValue: '',
        moviesList: [],
        peopleList: [],
        searchType: 'movies'
    }

    fetchData = async () => {
        const URL = process.env.REACT_APP_BASE_URL;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const {searchValue, searchType} = this.state;

        if (searchValue && searchValue.length > 0) {

            if (searchType === 'movies') {
                let res = await axios.get(`${URL}search/movie?api_key=${API_KEY}&query=${searchValue}&language=fr`);
                this.setState({moviesList: res.data.results}, () => console.log(res.data));
            } else {
                let res = await axios.get(`${URL}search/person?api_key=${API_KEY}&language=fr-FR&query=${searchValue}`);
                this.setState({peopleList: res.data.results}, () => console.log(res.data));
            }
        } else {
            this.setState({moviesList: [], peopleList: []});
        }
        
    }

    handleChange = (e) => {
        this.setState({searchValue: e.target.value},  this.fetchData)
    }

    handleSearchTypeChange = (value) => {
        this.setState({ 
            searchType: value, 
            peopleList: [],
            moviesList: [],
        });
    }

    

    render() {

        const searchPlaceholder = this.state.searchType === "movies" 
            ? "Rechercher un film" 
            : "Rechercher une personne"

        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Select 
                        style={{ width: 130 }}
                        placeholder="Quel type de recherche"
                        onChange={this.handleSearchTypeChange}
                        value={this.state.searchType}
                    >
                        <Option value="movies">Films</Option>
                        <Option value="people">Personnes</Option>
                    </Select>
                </div>
                    
                    <Input
                        style={{ width: 400, margin: '40px 10px' }}
                        placeholder={searchPlaceholder}
                        onChange={this.handleChange}
                    />
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '655px', backgroundColor: '#F3F3F3', padding: '20px' }}>
                    {this.state.moviesList.map((movie, index) => {
                        return <MovieCard movie={movie} key={index} />
                    })}
                    {this.state.peopleList.map((people, index) => {
                        return <PeopleCard cast={people} />
                    })}
                </div>
            </div>
            
        );
    }
}

export default Search;