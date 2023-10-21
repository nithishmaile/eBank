import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {pinInput: '', userInput: '', errorMessage: ''}

  onChangePin = event => {
    this.setState({pinInput: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({userInput: event.target.value})
  }

  onSuccessLogin = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 15})
    history.replace('/')
  }

  errorMessage = error => {
    this.setState({errorMessage: error})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {userInput, pinInput} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userObj = {
      user_id: userInput,
      pin: pinInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userObj),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.errorMessage(data.error_msg)
    }
  }

  render() {
    const {userInput, pinInput, errorMessage} = this.state
    return (
      <div className="login-container">
        <div className="second-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-logo"
          />
          <form className="form-container">
            <h1>Welcome Back!</h1>
            <label htmlFor="userId" className="label-element">
              User ID
            </label>
            <input
              type="text"
              placeholder="Enter User ID"
              id="userId"
              className="input"
              onChange={this.onChangeUserId}
              value={userInput}
            />
            <label htmlFor="pin" className="label-element">
              PIN
            </label>
            <input
              type="password"
              placeholder="Enter PIN"
              id="pin"
              className="input"
              onChange={this.onChangePin}
              value={pinInput}
            />
            <button
              type="submit"
              className="login-button"
              onClick={this.onClickLogin}
            >
              Login
            </button>
            <p className="error-message">{errorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
