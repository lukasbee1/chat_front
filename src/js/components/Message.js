import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="chat-message">
        {this.props.details}
      </div>
    );
  }
}

export default Message;
