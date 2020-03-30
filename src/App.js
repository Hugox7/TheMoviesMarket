import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  
  return (
    <div id="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div> 
  );

}

export default App;
