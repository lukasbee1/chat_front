import React from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  render() {
    return (
      <div>
        {this.state.users}
      </div>
    );
  }
}

export default UserList;
