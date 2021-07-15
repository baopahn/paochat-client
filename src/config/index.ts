export { clientID, clientSecret } from "./constants/google";
const devEnv = process.env.NODE_ENV === "development";

export const BASE_URL = devEnv
  ? "http://localhost:3001"
  : process.env.REACT_APP_BASE_URL;

export const BASE_URL_API = devEnv
  ? "http://localhost:3000"
  : process.env.REACT_APP_BASE_URL_API;
