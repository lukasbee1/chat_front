import React from 'react';
import Message from './Message';

class Chat extends React.PureComponent {
  render() {
    const messageList = this.props.details.map(message => (
      <Message key={message.id} details={message.data} />
    ));
    const clientList = this.props.clients.map(client => (
      <Message key={client} details={client} />
    ));
    return (
      <div className="container">
        <div className="chat">
          <div className="chat-header">
            <h2>event log</h2>
          </div>
          {messageList}
        </div>
        <div className="chat users">
          <h2 className="chat-header users-header"> Users </h2>
          {clientList}
        </div>
      </div>
    );
  }
}

export default Chat;
