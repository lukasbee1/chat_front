import history from '../../history';

export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  payload: message,
});

export const createChat = chat => ({
  type: 'CREATE_CHAT',
  payload: chat,
});

export const reduxSignIn = user => ({
  type: 'SIGN_IN',
  payload: user,
});
export const clientsUpdated = users => ({
  type: 'CLIENTS_UPDATED',
  payload: users,
});
export const chatsUpdated = chats => ({
  type: 'CHATS_UPDATED',
  payload: chats,
});
export const saveMessages = obj => ({
  type: 'SAVE_MESSAGES',
  payload: obj,
});

export const setEmit = (event, ...args) => (dispatch, getState) => {
  const { client } = getState();
  const sock = client;
  sock.emit(event, ...args);
  dispatch(initSocketConnection(sock));
};

export const getChats = id => dispatch => {
  fetch(`http://localhost:8080/api/chatsList/userId${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(rooms => {
      dispatch(chatsUpdated(rooms));
    });
};

export const getUsers = () => dispatch => {
  fetch('http://localhost:8080/api/usersList', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(users => {
      dispatch(clientsUpdated(users));
    });
};

export const getChat = id => dispatch => {
  fetch(`http://localhost:8080/api/messages/id${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(messages => {
      dispatch(saveMessages({ messages, id }));
    });
};

export const postCreateChat = obj => dispatch => {
  fetch('http://localhost:8080/createChat', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log('Chat created!');
      dispatch(createChat(data));
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const postLogin = obj => dispatch => {
  fetch('http://localhost:8080/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch(reduxSignIn(data));
      localStorage.setItem('email', data.email);
      localStorage.setItem('id', data.id);
      localStorage.setItem('uniqueId', data.uniqueId);
      localStorage.setItem('avatar', data.avatar);
      history.push('/messanger');
    });
};
