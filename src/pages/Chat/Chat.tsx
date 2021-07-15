import Button from "components/Button/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { useRouteMatch } from "react-router-dom";
import socket from "socket";
import { useAppDispatch } from "state";
import { fetchHistoryMess, setFriend, setHistoryMessage } from "state/chats";
import useChat from "state/hooks/useChat";
import { setIsSearch } from "state/searchs";
import styled from "styled-components";
import Head from "./component/Head";
import Message from "./component/Message";
import TypingMess from "./component/TypingMess";

const ChatWrap = styled.div`
  margin-top: 2px;
  height: inherit;
`;

const ChatContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 180px);
  margin-bottom: 2px;
  display: flex;
  flex-direction: column-reverse;
`;

const ChatType = styled.form`
  height: 60px;
  box-shadow: 0 -2px 5px ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const ChatInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const SendButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  background-color: unset;
  fill: ${({ theme }) => theme.icon};
`;

const Chat = () => {
  const dispatch = useAppDispatch();
  const { params }: { params: { id: string } } = useRouteMatch();
  const { id } = params;
  const { listMess, friend, current, typing } = useChat();
  const refChatContainer = useRef(null);

  const [mess, setMess] = useState<string>("");

  useEffect(() => {
    dispatch(fetchHistoryMess(id));
    dispatch(setIsSearch(false));

    return () => {
      dispatch(setHistoryMessage([]));
      dispatch(setFriend(null));
    };
  }, [id, dispatch]);

  const renderMess = useMemo(() => {
    return listMess.map((mess, index) => {
      if (!friend) return <></>;

      return (
        <Message
          key={`mess-${index}`}
          avatar={friend.avatar}
          listMess={mess.message}
          isSender={mess.isSender}
        />
      );
    });
  }, [listMess, friend]);

  const renderTyping = useMemo(() => {
    return typing && friend ? (
      <Message
        key={`mess-typing`}
        avatar={friend.avatar}
        listMess={[<TypingMess />]}
        isSender={false}
      />
    ) : (
      <></>
    );
  }, [friend, typing]);

  useEffect(() => {
    if (!friend) return;

    if (mess) {
      socket.typing(id, friend._id, true);
    } else {
      socket.typing(id, friend._id, false);
    }
  }, [mess, friend, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.sendMess(current, friend._id, mess);
    setMess("");
  };

  return (
    <ChatWrap>
      <Head />
      <ChatContainer id="chat-container" ref={refChatContainer}>
        {renderTyping}
        {renderMess}
      </ChatContainer>
      <ChatType onSubmit={handleSubmit}>
        <ChatInput
          value={mess}
          placeholder="Aa"
          onChange={({ target }) => setMess(target.value)}
        />
        <SendButton>
          <BiSend size="25px" style={{ fill: "inherit" }} />
        </SendButton>
      </ChatType>
    </ChatWrap>
  );
};

export default Chat;
