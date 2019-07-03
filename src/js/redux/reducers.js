import av from '../../img/download.jpeg';

const initialState = {
  client: null,
  // activeChatId: null,
  user: {
    name: '',
    email: '',
    uniqueId: '',
    id: null,
    avatar: av,
  },
  friends: [],
  blockedUsers: [],
  // chats: [],
  chats: {},
  chatsList: [],
  usersList: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_CHAT':
      return {
        ...state,
        chats: [...this.state.chats, action.payload],
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: [
            ...state.chats[action.payload.id],
            action.payload,
          ],
        },
      };
    case 'SAVE_MESSAGES':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: action.payload.messages,
        },
      };
    case 'CLIENTS_UPDATED':
      return {
        ...state,
        usersList: action.payload,
      };
    case 'CHATS_UPDATED':
      return {
        ...state,
        chatsList: action.payload,
      };
    case 'INIT_SOCKET_CONNECTION':
      return {
        ...state,
        client: action.payload,
      };
    case 'SIGN_IN': {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
}
