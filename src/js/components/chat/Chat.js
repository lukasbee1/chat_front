/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { getChat } from '../../redux/actions';
import InputItem from './InputItem/InputItem';
import DialogNotSelected from './MessageItem/DialogNotSelected';

import Message from './MessageItem/Message';

class Chat extends React.Component {
  componentDidMount() {
    this.props.getChat(this.props.activeChatId);
  }

  getMessages = () => {
    // fetch('/api/getList')
    // .then(res => res.json())
    // .then(list => console.log(list));
  };

  render() {
    if (this.props.activeChatId === null) {
      this.props.history.push('/messanger');
      return <>{DialogNotSelected}</>;
    }
    console.log(this.props.activeChatId);
    let messageList = [];

    if (this.props.chats[this.props.activeChatId - 1].messages) {
      messageList = this.props.chats[this.props.activeChatId - 1].messages.map(
        message => <Message key={message.id} details={message.tweet} />
      );
    }
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
          <InputItem />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  chats: state.chats,
  activeChatId: state.activeChatId,
  messages: state.chats.messages,
  client: state.client,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getChat }
)(Chat);
