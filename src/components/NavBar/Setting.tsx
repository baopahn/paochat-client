import { Text } from "components/Layout/ElementCustom";
import Menu from "components/Menu/Menu";
import MenuItem from "components/Menu/MenuItem";
import { AuthContext } from "contexts/AuthProvider";
import { ThemeContext } from "contexts/ThemeProvider";
import React, { useContext } from "react";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";

const SettingWrap = styled.div`
  display: flex;
  align-items: center;
  background-color: unset;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProfileName = styled(Text)`
  margin-left: 5px;
`;

const Setting = () => {
  const { userInfo, logout } = useContext(AuthContext);

  const styleIcon = {
    backgroundColor: "unset",
    fill: "inherit",
    size: "15px",
  };

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const label = isDark ? "Light mode" : "Dark mode";

  return (
    <SettingWrap>
      <Profile>
        <Avatar>
          <AvatarImg src={userInfo.avatar} alt="user avatar" />
        </Avatar>
        <ProfileName>{userInfo.fullName}</ProfileName>
      </Profile>

      <Menu label={<BiChevronDown style={styleIcon} />}>
        <MenuItem onClick={toggleTheme}>
          <Text>{label}</Text>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Text>Sign out</Text>
        </MenuItem>
      </Menu>
    </SettingWrap>
  );
};

export default Setting;
