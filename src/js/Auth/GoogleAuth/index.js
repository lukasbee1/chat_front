// /* eslint-disable no-underscore-dangle */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { saveUser } from '../../redux/actions';

// class GoogleAuth extends Component {
//   state = {};

//   componentDidMount() {
//     const _onInit = auth2 => {
//       console.log('init OK', auth2);
//     };
//     const _onError = err => {
//       console.log('error', err);
//     };
//     window.gapi.load('auth2', () => {
//       window.gapi.auth2
//         .init({
//           client_id: process.env.REACT_APP_cl_ID,
//         })
//         .then(_onInit, _onError);
//     });
//   }

//   googleSignIn = () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signIn().then(googleUser => {
//       // eslint-disable-next-line camelcase
//       const { id_token } = googleUser.getAuthResponse();

//       fetch('http://localhost:8080/authGoogle', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id_token }),
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//           this.props.saveUser(data);
//           this.props.history.push('/chat');
//         });
//     });
//   };

//   signOut = () => {
//     const auth2 = window.gapi.auth2.getAuthInstance();
//     auth2.signOut().then(() => {
//       console.log('User signed out.');
//     });
//   };

//   render() {
//     return (
//       <input
//         type="button"
//         value="GOOGLE"
//         className="login-window__btn"
//         onClick={this.googleSignIn}
//       />
//     );
//   }
// }
// const mapStateToProps = state => ({
//   socket: state.socket,
//   user: state.user,
// });

// export default connect(
//   mapStateToProps,
//   { saveUser }
// )(GoogleAuth);
