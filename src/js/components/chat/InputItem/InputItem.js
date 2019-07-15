/* eslint-disable react/button-has-type */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, setEmit } from '../../../redux/actions';

class InputItem extends Component {
  constructor() {
    super();
    this.state = {
      inpData: '',
    };
  }

  sendMessage = () => {
    const { inpData } = this.state;
    const { activeId, user } = this.props;
    if (inpData !== '') {
      this.props.setEmit('reply', inpData, user, activeId);
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
  user: state.user,
  activeId: state.activeId,
});

export default connect(
  mapStateToProps,
  { sendMessage, setEmit }
)(InputItem);
