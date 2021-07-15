import { useSelector } from "react-redux";
import { State } from "state/types";

const useChat = () => {
  const chat = useSelector((state: State) => state.chat);
  return chat;
};

export default useChat;
