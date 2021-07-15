import { ThemeType } from "./types";

export const light: ThemeType = {
  isDark: false,
  primary: "hsl(var(--hue-light-color), 96%, 54%)",
  secondary: "hsl(var(--hue-light-color), 96%, 69%)",
  text: "#050505",
  background: "#fff",
  button: "rgba(0,0,0,0.1)",
  border: "rgba(0,0,0,0.05)",
  icon: "rgba(0,0,0,0.5)",
};

export default light;
