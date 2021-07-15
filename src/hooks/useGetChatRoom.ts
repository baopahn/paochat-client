import { getChatRoom } from "api/feature";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "state";
import { appendChat } from "state/chats";

const useGetChatRoom = (friendID) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const startChat = async (): Promise<void> => {
    const roomChat = await getChatRoom(friendID);
    if (roomChat) {
      dispatch(appendChat(roomChat));
      history.push(`/${roomChat._id}`);
    }
  };

  return { startChat };
};

export default useGetChatRoom;
