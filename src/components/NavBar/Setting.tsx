import { Text } from "components/Layout/ElementCustom";
import Menu from "components/Menu/Menu";
import MenuItem from "components/Menu/MenuItem";
import { useAuth } from "contexts/AuthProvider";
import { ThemeContext } from "contexts/ThemeProvider";
import React, { useContext, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import styled from "styled-components";
import soundController from "utils/sound";

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
  const { userInfo, logout } = useAuth();

  const styleIcon = {
    backgroundColor: "unset",
    fill: "inherit",
    size: "15px",
  };

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const labelTheme = isDark ? "Light mode" : "Dark mode";

  const [isMute, setIsMute] = useState(() => soundController.getIsMute());
  const labelMute = isMute ? "Unmute" : "Mute";
  const toggleMute = () => {
    soundController.toggleMute();
    setIsMute(!isMute);
  };

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
          <Text>{labelTheme}</Text>
        </MenuItem>
        <MenuItem onClick={toggleMute}>
          <Text>{labelMute}</Text>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Text>Sign out</Text>
        </MenuItem>
      </Menu>
    </SettingWrap>
  );
};

export default Setting;
