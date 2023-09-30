import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {pinInput: '', userInput: ''}

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
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.jwt_token)
      this.onSuccessLogin(data.jwt_token)
    }
  }

  render() {
    const {userInput, pinInput} = this.state
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
              type="text"
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
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
