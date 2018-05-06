import React, { Component } from 'react';
import './Password.css';

class Password extends Component {
 
  render() {
    return (
      <tr>
        <td>{this.props.data.url}</td>
        <td>{this.props.data.username}</td>
        <td>{this.props.data.password}</td>
        <td>
            <button className='btn btn-primary button'>Edit</button>
            <button className='btn btn-primary'>Delete</button>
        </td>
      </tr>
    );
  }
}

export default Password;
