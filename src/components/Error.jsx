import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'

class Error extends Component {
    
    render() {
        return (
        <Router>
          <h1>Your Page Cant Be Found</h1>
        </Router>         
        );
    }
}

export default Error;