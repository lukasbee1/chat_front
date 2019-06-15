/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import io from 'socket.io-client';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import DialogNotSelected from './messages/DialogNotSelected';
import Chat from './Chat';
import Contact from './contacts/Contact';
import '../../css/MainPage.css';
import '../../css/Chat.css';

const client = io('http://localhost:8080');

class MainPage extends Component {
  state = {
    messages: [],
    clients: [],
  };

  componentDidMount() {
    client.on('connect', () => {
      console.log('client connected, listening...');
    });
    client.on('message', data => {
      const { messages } = this.state;
      this.setState({ messages: messages.concat({ data }) });
    });
    client.on('clientsUpdated', userLogins => {
      this.setState({ clients: [...userLogins] });
    });
    client.on('disconnect', () => {
      const { cl } = this.state;
      console.log('Client socket disconnect. ');
      cl.splice(client.id, 1);
      client.close();
    });
    client.on('error', err => {
      console.error(JSON.stringify(err));
    });
  }

  render() {
    console.log(this.props.user);
    if (this.props.user.email === '') {
      this.props.history.push('/');
      return <h1>Error, you should to sign in</h1>;
    }
    let arrayOfChats;
    if (this.props.chats) {
      arrayOfChats = this.props.chats.map(chat => (
        <Contact det={chat.id} chN={chat.name} key={chat.id} />
      ));
    }

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
              <span>Add contact</span>
            </button>
            <button className="messanger__sidepanel-bottomBar_settings">
              <i className="fa fa-cog fa-fw" aria-hidden="true" />
              <span>Settings</span>
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
  socket: state.socket,
  user: state.user,
  chats: state.chats,
  activeChatId: state.activeChatId,
});

export default connect(
  mapStateToProps,
  null
)(MainPage);
