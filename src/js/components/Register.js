/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxSignIn } from '../redux/actions';
import { postRegister } from '../redux/queries';

// import { BrowserRouter as Link } from 'react-router-dom';
import '../../css/Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    oPassword: '',
    login: '',
  };

  onRegisterPress = () => {
    if (this.state.password === this.state.oPassword) {
      const obj = {
        type: 'profile',
        email: this.state.email,
        login: this.state.login,
        name: this.state.login,
        password: this.state.password,
      };
      this.props.postRegister(obj);
      this.setState({
        email: '',
        login: '',
        password: '',
        oPassword: '',
      });
    } else {
      console.log('passwords not similar');
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onRegisterPress();
    }
  };

  handleInputChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleInputChangeLogin = e => {
    this.setState({ login: e.target.value });
  };

  handleInputChangePasswors = e => {
    this.setState({ password: e.target.value });
  };

  handleInputChangeRepeatPasswors = e => {
    this.setState({ oPassword: e.target.value });
  };

  render() {
    const { email, login, password, oPassword } = this.state;
    if (localStorage.getItem('uniqueId')) {
      this.props.user.email = localStorage.getItem('email');
      this.props.user.id = localStorage.getItem('id');
      this.props.user.uniqueId = localStorage.getItem('uniqueId');
      this.props.user.avatar = localStorage.getItem('avatar');
      this.props.history.push('/messanger');
    }
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Register</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        value={email}
                        className="form-control"
                        placeholder="Email address"
                        required
                        onChange={this.handleInputChangeEmail}
                        onKeyPress={this.handleKeyPress}
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        id="inputLogin"
                        value={login}
                        className="form-control"
                        placeholder="login"
                        required
                        onChange={this.handleInputChangeLogin}
                        onKeyPress={this.handleKeyPress}
                      />
                      <label htmlFor="inputLogin">Login</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        value={password}
                        id="inputPassword"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.handleInputChangePasswors}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        value={oPassword}
                        id="inputRepeatPassword"
                        type="password"
                        className="form-control"
                        placeholder="Repeat Password"
                        onChange={this.handleInputChangeRepeatPasswors}
                        required
                      />
                      <label htmlFor="inputRepeatPassword">
                        Repeat Password
                      </label>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={this.onRegisterPress}
                    >
                      Sign Up
                    </button>
                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { reduxSignIn, postRegister }
)(Login);
