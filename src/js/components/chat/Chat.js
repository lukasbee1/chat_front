/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMessages } from '../../redux/queries';
import {
  initSocketConnection,
  sendMessage,
  setEmit,
} from '../../redux/actions';
import InputItem from './InputItem/InputItem';
import Message from './MessageItem/Message';

const regexp = /[0-9]+/g;

class Chat extends React.PureComponent {
  componentDidMount() {
    this.setId();
  }

  setId() {
    const { pathname } = this.props.location;
    this.props.getMessages(+pathname.toString().match(regexp)[0]);
    // this.props.setEmit('activeChat', +pathname.toString().match(regexp)[0]);
  }

  render() {
    const { pathname } = this.props.location;
    const { activeId, chats, user, chatsList } = this.props;
    const currChat = chatsList.filter(
      item => item.id === +pathname.toString().match(regexp)[0]
    )[0];
    return (
      <>
        <div className="messanger__content-profile">
          <img
            src={`${process.env.REACT_APP_routeToStaticData}${
              currChat ? currChat.avatar : null
            }`}
            alt="avatar"
            className="messanger__content-profile_img"
          />
          <div className="my-auto">{currChat ? currChat.name : 'undef'}</div>
        </div>
        <div className="messanger__content-chat">
          <div className="messanger__content-messageBlock">
            {chats[activeId]
              ? chats[activeId].map(message => (
                  <Message
                    key={message.id}
                    details={message.tweet}
                    sender={message.sender}
                    uniqueId={user.uniqueId}
                  />
                ))
              : null}
          </div>
          <InputItem />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  chats: state.chats,
  chatsList: state.chatsList,
  activeId: state.activeId,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setEmit, getMessages, initSocketConnection, sendMessage }
  )(Chat)
);
