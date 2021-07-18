import Button from "components/Button/Button";
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
import {
  fetchHistoryMess,
  fetchMoreHistoryMess,
  resetMess,
  sendMess,
  setFocus,
} from "state/chats";
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
  box-shadow: 0 -1px 4px ${({ theme }) => theme.border};
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
  const { listMess, friend, typing } = useChat();
  const refChatContainer = useRef(null);
  const refInputChat = useRef(null);
  const refLoadMore = useRef(null);
  const [mess, setMess] = useState<string>("");
  const [observerIsSet, setObserverIsSet] = useState<boolean>(false);

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
      setObserverIsSet(false);
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

  const lengthMess = listMess.length;
  useEffect(() => {
    if (lengthMess <= 0) return;
    if (observerIsSet) return;

    const showMoreMess = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        dispatch(fetchMoreHistoryMess());
      }
    };

    const loadMoreObserver = new IntersectionObserver(showMoreMess, {
      rootMargin: "0px",
      threshold: 1,
    });
    loadMoreObserver.observe(refLoadMore.current);
    setObserverIsSet(true);
  }, [observerIsSet, id, dispatch, lengthMess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMess("");
    dispatch(sendMess(mess));
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
        {listMess.length > 0 && <div ref={refLoadMore}></div>}
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

        <SendButton type="button">
          <BiImage size="25px" style={{ fill: "inherit" }} />
        </SendButton>
      </ChatType>
    </ChatWrap>
  );
};

export default Chat;
