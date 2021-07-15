import Button from "components/Button/Button";
import { Img, Text } from "components/Layout/ElementCustom";
import useGetChatRoom from "hooks/useGetChatRoom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import useProfile from "state/hooks/useProfile";
import { fetchProfile } from "state/profiles";
import styled from "styled-components";

const ProfileWrap = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.div`
  background-color: green;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
`;

const Info = styled.div`
  width: inherit;
  padding: 20px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 15px;
  margin: 30px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Label = styled(Text)`
  font-size: 20px;
  font-weight: 900px;
  margin-right: 50px;
`;

const Content = styled(Text)`
  font-size: 20px;
  font-weight: 900px;
`;

const ButtonChat = styled(Button)`
  padding: 10px 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 16px;
`;

const Profile = () => {
  const { user } = useProfile();
  const dispatch = useDispatch();
  const { params }: { params: { id: string } } = useRouteMatch();
  const { id: friendID } = params;

  const { startChat } = useGetChatRoom(friendID);

  useEffect(() => {
    dispatch(fetchProfile(friendID));
  }, [friendID, dispatch]);

  const render = user ? (
    <ProfileWrap>
      <ProfileContainer>
        <Avatar>
          <Img src={user.avatar} />
        </Avatar>

        <Info>
          <Row>
            <Label>ID:</Label>
            <Content>{user.fullName}</Content>
          </Row>

          <Row>
            <Label>Name:</Label>
            <Content>{user.fullName}</Content>
          </Row>

          <Row>
            <Label>Email:</Label>
            <Content>{user.email}</Content>
          </Row>
        </Info>

        <ButtonChat onClick={startChat}>Start chat</ButtonChat>
      </ProfileContainer>
    </ProfileWrap>
  ) : (
    <div>Not Found</div>
  );

  return render;
};

export default Profile;
