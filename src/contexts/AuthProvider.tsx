import { getInfo, signIn, signOut } from "api/feature";
import React, { useEffect, useState } from "react";
import socket from "socket";
import { UserInfo } from "./types";

export const TOKEN_CACHE_KEY = "ToKen";
export const REFRESH_TOKEN_CACHE_KEY = "ReFrEsHtOkEn";

const AuthContext = React.createContext({
  userInfo: null,
  token: null,
  refreshToken: null,
  login: async (token): Promise<boolean | void> => {},
  logout: async (): Promise<boolean | void> => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_CACHE_KEY) || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    () => localStorage.getItem(REFRESH_TOKEN_CACHE_KEY) || null
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    (async () => {
      if (token) {
        setUserInfo(await getInfo());
        socket.connect(token);
      }
    })();

    return () => {
      if (token) socket.disconnect();
    };
  }, [token]);

  const login = async (tokenID: string): Promise<boolean> => {
    const { token, refreshToken } = await signIn(tokenID);
    if (!token && !refreshToken) return false;

    localStorage.setItem(TOKEN_CACHE_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_CACHE_KEY, refreshToken);
    setToken(token);
    setRefreshToken(refreshToken);

    return true;
  };

  const logout = async (): Promise<boolean> => {
    const success = await signOut(refreshToken);
    if (!success) return false;

    localStorage.removeItem(TOKEN_CACHE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_CACHE_KEY);
    setToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    socket.disconnect();

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, token, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
