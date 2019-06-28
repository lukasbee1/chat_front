const initialState = {
  client: null,
  activeChatId: null,
  user: {
    name: '',
    email: '',
    uniqueId: '',
    id: 99,
  },
  friends: [],
  blockedUsers: [],
  chats: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_CHAT':
      return {
        ...state,
        chats: [...this.state.chats, action.payload],
      };
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
            return obj;
          }
          return chat;
        }),
      };
    case 'SAVE_MESSAGES':
      return {
        ...state,
        chats: state.chats.map(chat => {
          if (chat.id === state.activeChatId) {
            const obj = chat;
            obj.messages = action.payload;
            return obj;
          }
          return chat;
        }),
      };
    case 'CLIENTS_UPDATED':
      return {
        ...state,
        chats: action.payload,
      };
    case 'INIT_SOCKET_CONNECTION':
      return {
        ...state,
        client: action.payload,
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
