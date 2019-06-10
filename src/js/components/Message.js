import React, { PureComponent } from 'react';

class Message extends PureComponent {
  render() {
    return <div className="chat-message">{this.props.details}</div>;
  }
}

export default Message;
