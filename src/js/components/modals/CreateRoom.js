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
import { getUsers, getChats } from '../../redux/actions';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    const listComp = this.props.usersList.map(user => (
      <div key={user.id} className="messanger__constacts-contact">
        <img src={user.avatar} alt="ava" />
        <div>{user.name}</div>
      </div>
    ));
    return (
      <>
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
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <form>
              <input placeholder="enter chat name" />
            </form>
            <div className="modal-usersList">{listComp}</div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>
              Create
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
      </>
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
)(CreateRoom);
