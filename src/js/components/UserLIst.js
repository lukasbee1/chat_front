import React from 'react';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  render() {
    const { users } = this.state;
    return <div>{users}</div>;
  }
}

export default UserList;
