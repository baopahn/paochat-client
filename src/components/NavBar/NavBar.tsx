import React from "react";
import styled from "styled-components";
import Setting from "./Setting";
import { Link } from "react-router-dom";
import Logo from "components/Logo";
import { Text } from "components/Layout/ElementCustom";

const NavbarWrap = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 20px;
`;

const LogoWrap = styled.div`
  height: 42px;
  width: 150px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 800;
  background-color: ${({ theme }) => theme.primary};
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;

const SettingWrap = styled.div``;

const NavBar = () => {
  return (
    <NavbarWrap>
      <Link to="/">
        <LogoWrap>
          <Logo width={20} height={20} />
          <Text style={{ marginLeft: 8, color: "#fff" }}>PaoChat</Text>
        </LogoWrap>
      </Link>
      <SettingWrap>
        <Setting />
      </SettingWrap>
    </NavbarWrap>
  );
};

export default NavBar;
