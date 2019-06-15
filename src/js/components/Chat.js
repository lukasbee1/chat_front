/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/actions';
import DialogNotSelected from './messages/DialogNotSelected';

import Message from './Message';

class Chat extends React.Component {
  constructor(name, id) {
    super();
    this.name = name;
    this.id = id;
    this.state = {
      inpData: '',
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    // fetch('/api/getList')
    // .then(res => res.json())
    // .then(list => console.log(list));
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  };

  sendMessage = () => {
    const { inpData } = this.state;

    if (!(inpData === '')) {
      this.props.sendMessage(inpData);
      this.setState({ inpData: '' });
      // client.emit('reply', info);
    }
  };

  handleInputChange = e => {
    this.setState({ inpData: e.target.value });
  };

  render() {
    if (this.props.activeChatId === null) {
      this.props.history.push('/messanger');
      return <>{DialogNotSelected}</>;
    }
    const { inpData } = this.state;
    const messageList = this.props.chats[
      this.props.activeChatId - 1
    ].messages.map(message => <Message key={message.id} details={message} />);
    return (
      <div className="messanger__content-chat">
        <div className="messanger__content-messageBlock">{messageList}</div>
        <div className="messanger__content-messageBlock-input">
          <input
            placeholder="Write your message..."
            value={inpData}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            className="messanger__content-messageBlock-input_item"
          />
          <i
            className="messanger__content-messageBlock-input_pin fa fa-paperclip attachment"
            aria-hidden="true"
          />
          <button
            aria-hidden="true"
            onClick={this.sendMessage}
            className="messanger__content-messageBlock-input_submit fa fa-paper-plane"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  chats: state.chats,
  activeChatId: state.activeChatId,
  messages: state.chats.messages,
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(Chat);
