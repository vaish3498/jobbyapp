import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', errorOccurred: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFail = error => {
    this.setState({errorMsg: error, errorOccurred: true})
  }

  onSubmitFrom = async event => {
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
      console.log(data)
      this.onSubmitSuccess(data.errorMsg)
    }
  }

  render() {
    const {username, password, errorMsg, errorOccurred} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitFrom}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={this.onChangeUserName}
              placeholder="username"
              id="username"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="input"
              type="text"
              value={password}
              onChange={this.onChangePassword}
              placeholder="password"
              id="password"
            />
          </div>
          <button type="button" className="button">
            Login
          </button>
          {errorOccurred && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
