/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getChat,
  initSocketConnection,
  sendMessage,
  setEmit,
} from '../../redux/actions';
import InputItem from './InputItem/InputItem';
// import DialogNotSelected from './MessageItem/DialogNotSelected';

import Message from './MessageItem/Message';

const regexp = /[0-9]/g;

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      currentMessages: [],
    };
  }

  componentDidMount() {
    this.setId();
  }

  componentDidUpdate(prevProps) {
    const { chats, location } = this.props;
    if (prevProps.chats !== chats) {
      this.getMess();
    }
    if (prevProps.location !== location) {
      this.setId();
    }
  }

  setId() {
    const { pathname } = this.props.location;
    const { id } = this.state;
    this.setState({ id: +pathname.toString().match(regexp)[0] });
    this.props.getChat(+pathname.toString().match(regexp)[0]);

    // cl.emit('activeChat', +pathname.toString().match(regexp)[0], id);
    this.props.setEmit('activeChat', +pathname.toString().match(regexp)[0], id);
  }

  getMess() {
    const { chats } = this.props;
    const { id } = this.state;
    this.setState({ currentMessages: chats[id] });
  }

  render() {
    const { currentMessages } = this.state;
    const messageList = currentMessages.map(message => {
      return (
        <Message
          key={message.id}
          details={message.tweet}
          sender={message.Sender}
        />
      );
    });

    return (
      <>
        <div className="messanger__content-profile">
          <img
            src="http://emilcarlsson.se/assets/harveyspecter.png"
            alt="avatar"
            className="messanger__content-profile_img"
          />
          <div className="my-auto">Harvey Specter</div>
        </div>
        <div className="messanger__content-chat">
          <div className="messanger__content-messageBlock">{messageList}</div>
          <InputItem roomId={this.state.id} />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  chats: state.chats,
  client: state.client,
  user: state.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setEmit, getChat, initSocketConnection, sendMessage }
  )(Chat)
);
