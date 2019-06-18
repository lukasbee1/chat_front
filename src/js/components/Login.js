/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxSignIn } from '../redux/actions';

// import { BrowserRouter as Link } from 'react-router-dom';
import '../../css/Login.css';

class Login extends Component {
  state = {
    email: '',
  };

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
          client_id: process.env.REACT_APP_cl_ID,
        })
        .then(_onInit, _onError);
    });
  }

  sendDataOnServer = obj => {
    localStorage.setItem('email', obj.email);
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.props.reduxSignIn(data);
      })
      .then(() => {
        this.props.history.push('/messanger');
      });
    // .then(() => {
    //   this.props.socket.emit('id', this.props.user.id);
    // });
  };

  googleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then(googleUser => {
        const profile = googleUser.getBasicProfile();
        const obj = {
          type: 'profile',
          email: profile.getEmail(),
          login: profile.getEmail(),
          name: profile.getName(),
        };
        return obj;
      })
      .then(data => {
        this.sendDataOnServer(data);
      });
  };

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  handleSubmit = () => {
    this.setState({ email: '' });
    const obj = {
      type: 'profile',
      email: this.state.email,
      login: this.state.email,
      name: this.state.email,
    };
    if (obj.email) {
      this.sendDataOnServer(obj);
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  };

  handleInputChange = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    const { email } = this.state;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        value={email}
                        className="form-control"
                        placeholder="Email address"
                        required
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        id="inputPassword"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember password
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Sign in
                    </button>
                    <hr className="my-4" />
                    <button
                      className="btn btn-lg btn-google btn-block text-uppercase"
                      type="submit"
                      onClick={this.googleSignIn}
                    >
                      <i className="fab fa-google mr-2">Sign in with Google</i>
                    </button>
                    <button
                      className="btn btn-lg btn-facebook btn-block text-uppercase"
                      type="submit"
                    >
                      <i className="fab fa-facebook-f mr-2">
                        Sign in with Facebook
                      </i>
                    </button>
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
  socket: state.socket,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { reduxSignIn }
)(Login);
