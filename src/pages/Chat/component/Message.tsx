import { Img } from "components/Layout/ElementCustom";
import React from "react";
import styled from "styled-components";

const SmallAvatar = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  overflow: hidden;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

const MessContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 5px 0;
  padding: 12px 5px;
`;

const MyMessContainer = styled(MessContainer)`
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const FriendMessContainer = styled(MessContainer)`
  flex-direction: row;
  justify-content: flex-start;
`;

const MessWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
`;

const MyMessWrap = styled(MessWrap)`
  padding-right: 10px;
  align-items: flex-end;
`;

const FriendMessWrap = styled(MessWrap)`
  padding-left: 10px;
  align-items: flex-start;
`;

const Mess = styled.div`
  max-width: 60%;
  padding: 8px 12px;
  margin: 1.5px 0;
  word-break: break-word;
  background-color: ${({ theme }) => theme.secondary};
`;

const MyMess = styled(Mess)`
  border-radius: 18px 4px 4px 18px;

  &:first-child {
    border-radius: 18px 4px 18px 18px;
  }

  &:last-child {
    border-radius: 18px 18px 4px 18px;
  }
`;

const FriendMess = styled(Mess)`
  border-radius: 4px 18px 18px 4px;

  &:first-child {
    border-radius: 4px 18px 18px 18px;
  }

  &:last-child {
    border-radius: 18px 18px 18px 4px;
  }
`;

interface MessageProps {
  isSender: boolean;
  avatar: string;
  listMess: Array<string | React.ReactNode>;
}

const Message: React.FC<MessageProps> = ({ isSender, avatar, listMess }) => {
  const render = isSender ? (
    <MyMessContainer>
      <SmallAvatar>
        <Img src={avatar} />
      </SmallAvatar>
      <MyMessWrap>
        {listMess.map((m, index) => (
          <MyMess key={`mymess-${index}`}>{m}</MyMess>
        ))}
      </MyMessWrap>
    </MyMessContainer>
  ) : (
    <FriendMessContainer>
      <Avatar>
        <Img src={avatar} />
      </Avatar>
      <FriendMessWrap>
        {listMess.map((m, index) => (
          <FriendMess key={`friendmess-${index}`}>{m}</FriendMess>
        ))}
      </FriendMessWrap>
    </FriendMessContainer>
  );

  return render;
};

export default Message;
