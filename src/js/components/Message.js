import React, { PureComponent } from 'react';

class Message extends PureComponent {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return <div className="chat-message">{this.props.details}</div>;
  }
}

export default Message;
