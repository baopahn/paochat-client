import { clientID } from "config";
import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Text } from "components/Layout/ElementCustom";

interface GGLoginProps {
  onSuccess: (e) => void;
  onFailure?: () => void;
}

const ButtonGoogle = styled.button`
  outline: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  background-color: unset;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled(Text)`
  margin-left: 10px;
`;

const GoogleLoginCustom: React.FC<GGLoginProps> = ({
  onSuccess,
  onFailure = (e) => {
    console.error(e);
  },
}) => {
  return (
    <GoogleLogin
      clientId={clientID}
      render={(renderProps) => (
        <ButtonGoogle
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FcGoogle size="20px" />
          <Label>Sign in with Google</Label>
        </ButtonGoogle>
      )}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginCustom;
