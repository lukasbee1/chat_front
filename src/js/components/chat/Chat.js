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
// import DialogNotSelected from './MessageItem/DialogNotSelected';

import Message from './MessageItem/Message';

const regexp = /[0-9]/g;

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
    const { activeId, chats } = this.props;
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
          <div className="messanger__content-messageBlock">
            {chats[activeId]
              ? chats[activeId].map(message => (
                  <Message
                    key={message.id}
                    details={message.tweet}
                    sender={message.Sender}
                  />
                ))
              : null}
          </div>
          <InputItem roomId={this.props.activeId} />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  chats: state.chats,
  activeId: state.activeId,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setEmit, getMessages, initSocketConnection, sendMessage }
  )(Chat)
);
