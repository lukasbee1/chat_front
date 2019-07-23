import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Message extends PureComponent {
  render() {
    console.log(this.props.sender);
    console.log(this.props.user.id);

    const whoSend =
      this.props.sender.uniqueId === this.props.user.uniqueId
        ? 'senderMess'
        : 'defaultMess';
    return (
      <div className={`messanger__content-messageBlock_message ${whoSend}`}>
        <img
          src={`${process.env.REACT_APP_routeToStaticData}${
            this.props.sender.avatar
          }`}
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
  user: state.user,
});

export default connect(
  mapStateToProps,
  null
)(Message);
