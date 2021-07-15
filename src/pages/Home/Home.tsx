import Chat from "pages/Chat/Chat";
import Profile from "pages/Profile";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";

const HomeWrap = styled.div`
  background-color: ${({ theme }) => theme.background};
`;

const Home = () => {
  return (
    <HomeWrap>
      <Route path="/profile/:id">
        <Profile />
      </Route>

      <Route exact path="/:id">
        <Chat />
      </Route>

      <Route exact path="/">
        <Redirect to="/" />
      </Route>
    </HomeWrap>
  );
};

export default Home;
