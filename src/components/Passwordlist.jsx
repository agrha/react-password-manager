import React, {Component} from 'react'
import Password from './Password.jsx'
import PasswordForm from './PasswordForm.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPassword } from '../store/password/action.password'
import {BrowserRouter as Router} from 'react-router-dom'
import './Password.css'


class Passwordlist extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      searchResult: ''
    }
  }

  handleOnChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault() 
    this.setState({
      searchResult: this.state.search
    })
  }

  UNSAFE_componentWillMount(){
    this.props.getAllPassword()
  }

  logout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  render () {
    var filter = this.props.passwords.filter(data=>{
      return data.userId === localStorage.getItem('userKey')
    })
    var regex = new RegExp(this.state.searchResult,"g")
    let searchArray = []
    var search = filter.map(data=> {
      if(data.url.match(regex)){
       searchArray.push(data)
      }
    })
    var password = searchArray.map((password, index) => 
    <Password data={password} key={index}/>
    )
    if (this.props.loading) {
      return (
        <div className="loader"></div> 
      )
    } else if (this.props.error) {
      return (
        <h1>Error when loading data</h1>
      )
    } else {
      return (
          <div className="container">
          <button className="btn btn-primary" onClick={this.logout}>Logout</button>
          <PasswordForm className='flex-frame'></PasswordForm>
          <input className="button" type="text" onChange={this.handleOnChange} value={this.state.search}/>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
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
        )
    } 
  }
}

const mapStateToProps = (state) => ({
  passwords: state.password.passwords,
  loading: state.password.loading,
  error: state.password.error
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllPassword
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Passwordlist);