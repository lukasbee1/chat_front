const initialState = {
  client: null,
  activeId: null,
  user: {
    name: '',
    email: '',
    uniqueId: '',
    id: null,
    avatar: '',
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
        chatsList: [...state.chatsList, action.payload],
      };
    case 'SET_ACTIVE_ID':
      return {
        ...state,
        activeId: action.payload,
      };
    case 'SEND_MESSAGE':
      console.log(action.payload);
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.roomId]: [
            ...state.chats[action.payload.roomId],
            action.payload,
          ],
        },
      };
    case 'SAVE_MESSAGES': {
      if (action.payload[0]) {
        return {
          ...state,
          chats: {
            ...state.chats,
            [action.payload[0].roomId]: action.payload,
          },
        };
      }
      return { ...state };
    }
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
    case 'DELETE_USER':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
