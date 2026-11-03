import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubittedError: false,
    errorMsg: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {path: '/', expires: 30})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showSubittedError: true, errorMsg: error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  passwordFeild = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="passWord">
          PASSWORD
        </label>
        <input
          value={password}
          onChange={this.onChangePassword}
          type="password"
          id="passWord"
          placeholder="Password"
          className="user-input"
        />
      </>
    )
  }

  usernameFeild = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="userName">
          USERNAME
        </label>
        <input
          value={username}
          onChange={this.onChangeUsername}
          type="text"
          id="userName"
          placeholder="Username"
          className="user-input"
        />
      </>
    )
  }

  render() {
    const {showSubittedError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <form onSubmit={this.submitForm} className="form-contianer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className=" website-logo"
            />
            <div className="user-input-container">{this.usernameFeild()}</div>
            <div className="user-input-container">{this.passwordFeild()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubittedError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
