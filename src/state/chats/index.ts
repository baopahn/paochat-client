import { createSlice } from "@reduxjs/toolkit";
import { getHistoryChat, getHistoryMessage } from "api/feature";
import { Chat } from "state/types";

const sortCB = (c1, c2) => {
  const date1 = new Date(c1.updatedAt);
  const date2 = new Date(c2.updatedAt);
  return date1 < date2 ? 1 : -1;
};

const initialState: Chat = {
  current: "",
  typing: false,
  listMess: [],
  friend: null,
  historyChat: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setHistoryMessage: (state, action) => {
      state.listMess = action.payload;
    },
    setFriend: (state, action) => {
      state.friend = action.payload;
    },
    setTyping: (state, action) => {
      if (state.current !== action.payload.room) return;
      state.typing = action.payload.status;
    },

    appendMess: (state, action) => {
      const mess = action.payload;
      if (mess.room !== state.current) return;

      const { listMess } = state;
      if (listMess.length === 0 || listMess[0].isSender !== mess.isSender) {
        listMess.unshift({ ...mess, message: [mess.message] });
      } else {
        listMess[0].message.unshift(mess.message);
        listMess[0].createdAt = mess.createdAt;
      }
    },

    setHistoryChat: (state, action) => {
      const historyChat = action.payload;
      historyChat.sort(sortCB);
      state.historyChat = historyChat;
    },

    appendChat: (state, action) => {
      const { historyChat } = state;
      const { _id } = action.payload;
      const indexChat = historyChat.findIndex((chat) => chat._id === _id);

      if (indexChat > -1) state.historyChat.splice(indexChat, 1);
      state.historyChat.unshift(action.payload);
    },

    setLastMessage: (state, action) => {
      const { historyChat } = state;
      const { room, message, createdAt } = action.payload;

      const chat = historyChat.find((chat) => chat._id === room);
      chat.lastMessage = message;
      chat.updatedAt = createdAt;

      historyChat.sort(sortCB);
      state.historyChat = historyChat;
    },
  },
});

export const {
  setCurrent,
  setHistoryMessage,
  setFriend,
  setTyping,
  appendMess,
  setHistoryChat,
  appendChat,
  setLastMessage,
} = chatSlice.actions;

export const fetchHistoryMess = (id) => async (dispatch, getState) => {
  dispatch(setCurrent(id));
  const { listMess, friend } = await getHistoryMessage(id);
  dispatch(setFriend(friend));
  dispatch(setHistoryMessage(listMess));
};

export const fetchHistoryChat = () => async (dispatch, getState) => {
  const historyChat = await getHistoryChat();
  dispatch(setHistoryChat(historyChat));
};

export const setLastMessageAsync = (mess) => async (dispatch, getState) => {
  const { chat } = getState();
  const chatItem = chat.historyChat.find((c) => c._id === mess._id);
  if (chatItem) {
    dispatch(setLastMessage(mess));
  } else {
    dispatch(fetchHistoryChat());
  }
};

export default chatSlice.reducer;
