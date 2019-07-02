/* eslint-disable react/button-has-type */

import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from 'reactstrap';
import Contact from './contactItem/Contact';
import { getUsers } from '../../redux/actions';

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
    this.props.getUsers();
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  openModal() {
    console.log('tr');
    this.setState({ modalIsOpen: true });
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
          <button
            className="messanger__sidepanel-bottomBar_addcontact"
            onClick={this.openModal}
          >
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span> Add chat</span>
          </button>
          <button className="messanger__sidepanel-bottomBar_settings">
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Open modal"
            >
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                <form>
                  <input placeholder="enter chat name" />
                  <Input
                    type="select"
                    name="selectMulti"
                    id="exampleSelectMulti"
                    multiple
                  >
                    this.props.
                  </Input>
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
