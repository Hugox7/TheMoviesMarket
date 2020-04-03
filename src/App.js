import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NowPlaying from './components/NowPlaying';
import MovieDetail from './components/MovieDetail';
import SearchMovie from './components/SearchMovie';
import PeopleDetail from './components/PeopleDetail';
import MovieCrew from './components/MovieCrew';

const App = () => {
  
  return (
    <div id="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/now-playing" component={NowPlaying} />
        <Route exact path="/movie/:id" component={MovieDetail} />
        <Route path="/search-movie" component={SearchMovie} />
        <Route path="/people/:id" component={PeopleDetail} />
        <Route path="/movie/crew/:id" component={MovieCrew} />
      </Switch>
    </div> 
  );

}

export default App;
