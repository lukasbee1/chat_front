import React from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CreateRoom from '../modals/CreateRoom';
import Contact from './contactItem/Contact';
import { getUsers, getChats, getMessages } from '../../redux/queries';

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
      <Contact
        ava={chat.avatar}
        det={chat.id}
        chN={chat.name}
        key={chat.id}
        getM={this.props.getMessages}
      />
    ));
    const arrayOfUsers = this.props.usersList.map(user => (
      // <Contact det={user.id} chN={user.name} key={user.id} />
      <div key={user.id}>{user.name}</div>
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
  { getUsers, getChats, getMessages }
)(SidePanel);
