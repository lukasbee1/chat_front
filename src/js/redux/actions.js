import history from '../../history';

export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  payload: message,
});

export const reduxSignIn = user => ({
  type: 'SIGN_IN',
  payload: user,
});
export const clientsUpdated = users => ({
  type: 'CLIENTS_UPDATED',
  payload: users,
});
export const saveMessages = obj => ({
  type: 'SAVE_MESSAGES',
  payload: obj,
});

export const getUsers = () => dispatch => {
  fetch('http://localhost:8080/api/clientsList', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(rooms => {
      dispatch(clientsUpdated(rooms));
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
      history.push('/messanger');
    });
};
