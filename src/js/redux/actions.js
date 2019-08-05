import io from 'socket.io-client';

export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = obj => ({
  type: 'SEND_MESSAGE',
  payload: obj,
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
export const addChatAction = chat => ({
  type: 'ADD_CHAT',
  payload: chat,
});
export const saveMessages = obj => ({
  type: 'SAVE_MESSAGES',
  payload: obj,
});
export const setActiveId = id => ({
  type: 'SET_ACTIVE_ID',
  payload: id,
});
export const createChat = chat => ({
  type: 'CREATE_CHAT',
  payload: chat,
});
export const logOutAction = () => ({
  type: 'DELETE_USER',
});
export const closeSocket = () => (dispatch, getState) => {
  getState().client.disconnect();
  return dispatch(initSocketConnection(null));
};
export const createSocket = uniqueId => dispatch => {
  const client = io(`http://localhost:8080`);
  client.on('connect', () => {
    console.log('client connected, listening...');
    client.emit('uniqueId', uniqueId);
    // dispatch(createChat({ id: 1, name: 'common', avatar: 'img/group.png' }));
  });
  client.on('clientsUpdated', usersInfo => {
    console.log('clients updated');
    dispatch(clientsUpdated(usersInfo));
  });
  client.on('chatsUpdated', chatsInfo => {
    console.log('chats updated');
    dispatch(chatsUpdated(chatsInfo));
  });
  // client.on('reply', (data, sender, roomId) => {
  //   dispatch(sendMessage({ tweet: data, id: roomId, Sender: sender }));
  // });
  client.on('reply', obj => {
    // console.log(obj);
    dispatch(sendMessage(obj));
  });
  client.on('disconnect', () => {
    console.log('Client socket disconnect. ');
    dispatch(logOutAction());
  });
  client.on('error', err => {
    console.error(JSON.stringify(err));
  });
  client.on('chatInvite', chat => {
    console.log('New chat!');
    dispatch(createChat(chat));
  });
  return dispatch(initSocketConnection(client));
};

export const logOut = () => dispatch => {
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('uniqueId');
  localStorage.removeItem('avatar');
  dispatch(closeSocket());
};

export const setEmit = (event, ...args) => (dispatch, getState) => {
  const { client } = getState();
  const sock = client;
  sock.emit(event, ...args);
  return dispatch(initSocketConnection(sock));
};
