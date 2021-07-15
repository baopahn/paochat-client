import { Img, Text } from "components/Layout/ElementCustom";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useChat from "state/hooks/useChat";
import useSearch from "state/hooks/useSearch";
import styled from "styled-components";
import { displayHour } from "utils/displayTime";

const HistoryChatWrap = styled.div<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isShow }) => (!isShow ? "0" : "-100%")};
  padding: 10px;
  margin-top: 2px;
  width: 100%;
  height: inherit;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s;
`;

const ChatItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-radius: 10px;
  transition: all 0.1s;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background-color: ${({ active, theme }) => (active ? theme.border : "")};

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const ChatAvatar = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

const ChatInfo = styled.div`
  overflow: hidden;
  flex: 1;
  margin-left: 10px;
`;

const ChatName = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  font-weight: 600;
`;

const LastMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Message = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
`;

const Time = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 10px;
  width: fit-content;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const HistoryChat = () => {
  const { isSearch } = useSearch();
  const { current, historyChat } = useChat();

  const renderMess = useMemo(() => {
    return historyChat.map((chat) => (
      <Link to={`/${chat._id}`} key={chat._id}>
        <ChatItem active={current === chat._id}>
          <ChatAvatar>
            <Img src={chat.avatar} />
          </ChatAvatar>
          <ChatInfo>
            <ChatName>{chat.fullName}</ChatName>
            <LastMessage>
              <Message>{chat.lastMessage}</Message>
              <Time>{displayHour(chat.updatedAt)}</Time>
            </LastMessage>
          </ChatInfo>
        </ChatItem>
      </Link>
    ));
  }, [historyChat, current]);

  return <HistoryChatWrap isShow={isSearch}>{renderMess}</HistoryChatWrap>;
};

export default HistoryChat;
