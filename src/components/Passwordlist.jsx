import React, {Component} from 'react'
import Password from './Password.jsx'
import PasswordForm from './PasswordForm.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPassword } from '../store/password/action.password'
import {BrowserRouter as Router} from 'react-router-dom'
import './Password.css'


class Passwordlist extends Component {

  UNSAFE_componentWillMount(){
    this.props.getAllPassword()
    // console.log(this.props.passwords)
  }

  render () {
    var password = this.props.passwords.map((password, index) => 
    <Password data={password} key={index}/>
    )
    return (
    <Router>
      <div className="container">
      <PasswordForm className='flex-frame'></PasswordForm>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Website</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {password}
        </tbody>
      </table>
      </div> 
    </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  passwords: state.password.passwords
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllPassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Passwordlist);