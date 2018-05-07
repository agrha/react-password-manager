import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Passwordlist from './components/Passwordlist.jsx'
import Error from './components/Error.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import './App.css';
import EditForm from './components/EditForm';

class App extends Component {
  render() {
    return ( 
      <Router> 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to='/home'>
            <h1 className="App-title">Welcome To React</h1>
          </Link>
        </header>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/home" component={Passwordlist}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/home/:key" component={EditForm}/>
            <Route component={Error}/>
          </Switch>
       </div>    
      </Router>  
    );
  }
}

export default App;
