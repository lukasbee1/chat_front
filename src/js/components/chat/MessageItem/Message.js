import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Message extends PureComponent {
  render() {
    return (
      <div className="messanger__content-messageBlock_message">
        <img
          src={this.props.user.avatar}
          className="messanger__content-messageBlock_message-img"
          alt="avatar"
        />
        <p className="messanger__content-messageBlock_message-item">
          {this.props.details}
        </p>
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
  null
)(Message);
