/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSocket } from '../redux/actions';
import DialogNotSelected from './chat/MessageItem/DialogNotSelected';
import SidePanel from './sidePanel/SidePanel';
import Chat from './chat/Chat';
import '../../css/MainPage.css';

// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!

class MainPage extends Component {
  componentDidMount() {
    this.props.createSocket(this.props.user.uniqueId);
  }

  render() {
    if (localStorage.getItem('uniqueId')) {
      this.props.user.email = localStorage.getItem('email');
      this.props.user.id = localStorage.getItem('id');
      this.props.user.uniqueId = localStorage.getItem('uniqueId');
      this.props.user.avatar = localStorage.getItem('avatar');
    } else {
      this.props.history.push('/');
      return <h1>Error, you should to sign in</h1>;
    }

    return (
      <div className="messanger">
        <SidePanel />
        <div className="messanger__content">
          <Route exact path="/messanger" component={DialogNotSelected} />
          <Route path="/messanger/:id" component={Chat} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { createSocket }
)(MainPage);
