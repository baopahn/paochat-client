import { BASE_URL_API } from "config";
import { io } from "socket.io-client";
import { dispatch } from "state";
import {
  appendMess,
  setLastMessageAsync,
  setTyping,
  updateStatusReadMess,
  updateStatusSendMess,
} from "state/chats";
import soundController from "utils/sound";
import {
  RECEIVE_MESS,
  RECEIVE_READ_ALL_MESS,
  RECEIVE_TYPING,
  SEND_MESS,
  SEND_READ_ALL_MESS,
  SEND_TYPING,
} from "./events";

const getChatContainer = () => document.querySelector("#chat-container");

const SocketClient = class {
  private socket = null;

  connect(token: string): void {
    this.socket = io(BASE_URL_API);

    this.socket.on("connect", () =>
      this.socket.emit("authenticate", { token })
    );
    this.socket.on("unauthenticated", () => {});
    this.socket.on("authenticated", () => {});

    this.socket.on(RECEIVE_MESS, (mess) => {
      if (mess.isSender) {
        dispatch(updateStatusSendMess(mess));
        soundController.playSound("sendsuccess");
      } else {
        dispatch(appendMess(mess));
        soundController.playSound("newmessage");
      }
      dispatch(setLastMessageAsync(mess));
      const chatContainer = getChatContainer();
      if (chatContainer)
        chatContainer.scroll({
          top: 0,
          behavior: "smooth",
        });
    });

    this.socket.on(RECEIVE_TYPING, ({ room, status }) => {
      dispatch(setTyping({ room, status }));
    });

    this.socket.on(RECEIVE_READ_ALL_MESS, ({ room }) => {
      dispatch(updateStatusReadMess({ room }));
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  sendMess(room, receiver, message, idLocal) {
    this.socket.emit(SEND_MESS, { room, receiver, message, idLocal });
    soundController.playSound("sending");
  }

  typing(room, receiver, status) {
    this.socket.emit(SEND_TYPING, { room, receiver, status });
  }

  readAllMess(room, receiver) {
    this.socket.emit(SEND_READ_ALL_MESS, { room, receiver });
  }

  call(room, signal, receiver) {}
};

const socket = new SocketClient();

export default socket;
