/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getChat, setActiveChat } from '../../redux/actions';
import InputItem from './InputItem/InputItem';
import DialogNotSelected from './MessageItem/DialogNotSelected';

import Message from './MessageItem/Message';

const regexp = /[0-9]/g;

class Chat extends React.Component {
  constructor() {
    super();
    this.messageList = [];
    this.state = {
      id: null,
    };
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    // eslint-disable-next-line prefer-destructuring
    this.setState({ id: pathname.toString().match(regexp)[0] });

    this.props.getChat(this.id);
  }

  conponentDidMount() {}

  render() {
    console.log(this.props.chats);
    if (
      this.props.chats[this.state.id - 1] &&
      this.props.chats[this.state.id - 1].messages
    ) {
      this.messageList = this.props.chats[this.id - 1].messages.map(message => (
        <Message key={message.id} details={message.tweet} />
      ));
    }
    // else {
    //   this.props.history.push('/messanger');
    //   return <>{DialogNotSelected}</>;
    // }

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
            {this.messageList}
          </div>
          <InputItem />
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
    { getChat, setActiveChat }
  )(Chat)
);
