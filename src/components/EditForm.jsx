import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { editPassword,getAllPassword } from '../store/password/action.password'
import './Password.css'

class EditForm extends Component {
  constructor() {
    super()
    this.state = {
      key:'',
      url: '',
      username: '',
      password: '',
      createdAt: '',
      upperCase: false,
      lowerCase: false,
      specialCase: false,
      length: false,
      numberCase: false,
      userId: localStorage.getItem('userKey')
    }
  }

  UNSAFE_componentWillMount () {
    this.props.getAllPassword()
  }

  componentDidMount () {
    var password = {}
    this.props.passwords.map(data => {
      if (data.key === this.props.match.params.key) {
        password = data
      }
    })
    console.log(this.props.passwords)
    console.log(password)
    this.setState({
      key: password.key,
      url: password.url,
      username: password.username,
      password: password.password,
      createdAt: password.createdAt
    })
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

  handleSubmit = (e) => {
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
      let date = new Date()
      console.log(this.state.userId)
      let editedPassword = {
        key: this.state.key,
        url: this.state.url,
        username: this.state.username,
        userId: this.state.userId,
        password: this.state.password,
        createdAt: this.state.createdAt,
        updatedAt: date.toLocaleString()
      }

      this.props.editPassword(editedPassword)
      this.props.history.push('/home')
    }
  }

  clearForm() {
    this.setState({
      url: '',
      username: '',
      password: '',
      userId: localStorage.getItem('userKey')
    })
  }

  render () {
    return (
      <div className="container">
        <div className="flex-frame">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <h1><strong>Update Form</strong></h1>
                <div className="form-group">
                  <label htmlFor="inputUrl">URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUrl"
                    placeholder="Enter Your URL"
                    name="url"
                    value={this.state.url}
                    onChange={this.handleOnChange}
                  />
                </div>
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
              )} type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  passwords: state.password.passwords,
  loading: state.password.loading,
  error: state.password.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  editPassword,
  getAllPassword
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)