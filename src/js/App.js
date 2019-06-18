import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from './components/MainPage';
import Login from './components/Login';
import '../css/App.css';

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/messanger" component={MainPage} />
      </BrowserRouter>
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
