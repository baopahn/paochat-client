import React from "react";
import { useEffect } from "react";
import { useAppDispatch } from "state";
import { fetchHistoryChat } from "state/chats";
import styled from "styled-components";
import HistoryMess from "./HistoryChat";
import ResultSearch from "./ResultSearch";
import Search from "./Search";

const PanelWrap = styled.div`
  height: inherit;
  overflow: hidden;
`;

const PanelContainer = styled.div`
  height: calc(100vh - 168px);
  position: relative;
`;

const Panel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistoryChat());
  }, [dispatch]);

  return (
    <PanelWrap>
      <Search />
      <PanelContainer>
        <HistoryMess />
        <ResultSearch />
      </PanelContainer>
    </PanelWrap>
  );
};

export default Panel;
