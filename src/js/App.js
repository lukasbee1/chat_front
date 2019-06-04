import React, { Component } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import '../css/App.css';
// const url = process.env.REACT_APP_GENERATED_GOOGLE_URL;
const client = io('http://localhost:8080');

class App extends Component {
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
    client.on('message', (data) => {
      this.setState({ messages: this.state.messages.concat({ data }) })
    });

    client.on('clientsID', clientsID => {
      this.setState({ clients: [...clientsID] });
    });

    client.on('disconnect', () => {
      console.log('Client socket disconnect. ');
      this.state.clients.splice(client.id, 1);
      client.close();
    });
    client.on('error', (err) => {
      console.error(JSON.stringify(err));
    });
  }
  handleSubmit = () => {
    if (!(this.state.info === '')) {
      client.emit('reply', this.state.info);
      console.log('handle submit triggered');
      const data = this.state.info;
      //this.setState({ messages: this.state.messages.concat( data ) });
      this.setState({ info: '' });
      this.setState({ messages: this.state.messages.concat({ data }) })
      console.log(this.state);
    }
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit();
    }
  }

  handleInputChange = (e) => {
    this.setState({ info: e.target.value });
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Chat details={this.state.messages} clients={this.state.clients} />

        <TextField
          label="enter message"
          value={this.state.info}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          margin="normal"
        />
      </Container>
    );
  }
}

export default App;
