/* eslint-disable react/button-has-type */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../../redux/actions';
import av from '../../../../img/download.jpeg';

class InputItem extends Component {
  constructor() {
    super();
    this.state = {
      inpData: '',
    };
  }

  sendMessage = () => {
    const { inpData } = this.state;
    const { roomId } = this.props;
    const { avatar } = av;
    if (inpData !== '') {
      this.props.sendMessage({
        tweet: inpData,
        id: roomId,
        Sender: { avatar },
      });
      this.props.client.emit(
        'reply',
        inpData,
        this.props.user.id,
        this.props.roomId
      );
      this.setState({ inpData: '' });
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  };

  handleInputChange = e => {
    this.setState({ inpData: e.target.value });
  };

  render() {
    const { inpData } = this.state;
    return (
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
    );
  }
}
const mapStateToProps = state => ({
  client: state.client,
  user: state.user,
  chats: state.chats,
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(InputItem);
