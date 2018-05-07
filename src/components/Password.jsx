import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import { removePassword } from '../store/password/action.password'
import './Password.css'

class Password extends Component {
  constructor() {
    super()
    this.state = {
      type: 'password'
    }
  }

  showPassword = () => {
    swal.mixin({
      input: 'password',
      showCancelButton: true
    }).queue([
      {
        title: 'Password?',
      },
    ]).then((result) => {
      if (result.value[0] === localStorage.getItem('password')) {
        if(this.state.type === 'password') {
          this.setState({
            type: 'text'
          })
        } else {
          this.setState({
            type: 'password'
          })
        }
      } else {
        swal('password wrong')
      } 
    }) 
  }

  delete (payload) {
    this.props.removePassword(payload)
  }

  render() {
    return (
      <tr key={ this.props.data.key }>
        <td>{this.props.data.url}</td>
        <td>{this.props.data.username}</td>
        <td>
          <input type={this.state.type} value={this.props.data.password} disabled/>
        </td>
        <td>
            <Link to={`/home/${this.props.data.key}`}>
              <button className="btn btn-primary button">
                Update
              </button>
            </Link>
            <button className='btn btn-primary button' onClick={this.showPassword}>See</button>
            <button className='btn btn-primary' onClick={() => this.delete(this.props.data.key)}>Delete</button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removePassword
}, dispatch)

export default connect(null, mapDispatchToProps)(Password)