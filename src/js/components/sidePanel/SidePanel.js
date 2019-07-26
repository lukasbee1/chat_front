/* eslint-disable react/button-has-type */

import React from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import history from '../../../history';
import CreateRoom from '../modals/CreateRoom';
import Contact from './contactItem/Contact';
import DialogItem from './contactItem/DialogItem';
import { getUsers, getChats, getMessages } from '../../redux/queries';
import { logOut } from '../../redux/actions';

class SidePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: '2',
    };
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getChats(this.props.user.id);
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const arrayOfChats = this.props.chatsList.map(chat => (
      <DialogItem
        ava={chat.avatar}
        det={chat.id}
        chN={chat.name}
        key={chat.id}
        getM={this.props.getMessages}
      />
    ));
    const arrayOfUsers = this.props.usersList.map(user => (
      <Contact ava={user.avatar} name={user.name} key={user.id} />
    ));

    return (
      <div className="messanger__sidepanel">
        <div>
          <div className="messanger__sidepanel-profile">
            <img
              id="profile-img"
              src={`${process.env.REACT_APP_routeToStaticData}${
                this.props.user.avatar
              }`}
              className="online"
              alt=""
            />
            <div className="m-auto">{this.props.user.email}</div>
            <i className="m-auto fa fa-chevron-down expand-button" />
          </div>

          <Nav tabs>
            <NavItem>
              <NavLink
                onClick={() => {
                  this.toggle('1');
                  this.props.getUsers();
                }}
              >
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  this.toggle('2');
                  this.props.getChats(this.props.user.id);
                }}
              >
                Chats
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="messanger__contacts">{arrayOfUsers}</div>
            </TabPane>
            <TabPane tabId="2">
              <div className="messanger__contacts">{arrayOfChats}</div>
            </TabPane>
          </TabContent>
        </div>
        <div className="messanger__sidepanel-bottomBar">
          <CreateRoom />
          <button
            className="messanger__sidepanel-bottomBar_settings"
            onClick={() => {
              history.push('/');
              this.props.logOut();
            }}
          >
            <i className="fa fa-cog fa-fw" aria-hidden="true" />
            <span> Log Out</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  chatsList: state.chatsList,
  usersList: state.usersList,
});

export default connect(
  mapStateToProps,
  { getUsers, getChats, getMessages, logOut }
)(SidePanel);
