import React from 'react';
import MovieList from './MovieList';

import Home from './components/Home component/Home';
import Theater from './components/Theater component/Theater';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import {MovieProvider} from './MovieContext';
import SeatSelection from './components/SeatSelection/SeatSelection';

import Ticket from '../src/components/SeatSelection/Ticket';
function App() {

  if(localStorage.length<=0){
    localStorage.setItem("index",0);
    console.log("initialindex");
    }
  return (
    <MovieProvider>
    <div className="App">
   
        <Router>
     
        <Switch>
         {/* <Route path="/" exact component={Gallery} /> */}
        <Route path="/" exact component={Home} />
        <Route path="/theater/:movie" component={Theater} />
        <Route path="/:moviename/:cinema/:id" component={SeatSelection} />
        <Route path="/Ticket" component={Ticket} />
        </Switch>
      </Router>
      
    </div>
    </MovieProvider>
  );

}




export default App;