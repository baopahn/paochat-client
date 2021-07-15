import { UserInfo } from "contexts/types";
import React from "react";

export interface Message {
  message: string[];
  isSender: boolean;
  createdAt: string;
}

export interface HistoryChat {
  _id: string;
  avatar: string;
  fullName: string;
  lastMessage: string;
  updatedAt: string;
}

export interface Chat {
  historyChat: HistoryChat[];
  current: string;
  typing: boolean;
  friend: UserInfo;
  listMess: Message[];
}

export interface Profile {
  user: UserInfo;
}

export interface Searchs {
  isSearch: boolean;
  result: UserInfo[];
}

export interface State {
  chat: Chat;
  profile: Profile;
  search: Searchs;
}
