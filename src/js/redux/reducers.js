const initialState = {
  socket: null,
  activeChatId: null,
  user: {
    name: 'undefined',
    email: '',
    id: '',
  },
  friends: [],
  blockedUsers: [],
  chats: [
    {
      name: 'user1',
      id: '1',
      messages: ['asdasd', 'asdasccz'],
    },
    {
      name: 'user2',
      id: '2',
      messages: [
        'second',
        'sec',
        'one',
        'large large large large large large',
        'large',
      ],
    },
    {
      name: 'user3',
      id: '3',
      messages: ['third', 'third'],
    },
  ],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVECHAT':
      return {
        ...state,
        activeChatId: action.payload,
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat => {
          if (chat.id === state.activeChatId) {
            const obj = chat;
            obj.messages = [...chat.messages, action.payload];
            return chat;
          }
          return chat;
        }),
      };

    case 'INIT_SOCKET_CONNECTION':
      return {
        ...state,
        socket: action.payload,
      };
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
