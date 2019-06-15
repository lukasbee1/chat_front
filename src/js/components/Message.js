import React, { PureComponent } from 'react';

class Message extends PureComponent {
  render() {
    return (
      <div className="messanger__content-messageBlock_message">
        <img
          src="http://emilcarlsson.se/assets/mikeross.png"
          className="messanger__content-messageBlock_message-img"
          alt=""
        />
        <p className="messanger__content-messageBlock_message-item">
          {this.props.details}
        </p>
      </div>
    );
  }
}

export default Message;
