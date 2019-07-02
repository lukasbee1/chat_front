/* eslint-disable react/button-has-type */

import React from 'react';
import { connect } from 'react-redux';
import Contact from './contactItem/Contact';
import { getUsers } from '../../redux/actions';

class SidePanel extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const arrayOfChats = this.props.chatList.map(chat => (
      <Contact det={chat.id} chN={chat.name} key={chat.id} />
    ));

    return (
      <div className="messanger__sidepanel">
        <div>
          <div className="messanger__sidepanel-profile">
            <img
              id="profile-img"
              src="http://emilcarlsson.se/assets/mikeross.png"
              className="online"
              alt=""
            />
            <div className="m-auto">{this.props.user.email}</div>
            <i className="m-auto fa fa-chevron-down expand-button" />
          </div>
          <div className="messanger__contacts">{arrayOfChats}</div>
        </div>
        <div className="messanger__sidepanel-bottomBar">
          <button className="messanger__sidepanel-bottomBar_addcontact">
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span> Add chat</span>
          </button>
          <button
            className="messanger__sidepanel-bottomBar_settings"
            onClick={this.addChat}
          >
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span> Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  chatList: state.chatList,
});

export default connect(
  mapStateToProps,
  { getUsers }
)(SidePanel);
