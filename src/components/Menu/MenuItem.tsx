import React from "react";
import styled from "styled-components";

const MenuItemWrap = styled.div`
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => {
  return <MenuItemWrap onClick={onClick}>{children}</MenuItemWrap>;
};

export default MenuItem;
