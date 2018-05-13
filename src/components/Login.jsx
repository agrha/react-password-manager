import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllUsers } from '../store/user/action.user'
import { Link } from 'react-router-dom'
import './Password.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      key:'',
      username: '',
      password: '',
    }
  }

  UNSAFE_componentWillMount () {
    this.props.getAllUsers()
  }

  checkLength () {
    if (this.state.password.length > 5) {
      this.setState({
        length: true
      })
    } else {
      this.setState({
        length: false
      })
    }
  }

  checkUpper () {
    let regexUpper = /[A-Z]/

    if (regexUpper.test(this.state.password)) {
      this.setState({
        upperCase: true
      })
    } else {
      this.setState({
        upperCase: false
      })
    }
  }

  checkLower () {
    let regexLower = /[a-z]/

    if (regexLower.test(this.state.password)) {
      this.setState({
        lowerCase: true
      })
    } else {
      this.setState({
        lowerCase: false
      })
    }
  }

  checkNumber () {
    let regexNumber = /[0-9]/

    if (regexNumber.test(this.state.password)) {
      this.setState({
        numberCase: true
      })
    } else {
      this.setState({
        numberCase: false
      })
    }
  }

  checkSpecial () {
    let regexSpesial = /[^A-Za-z0-9]/
    
    if (regexSpesial.test(this.state.password)) {
      this.setState({
        specialCase: true
      })
    } else {
      this.setState({
        specialCase: false
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.checkLength()
      this.checkUpper()
      this.checkLower()
      this.checkNumber()
      this.checkSpecial()
    })
  }

  login = (e) => {
    e.preventDefault()
    if (
      this.state.specialCase &&
      this.state.upperCase &&
      this.state.lowerCase &&
      this.state.length &&
      this.state.numberCase &&
      this.state.username !== '' &&
      this.state.password !== ''
    ) {
        let userLogin = {
          username: this.state.username,
          password: this.state.password,
          createdAt: this.state.createdAt,
        }
        this.props.users.map(user => {
          if(user.username === userLogin.username){
            if(user.password === userLogin.password){
              localStorage.setItem('userKey', user.key)
              localStorage.setItem('username', user.username)
              localStorage.setItem('password', user.password)
              this.props.history.push('/home')
            } else {
              alert('wrong password')
            }
          }
        })
      }
  }

  render () {
    return (
      <div className="container">
        <div className="flex-frame">
          <form onSubmit={this.login}>
            <fieldset>
              <h1><strong>Login Form</strong></h1>
                <div className="form-group">
                  <label htmlFor="inputUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="Enter Your Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPass">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPass"
                    placeholder="Enter Your Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                    autoFocus
                  />
                </div>
                <div className="form-group bold">
                  <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkUpper" type="checkbox" checked={this.state.upperCase} />
                    <label className="custom-control-label" id="labelUpper" htmlFor="checkUpper">at least one uppercase letter?</label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkLower" type="checkbox" checked={this.state.lowerCase} />
                    <label className="custom-control-label" id="labelLower" htmlFor="checkLower">at least one lowercase letter? </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkSpecial" type="checkbox" checked={this.state.specialCase} />
                    <label className="custom-control-label" id="labelSpecial" htmlFor="checkSpecial">at least one symbol?</label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkNumber" type="checkbox" checked={this.state.numberCase} />
                    <label className="custom-control-label" id="labelNumber" htmlFor="checkNumber">at least one number?</label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkLength" type="checkbox" checked={this.state.length} />
                    <label className="custom-control-label" id="labelLength" htmlFor="checkLength">minimal 5 letter length?</label>
                  </div>
                </div>
              <button disabled={!(
                this.state.specialCase &&
                this.state.upperCase &&
                this.state.lowerCase &&
                this.state.length &&
                this.state.numberCase &&
                this.state.username !== '' &&
                this.state.password !== ''
              )} type="submit" className="btn btn-primary button">Submit</button>
              <Link to={`/register`}>
                <button className="btn btn-primary button">
                  To Register
                </button>
              </Link>
            </fieldset>
          </form>
        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.user.loading,
  error: state.user.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)