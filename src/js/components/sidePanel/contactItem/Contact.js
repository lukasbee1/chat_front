import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChat } from '../../../redux/actions';

class Contact extends PureComponent {
  render() {
    return (
      <Link
        to={`/messanger/id${this.props.det}`}
        // onClick={() => this.setActiveId(this.props.det)}
        key={this.props.det}
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
});

export default connect(
  mapStateToProps,
  { getChat }
)(Contact);
