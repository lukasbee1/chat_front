/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { BrowserRouter as Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      pass: '',
    };
  }

  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2);
    };
    const _onError = err => {
      console.log('error', err);
    };
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          // не забудьте указать ваш ключ в .env
          client_id: process.env.REACT_APP_cl_ID,
        })
        .then(_onInit, _onError);
    });
  }

  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      // метод возвращает объект пользователя
      // где есть все необходимые нам поля
      const profile = googleUser.getBasicProfile();
      // console.log(`ID: ${profile.getId()}`); // не посылайте подобную информацию напрямую, на ваш сервер!
      // console.log(`Full Name: ${profile.getName()}`);
      // console.log(`Given Name: ${profile.getGivenName()}`);
      // console.log(`Family Name: ${profile.getFamilyName()}`);
      // console.log(`Image URL: ${profile.getImageUrl()}`);
      // console.log(`Email: ${profile.getEmail()}`);

      // токен
      const { id_token } = googleUser.getAuthResponse();
      // console.log(`ID Token: ${id_token}`);

      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token }),
      })
        .then(response => response.json())
        .then(data => console.log(data));
    });
  };

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  handleSubmit = () => {
    const { info } = this.state;

    if (!(info === '')) {
      console.log('handle submit triggered');
      this.setState({ info: '' });
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  };

  handleInputChange = e => {
    this.setState({ info: e.target.value });
  };

  // handleSubmitLogin = () => { };

  render() {
    const { login, pass } = this.state;

    return (
      <Container maxWidth="lg">
        {/* <button onClick={this.signOut}>Log out</button> */}
        <div className="login-window">
          <TextField
            label="Login"
            value={login}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"
            className="login-window__input"
          />
          <TextField
            label="Password"
            value={pass}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"
            className="login-window__input"
          />
          <Link
            to="/chat"
            onClick="handleSubmitLogin"
            className="login-window__btn"
          >
            Log in
          </Link>
          <input
            type="button"
            value="Register"
            className="login-window__btn"
            onClick="handleSubmitRegister"
          />
          <br />
          <input
            type="button"
            value="GOOGLE"
            className="login-window__btn"
            onClick={this.signIn}
          />
          <input
            type="button"
            value="FACEBOOK"
            className="login-window__btn"
            onClick="handleSubmitRegister"
          />
          <input
            type="button"
            value="GITHUB"
            className="login-window__btn"
            onClick="handleSubmitRegister"
          />
        </div>
      </Container>
    );
  }
}

export default Login;
