import { IconButton } from "components/Button/Button";
import React, { useState } from "react";
import styled from "styled-components";

const MenuWrap = styled.div`
  position: relative;
  margin: 0 5px;
`;

const MenuContainer = styled.div<{ isShow: boolean }>`
  position: absolute;
  right: 0;
  top: calc(100% + 5px);
  max-height: 600px;
  min-width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 8px ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};

  display: ${({ isShow }) => (isShow ? "block" : "none")};
`;

interface MenuProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ label, children }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClick = () => setIsShow((prev) => !prev);

  return (
    <MenuWrap>
      <IconButton onClick={handleClick}>{label}</IconButton>
      <MenuContainer isShow={isShow}>{children}</MenuContainer>
    </MenuWrap>
  );
};

export default Menu;
