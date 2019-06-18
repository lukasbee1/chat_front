export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = text => ({
  type: 'SEND_MESSAGE',
  payload: text,
});

export const setActiveChat = id => ({
  type: 'SET_ACTIVECHAT',
  payload: id,
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
