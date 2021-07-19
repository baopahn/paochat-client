import React from "react";
import styled from "styled-components";
import { Text } from "./Layout/ElementCustom";
import Logo from "./Logo";

const PageLoaderWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  z-index: 100;
`;

const PageLoader = () => {
  return (
    <PageLoaderWrap>
      <Logo width={60} height={60} />
      <Text style={{ marginLeft: 20, fontSize: 28, fontWeight: 700 }}>
        PaoChat
      </Text>
    </PageLoaderWrap>
  );
};

export default PageLoader;
