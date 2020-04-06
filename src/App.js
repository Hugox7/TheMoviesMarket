import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import NowPlaying from './components/NowPlaying';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';
import PeopleDetail from './components/PeopleDetail';
import MovieCrew from './components/MovieCrew';
import Footer from './components/Footer';

const App = () => {
  
  return (
    <div id="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/now-playing" component={NowPlaying} />
        <Route exact path="/movie/:id" component={MovieDetail} />
        <Route path="/search" component={Search} />
        <Route path="/people/:id" component={PeopleDetail} />
        <Route path="/movie/crew/:id" component={MovieCrew} />
      </Switch>
      <Footer />
    </div> 
  );

}

export default App;
