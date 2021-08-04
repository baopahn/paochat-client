import { Text } from "components/Layout/ElementCustom";
import Logo from "components/Logo";
import { useAuth } from "contexts/AuthProvider";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import GoogleLoginCustom from "./GoogleLogin";

const SignInWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const SignInContainer = styled.div`
  min-width: 400px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 0 30px ${({ theme }) => theme.border};
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SignIn = () => {
  const { login, token } = useAuth();
  const history = useHistory();

  const handleSuccess = async ({ tokenId }) => {
    const success = await login(tokenId);
    if (success) history.push("/");
  };

  const handleRender = !token ? (
    <SignInWrap>
      <SignInContainer>
        <Head>
          <LogoWrap>
            <Logo width={25} height={25} />
            <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 600 }}>
              PaoChat
            </Text>
          </LogoWrap>

          <Text style={{ fontSize: 20 }}>Sign in</Text>
        </Head>
        <GoogleLoginCustom onSuccess={handleSuccess} />
      </SignInContainer>
    </SignInWrap>
  ) : (
    <Redirect to="/" />
  );

  return handleRender;
};

export default SignIn;
