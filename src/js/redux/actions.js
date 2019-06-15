//  import io from 'socket.io-client';

// export const initSocketConnection = () => ({
//   type: 'INIT_SOCKET_CONNECTION',
//   payload: io('http://localhost:8080'),
// });

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
