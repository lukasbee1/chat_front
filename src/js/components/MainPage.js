/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import io from 'socket.io-client';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  initSocketConnection,
  sendMessage,
  clientsUpdated,
} from '../redux/actions';
import DialogNotSelected from './messages/DialogNotSelected';
import Chat from './Chat';
import Contact from './contacts/Contact';
import '../../css/MainPage.css';
import '../../css/Chat.css';

const client = io('http://localhost:8080');

class MainPage extends Component {
  componentDidMount() {
    this.props.initSocketConnection(client);

    client.on('connect', () => {
      console.log('client connected, listening...');
    });
    client.on('clientsUpdated', usersInfo => {
      this.props.clientsUpdated(usersInfo);
    });
    client.on('message', data => {
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

    fetch('http://localhost:8080/api/clientsList', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(rooms => {
        this.props.clientsUpdated(rooms);
        console.log(rooms);
      });
  }

  addChat = () => {
    // fetch('http://localhost:8080/api/addChat', {
    //   method: 'GET',
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     this.props.addChat(data);
    //   })
    //   .then(() => {
    //     console.log('chat created');
    //   });
  };

  render() {
    // console.log(this.props.user);
    if (this.props.user.email === '' || localStorage.getItem('email')) {
      this.props.user.email = localStorage.getItem('email');
    } else {
      console.log('triggered');
      this.props.history.push('/');
      return <h1>Error, you should to sign in</h1>;
    }
    console.log(this.props.chats);
    const arrayOfChats = this.props.chats.map(chat => (
      <Contact det={chat.id} chN={chat.name} key={chat.id} />
    ));

    return (
      <div className="messanger">
        <div className="messanger__sidepanel">
          <div>
            <div className="messanger__sidepanel-profile">
              <img
                id="profile-img"
                src="http://emilcarlsson.se/assets/mikeross.png"
                className="online"
                alt=""
              />
              <div className="m-auto">{this.props.user.email}</div>
              <i className="m-auto fa fa-chevron-down expand-button" />
            </div>
            <div className="messanger__contacts">{arrayOfChats}</div>
          </div>
          <div className="messanger__sidepanel-bottomBar">
            <button className="messanger__sidepanel-bottomBar_addcontact">
              <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
              <span> Add chat</span>
            </button>
            <button
              className="messanger__sidepanel-bottomBar_settings"
              onClick={this.addChat}
            >
              <i className="fa fa-cog fa-fw" aria-hidden="true" />
              <span> Settings</span>
            </button>
          </div>
        </div>
        <div className="messanger__content">
          <div className="messanger__content-profile">
            <img
              src="http://emilcarlsson.se/assets/harveyspecter.png"
              alt=""
              className="messanger__content-profile_img"
            />
            <div className="my-auto">Harvey Specter</div>
          </div>
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
  { initSocketConnection, sendMessage, clientsUpdated }
)(MainPage);
