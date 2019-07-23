/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getUsers, getChats, postCreateChat } from '../../redux/queries';

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      selectedUsers: [],
      name: '',
    };
  }

  handleCreatePress = () => {
    const { name, selectedUsers } = this.state;
    this.props.postCreateChat({
      name,
      users: [this.props.user, ...selectedUsers],
    });
    // this.props.getChats(this.props.user.id);
    this.closeModal();
  };

  handleUserPress = user => {
    const { selectedUsers } = this.state;
    if (selectedUsers.includes(user)) {
      this.setState({
        selectedUsers: selectedUsers.filter(
          item => item.uniqueId !== user.uniqueId
        ),
      });
    } else {
      const newArray = selectedUsers;
      newArray.push(user);
      this.setState({ selectedUsers: newArray });
    }
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleInputChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const list = this.props.usersList.filter(
      user => user.uniqueId !== this.props.user.uniqueId
    );
    const listComp = list.map(user => (
      <button
        onClick={() => this.handleUserPress(user)}
        key={user.id}
        className="modal-usersList modal-usersList__component"
      >
        <img
          src={`${process.env.REACT_APP_routeToStaticData}${user.avatar}`}
          alt="ava"
        />
        <div className="modal-usersList__component-text">{user.name}</div>
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
              onClick={() => this.handleCreatePress(this.state.selectedUsers)}
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
