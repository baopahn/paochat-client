import Button from "components/Button/Button";
import { Img, Text } from "components/Layout/ElementCustom";
import React from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import useChat from "state/hooks/useChat";
import styled from "styled-components";
import { FiVideo } from "react-icons/fi";

const HeadWrap = styled.div`
  height: 50px;
  box-shadow: 0 1px 5px ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
`;

const Name = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;

const CustomButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  width: 30px;
  height: 30px;
  color: #fff;
  font-weight: 600;
  border-radius: 50%;
  margin: 0 5px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
`;
const Head = () => {
  const { friend } = useChat();

  const render = useMemo(() => {
    return friend ? (
      <>
        <Info>
          <Avatar>
            <Img src={friend.avatar} />
          </Avatar>
          <Name>{friend.fullName}</Name>
        </Info>

        <Control>
          <CustomButton>
            <FiVideo />
          </CustomButton>
          <Link to={`/profile/${friend._id}`}>
            <CustomButton>i</CustomButton>
          </Link>
        </Control>
      </>
    ) : (
      <></>
    );
  }, [friend]);

  return <HeadWrap>{render}</HeadWrap>;
};

export default Head;
