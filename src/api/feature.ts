import axiosClient from "api";
import axios from "axios";
import { BASE_URL_API } from "config";
import { TOKEN_CACHE_KEY } from "contexts/AuthProvider";
import {
  GET_INFO,
  GET_ROOM,
  GET_HISTORY_CHAT,
  GET_HISTORY_MESS,
  GET_SEARCH,
  POST_SIGN_IN,
  POST_SIGN_OUT,
  POST_UPLOAD_FILE,
} from "./url";

const utilTry = async (execute, tag) => {
  try {
    return await execute;
  } catch (e) {
    console.log(`[${tag}_FAIL]: ${e.message}`);
    return { status: -1, message: "", data: {} };
  }
};

const getData = (response) => {
  const { data } = response;
  return data;
};

const getStatus = (response) => {
  const { status } = response;
  return status;
};

/////////////////////////////////////////////////////////

export const signIn = async (tokenID) => {
  const response = await utilTry(
    axiosClient.post(POST_SIGN_IN, { tokenID }),
    "SIGN_IN"
  );
  const { token, refreshToken } = getData(response);
  return { token, refreshToken };
};

export const signOut = async (refreshToken) => {
  const response = await utilTry(
    axiosClient.post(POST_SIGN_OUT, { refreshToken }),
    "SIGN_OUT"
  );

  const status = getStatus(response);
  return status === 1;
};

export const getInfo = async () => {
  const response = await utilTry(axiosClient.get(GET_INFO), "GET_INFO");
  const { user } = getData(response);
  return user;
};

export const getInfoById = async (id) => {
  const url = `${GET_INFO}/${id}`;
  const response = await utilTry(axiosClient.get(url), "GET_INFO_BY_ID");
  const { user } = getData(response);
  return user;
};

export const getInfoByKeyWord = async (key) => {
  const url = GET_SEARCH.replace("KEY_WORD", key);
  const response = await utilTry(axiosClient.get(url), "SEARCH_WITH_KEY");
  const { listUser } = getData(response);
  return listUser;
};

export const getHistoryChat = async () => {
  const response = await utilTry(
    axiosClient.get(GET_HISTORY_CHAT),
    "GET_LIST_CHAT"
  );
  const { historyChat } = getData(response);
  return historyChat;
};

export const getHistoryMessage = async (id, page = 1) => {
  const url = GET_HISTORY_MESS.replace("ID", id).replace(
    "PAGE_NUMBER",
    page.toString()
  );
  const response = await utilTry(axiosClient.get(url), "GET_LIST_MESS");
  const data = getData(response);
  return data;
};

export const getChatRoom = async (friendID) => {
  const url = GET_ROOM.replace("FRIEND_ID", friendID);
  const response = await utilTry(axiosClient.get(url), "GET_CHAT_ROOM");
  const { roomChat } = getData(response);
  return roomChat;
};

export const uploadFile = async (file: File): Promise<string | null> => {
  const form = new FormData();
  form.append("file", file);

  const response = await utilTry(
    axios({
      baseURL: BASE_URL_API,
      method: "post",
      url: POST_UPLOAD_FILE,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem(TOKEN_CACHE_KEY)}`,
      },
    }),
    "POST_UPLOAD_FILE"
  );

  if (!response) return null;
  const { webContentLink } = getData(response.data);
  return webContentLink;
};
