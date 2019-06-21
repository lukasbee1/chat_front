import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveChat, saveMessages } from '../../redux/actions';

class Contact extends PureComponent {
  setActiveId(id) {
    this.props.setActiveChat(id);

    fetch(`http://localhost:8080/api/messages/id${id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.props.saveMessages(data);
      });
  }

  render() {
    return (
      <Link
        to={`/messanger/id${this.props.det}`}
        key={this.props.det}
        onClick={() => this.setActiveId(this.props.det)}
        className="messanger__constacts-contact"
      >
        <div className="messanger__constacts-contact_avatar">
          <span className="contact-status online" />
          <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
        </div>
        <div className="messanger__constacts-contact_meta">
          <div className="messanger__constacts-contact_meta-link">
            {this.props.chN}
          </div>
          <div className="messanger__constacts-contact_meta-preview">
            last message
          </div>
        </div>
      </Link>
    );
  }
}
const mapStateToProps = state => ({
  socket: state.socket,
  user: state.user,
  chats: state.chats,
  activeChatId: state.activeChatId,
});

export default connect(
  mapStateToProps,
  { setActiveChat, saveMessages }
)(Contact);
