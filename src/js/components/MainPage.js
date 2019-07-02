/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import io from 'socket.io-client';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  initSocketConnection,
  sendMessage,
  clientsUpdated,
  getChat,
} from '../redux/actions';
import DialogNotSelected from './chat/MessageItem/DialogNotSelected';
import SidePanel from './sidePanel/SidePanel';
import Chat from './chat/Chat';
// import createRoom from './modals/createRoom';
import '../../css/MainPage.css';
import '../../css/Chat.css';

// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!
// ///////////// you have to add "log out" button!!!!!!!!!!!!!!!!!!!!

class MainPage extends Component {
  componentDidMount() {
    const client = io('http://localhost:8080');

    this.props.initSocketConnection(client);
    client.on('connect', () => {
      console.log('client connected, listening...');
    });
    client.on('clientsUpdated', usersInfo => {
      this.props.clientsUpdated(usersInfo);
    });
    client.on('reply', data => {
      console.log(data);
      this.props.sendMessage(data);
    });

    client.on('disconnect', () => {
      console.log('Client socket disconnect. ');
      // cl.splice(this.props.client.id, 1);
      // this.props.client.close();
    });
    client.on('error', err => {
      console.error(JSON.stringify(err));
    });
  }

  render() {
    if (localStorage.getItem('uniqueId')) {
      this.props.user.email = localStorage.getItem('email');
      this.props.user.id = localStorage.getItem('id');
      this.props.user.uniqueId = localStorage.getItem('uniqueId');
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
  client: state.client,
  user: state.user,
  chats: state.chats,
  activeChatId: state.activeChatId,
});

export default connect(
  mapStateToProps,
  { initSocketConnection, sendMessage, clientsUpdated, getChat }
)(MainPage);
