/* eslint-disable react/button-has-type */

import React from 'react';
import { connect } from 'react-redux';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from 'reactstrap';
import Contact from './contactItem/Contact';
import { getUsers, getChats } from '../../redux/actions';

class SidePanel extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.toggle('2');
    this.props.getUsers();
    this.props.getChats();
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  render() {
    const arrayOfChats = this.props.chatsList.map(chat => (
      <Contact det={chat.id} chN={chat.name} key={chat.id} />
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
              src={this.props.user.avatar}
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
                  this.props.getChats();
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
          <button
            className="messanger__sidepanel-bottomBar_addcontact"
            onClick={this.openModal}
          >
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span> Add chat</span>
          </button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
          >
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <form>
                <input placeholder="enter chat name" />
                <Input
                  type="radio"
                  name="selectMulti"
                  id="exampleSelectMulti"
                  multiple
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.closeModal}>
                Do Something
              </Button>
              <Button color="secondary" onClick={this.closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <button className="messanger__sidepanel-bottomBar_settings">
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
  chatsList: state.chatsList,
  usersList: state.usersList,
});

export default connect(
  mapStateToProps,
  { getUsers, getChats }
)(SidePanel);
