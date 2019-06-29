import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from './components/MainPage';
import Login from './components/Login';
import '../css/App.css';
import history from '../history';

class App extends React.PureComponent {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Login} />
        <Route path="/messanger" component={MainPage} />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  client: state.socket,
  user: state.user,
});

export default connect(
  mapStateToProps,
  null
)(App);
