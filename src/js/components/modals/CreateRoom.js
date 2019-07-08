/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getUsers, getChats, postCreateChat } from '../../redux/actions';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      selectedUsers: [],
      name: '',
    };
  }

  selectUser = id => {
    const { selectedUsers } = this.state;
    this.setState({ selectedUsers: [...selectedUsers, id] });
    console.log('selected');
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  createChat = () => {
    const { name, selectedUsers } = this.state;
    const obj = {
      name,
      usersId: selectedUsers,
    };
    this.props.postCreateChat(obj);
    this.props.getChats(this.props.user.id);
    this.closeModal();
  };

  handleInputChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const listComp = this.props.usersList.map(user => (
      <button
        onClick={() => this.selectUser(user.id)}
        key={user.id}
        className="modal-usersList"
      >
        <img src={user.avatar} alt="ava" />
        <div>{user.name}</div>
      </button>
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
              <input
                onChange={this.handleInputChange}
                placeholder="enter chat name"
              />
            </form>
            <div className="modal-usersList">{listComp}</div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.createChat(this.state.selectedUsers)}
            >
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
  { getUsers, getChats, postCreateChat }
)(CreateRoom);
