import NavBar from "components/NavBar/NavBar";
import Panel from "components/Panel/Panel";
import React from "react";
import styled from "styled-components";

const ControlPanelWrap = styled.div`
  background-color: ${({ theme }) => theme.background};
`;

const Nav = styled.nav`
  width: 100%;
  height: 64px;
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`;

const SideBar = styled.div`
  height: inherit;
  min-width: 350px;
  max-width: 350px;
  border-right: 1px solid ${({ theme }) => theme.border};
`;

const Inner = styled.div`
  width: 100%;
  height: inherit;
  overflow: hidden;
`;

interface ControlPanelProps {
  children: React.ReactNode;
}
const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  return (
    <ControlPanelWrap>
      <Nav>
        <NavBar />
      </Nav>
      <Container>
        <SideBar>
          <Panel />
        </SideBar>
        <Inner>{children}</Inner>
      </Container>
    </ControlPanelWrap>
  );
};

export default ControlPanel;
