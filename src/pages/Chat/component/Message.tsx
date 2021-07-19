import { Img } from "components/Layout/ElementCustom";
import React from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { Message as MessageType } from "state/types";
import styled from "styled-components";
import { checkUrl } from "utils/checkUrl";
import { getLinkViewImage } from "utils/getLink";

const Block = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 10px 5px;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

const SmallAvatar = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  overflow: hidden;
`;

const SmallSending = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid
    ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)"};
`;

const SmallSendSuccess = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 12px;
    height: 12px;
    fill: #fff;
  }
`;

const MessContentText = styled.div`
  flex: 1;
  border-radius: 18px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.secondary};
  color: #fff;
  line-height: 1.3333;
`;

const FriendMessContentText = styled(MessContentText)`
  margin-left: 6px;
`;

const MyMessContentText = styled(MessContentText)`
  margin-right: 6px;
`;

const BlockMyMess = styled(Block)`
  align-items: flex-end;
`;

const BlockFriendMess = styled(Block)`
  align-items: flex-start;
`;

const MessItem = styled.div`
  display: flex;
  margin: 1.1px 0;
  align-items: flex-end;
  max-width: 65%;
`;

const MyMess = styled(MessItem)`
  flex-direction: row-reverse;
  & > ${MyMessContentText} {
    border-radius: 18px 4px 4px 18px;
  }

  &:first-child > ${MyMessContentText} {
    border-radius: 18px 4px 18px 18px;
  }

  &:last-child > ${MyMessContentText} {
    border-radius: 18px 18px 4px 18px;
  }
`;

const FriendMess = styled(MessItem)`
  flex-direction: row;

  & > ${FriendMessContentText} {
    border-radius: 4px 18px 18px 4px;
  }

  &:first-child > ${FriendMessContentText} {
    border-radius: 4px 18px 18px 18px;
  }

  &:last-child > ${FriendMessContentText} {
    border-radius: 18px 18px 18px 4px;
  }

  & > ${Avatar} {
    & > img {
      display: none;
    }
  }

  &:first-child > ${Avatar} {
    & > img {
      display: block;
    }
  }
`;

const ImgCustom = styled(Img)`
  object-fit: contain;
  border-radius: 5px;
  max-width: 300px;
`;

interface MessageProps {
  isLatestSender?: boolean;
  isSender: boolean;
  avatar: string;
  listMess: MessageType[];
}

const MessageBlock: React.FC<MessageProps> = ({
  isLatestSender = false,
  isSender,
  avatar,
  listMess,
}) => {
  const isSingleMess = listMess.length === 1;
  const borderRadius = { borderRadius: isSingleMess ? "18px" : "" };
  const latestIndexRead = listMess.findIndex((mess) => mess.read === true);

  const [lastSeen, seen, send, unsend] = [
    <SmallAvatar>
      <Img src={avatar} />
    </SmallAvatar>,
    <SmallAvatar />,
    <SmallSendSuccess>
      <BiUpArrowAlt />
    </SmallSendSuccess>,
    <SmallSending />,
  ];

  const renderStatusMyMess = (index, read, sending) => {
    if (!isLatestSender) return seen;
    if (latestIndexRead === index) return lastSeen;
    if (read) return seen;
    if (sending) return unsend;
    return send;
  };

  const renderMessType = (message) => {
    if (message.type === "text") {
      const isUrl = checkUrl(message.message);
      return isUrl ? (
        <a
          href={message.message}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          {message.message}
        </a>
      ) : (
        message.message
      );
    }
    if (message.type === "image")
      return (
        <a
          href={getLinkViewImage(message.message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImgCustom src={message.message} />
        </a>
      );
  };

  const renderMess = isSender ? (
    <BlockMyMess>
      {listMess.map((mess, index) => (
        <MyMess key={`mymess-${index}`}>
          {renderStatusMyMess(index, mess.read, mess.sending)}

          <MyMessContentText
            style={{
              ...borderRadius,
              backgroundColor: mess.type === "image" ? "unset" : "",
              padding: mess.type === "image" ? "8px 0 0" : "",
            }}
          >
            {renderMessType(mess)}
          </MyMessContentText>
        </MyMess>
      ))}
    </BlockMyMess>
  ) : (
    <BlockFriendMess>
      {listMess.map((mess, index) => (
        <FriendMess key={`friendmess-${index}`}>
          <Avatar>
            <Img src={avatar} />
          </Avatar>

          <FriendMessContentText
            style={{
              ...borderRadius,
              backgroundColor: mess.type === "image" ? "unset" : "",
              padding: mess.type === "image" ? "8px 0 0" : "",
            }}
          >
            {renderMessType(mess)}
          </FriendMessContentText>
        </FriendMess>
      ))}
    </BlockFriendMess>
  );
  return renderMess;
};

export default MessageBlock;
