import history from '../../history';

export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = text => ({
  type: 'SEND_MESSAGE',
  payload: text,
});

export const reduxSignIn = user => ({
  type: 'SIGN_IN',
  payload: user,
});
export const clientsUpdated = users => ({
  type: 'CLIENTS_UPDATED',
  payload: users,
});
export const saveMessages = messages => ({
  type: 'SAVE_MESSAGES',
  payload: messages,
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

export const setActiveChat = id => ({
  type: 'SET_ACTIVECHAT',
  payload: id,
});

export const getChat = id => dispatch => {
  fetch(`http://localhost:8080/api/messages/id${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      dispatch(saveMessages(data));
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
