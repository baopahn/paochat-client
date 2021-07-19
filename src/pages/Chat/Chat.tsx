import { useModal } from "contexts/ModalProvider";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiImage, BiSend } from "react-icons/bi";
import { useRouteMatch } from "react-router-dom";
import socket from "socket";
import { useAppDispatch } from "state";
import { fetchHistoryMess, resetMess, sendMess, setFocus } from "state/chats";
import useChat from "state/hooks/useChat";
import { setIsSearch } from "state/searchs";
import Head from "./component/Head";
import Message from "./component/Message";
import TypingMess from "./component/TypingMess";
import {
  ChatContainer,
  ChatInput,
  ChatType,
  ChatWrap,
  SendButton,
} from "./styles";
import UploadModal from "./UploadModal";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { params }: { params: { id: string } } = useRouteMatch();
  const { id } = params;
  const { listMess, friend, typing } = useChat();
  const refChatContainer = useRef(null);
  const refInputChat = useRef(null);
  const [mess, setMess] = useState<string>("");
  const [onClickUpload] = useModal(<UploadModal />);

  const handleClickOutside = useCallback(
    (event) => {
      if (refInputChat && !refInputChat.current.contains(event.target)) {
        dispatch(setFocus(false));
      }
    },
    [refInputChat, dispatch]
  );

  useEffect(() => {
    dispatch(setIsSearch(false));
    dispatch(fetchHistoryMess(id));
    return () => {
      dispatch(resetMess());
    };
  }, [id, dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!friend) return;
    socket.typing(id, friend._id, !!mess);
  }, [mess, friend, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMess("");
    dispatch(sendMess({ message: mess, type: "text" }));
  };

  const renderTyping = useMemo(() => {
    return typing && friend ? (
      <Message
        key={`mess-typing`}
        avatar={friend.avatar}
        listMess={[{ type: "text", message: <TypingMess /> }]}
        isSender={false}
      />
    ) : (
      <></>
    );
  }, [friend, typing]);

  const renderMess = useMemo(() => {
    return listMess.map((mess, index) => {
      if (!friend) return <></>;

      return (
        <Message
          isLatestSender={index <= 1 && mess.isSender === true}
          key={`mess-${index}`}
          avatar={friend.avatar}
          listMess={mess.message}
          isSender={mess.isSender}
        />
      );
    });
  }, [listMess, friend]);

  return (
    <ChatWrap>
      <Head />
      <ChatContainer id="chat-container" ref={refChatContainer}>
        {renderTyping}
        {renderMess}
      </ChatContainer>
      <ChatType onSubmit={handleSubmit}>
        <ChatInput
          onFocus={() => dispatch(setFocus(true))}
          ref={refInputChat}
          value={mess}
          placeholder="Aa"
          onChange={({ target }) => setMess(target.value)}
        />
        <SendButton>
          <BiSend size="25px" style={{ fill: "inherit" }} />
        </SendButton>

        <SendButton type="button" onClick={onClickUpload}>
          <BiImage size="25px" style={{ fill: "inherit" }} />
        </SendButton>
      </ChatType>
    </ChatWrap>
  );
};

export default Chat;
