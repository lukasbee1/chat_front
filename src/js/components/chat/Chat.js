/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getChat, setActiveChat } from '../../redux/actions';
import InputItem from './InputItem/InputItem';
// import DialogNotSelected from './MessageItem/DialogNotSelected';

import Message from './MessageItem/Message';

const regexp = /[0-9]/g;

class Chat extends React.Component {
  componentDidMount() {}

  componentWillUpdate() {
    const { pathname } = this.props.location;
    const id = pathname.toString().match(regexp)[0];
    this.props.setActiveChat(id);
    console.log(id);
    this.props.getChat(id);
  }

  render() {
    // if (this.props.activeChatId === null) {
    //   this.props.history.push('/messanger');
    //   return <>{DialogNotSelected}</>;
    // }

    let messageList = [];
    console.log('!!!!!!!!!!!');

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

export default withRouter(
  connect(
    mapStateToProps,
    { getChat, setActiveChat }
  )(Chat)
);
