import { Text } from "components/Layout/ElementCustom";
import { AuthContext } from "contexts/AuthProvider";
import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import GoogleLoginCustom from "./GoogleLogin";

const SignInWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const SignInContainer = styled.div`
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 0 30px ${({ theme }) => theme.border};
`;

const Label = styled(Text)`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SignIn = () => {
  const { login, token } = useContext(AuthContext);
  const history = useHistory();

  const handleSuccess = async ({ tokenId }) => {
    const success = await login(tokenId);
    if (success) history.push("/");
  };

  const handleRender = !token ? (
    <SignInWrap>
      <SignInContainer>
        <Label>Sign in</Label>
        <GoogleLoginCustom onSuccess={handleSuccess} />
      </SignInContainer>
    </SignInWrap>
  ) : (
    <Redirect to="/" />
  );

  return handleRender;
};

export default SignIn;
