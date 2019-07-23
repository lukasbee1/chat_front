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

const regexp = /[0-9]/;

class Chat extends React.Component {
  state = {
    currChat: [],
  };

  componentDidMount() {
    this.setId();
    console.log(this.props.chatsList);
  }

  setId() {
    const { pathname } = this.props.location;
    this.props.getMessages(+pathname.toString().match(regexp)[0]);
    // this.props.setEmit('activeChat', +pathname.toString().match(regexp)[0]);

    this.setState({
      currChat: this.props.chatsList.filter(
        item => item.id === +pathname.toString().match(regexp)[0]
      )[0],
    });
    console.log(
      this.props.chatsList.filter(
        item => item.id === +pathname.toString().match(regexp)[0]
      )
    );
  }

  render() {
    console.log(this.state.currChat);
    const { activeId, chats } = this.props;
    // const ava = this.props.getChatInfo(+pathname.toString().match(regexp)[0]).avatar;
    return (
      <>
        <div className="messanger__content-profile">
          <img
            src={`${process.env.REACT_APP_routeToStaticData}${
              this.state.currChat ? this.state.currChat.avatar : null
            }`}
            alt="avatar"
            className="messanger__content-profile_img"
          />
          <div className="my-auto">
            {this.state.currChat ? this.state.currChat.name : 'undef'}
          </div>
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
