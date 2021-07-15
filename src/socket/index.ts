import { BASE_URL_API } from "config";
import { io } from "socket.io-client";
import { dispatch } from "state";
import { appendMess, setLastMessageAsync, setTyping } from "state/chats";
import { RECEIVE_MESS, RECEIVE_TYPING, SEND_MESS, SEND_TYPING } from "./events";

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
      dispatch(appendMess(mess));
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
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  sendMess(room, receiver, message) {
    this.socket.emit(SEND_MESS, { room, receiver, message });
  }

  typing(room, receiver, status) {
    this.socket.emit(SEND_TYPING, { room, receiver, status });
  }
};

const socket = new SocketClient();

export default socket;
