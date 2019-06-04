import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const url = process.env.REACT_APP_GENERATED_GOOGLE_URL;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      pass: '',
    };
  }
  componentDidMount() {

  }
  handleSubmit = () => {
    if (!(this.state.info === '')) {
      console.log('handle submit triggered');
      this.setState({ info: '' });
    }
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit();
    }
  }

  handleInputChange = (e) => {
    this.setState({ info: e.target.value });
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div className="login-window">
          <TextField
            label="Login"
            value={this.state.login}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"
            className="login-window__input"
          />
          <TextField
            label="Password"
            value={this.state.pass}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"
            className="login-window__input"
          />
          <input 
            type="button"
            value="Log in"
            className="login-window__btn"
            onClick="handleSubmitLogin"

          />
          <input 
            type="button"
            value="Register"
            className="login-window__btn"
            onClick="handleSubmitRegister"
          /> <br/>
          <input 
            type="button"
            value="GOOGLE"
            className="login-window__btn"
            onClick="handleSubmitRegister"
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
