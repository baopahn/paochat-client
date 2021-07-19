export interface UserInfo {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
}

export type Handler = () => void;
