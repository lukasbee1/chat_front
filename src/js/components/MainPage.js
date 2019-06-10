import React, { Component } from 'react';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Chat from './Chat';

// const url = process.env.REACT_APP_GENERATED_GOOGLE_URL;
const client = io('http://localhost:8080');

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      clients: [],
      info: '',
    };
  }

  componentDidMount() {
    client.on('connect', () => {
      console.log('client connected, listening...');
    });
    client.on('message', data => {
      const { messages } = this.state;
      this.setState({ messages: messages.concat({ data }) });
    });

    client.on('clientsID', clientsID => {
      this.setState({ clients: [...clientsID] });
    });

    client.on('disconnect', () => {
      const { cl } = this.state;
      console.log('Client socket disconnect. ');
      cl.splice(client.id, 1);
      client.close();
    });
    client.on('error', err => {
      console.error(JSON.stringify(err));
    });
  }

  handleSubmit = () => {
    const { messages, info } = this.state;

    if (!(info === '')) {
      client.emit('reply', info);
      console.log('handle submit triggered');
      const data = info;
      // this.setState({ messages: this.state.messages.concat( data ) });
      this.setState({ info: '' });
      this.setState({ messages: messages.concat({ data }) });
      console.log(this.state);
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  };

  handleInputChange = e => {
    this.setState({ info: e.target.value });
  };

  render() {
    const { messages, clients, info } = this.state;

    return (
      <Container maxWidth="lg">
        <Chat details={messages} clients={clients} />

        <TextField
          label="enter message"
          value={info}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          margin="normal"
        />
      </Container>
    );
  }
}

export default MainPage;
