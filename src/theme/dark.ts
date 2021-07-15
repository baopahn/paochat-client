import { ThemeType } from "./types";

export const dark: ThemeType = {
  isDark: true,
  primary: "hsl(var(--hue-dark-color), 96%, 54%)",
  secondary: "hsl(var(--hue-dark-color), 96%, 69%)",
  text: "#e4e6eb",
  background: "#18191a",
  button: "rgba(255,255,255,0.3)",
  border: "rgba(255,255,255,0.1)",
  icon: "rgba(255,255,255,0.5)",
};

export default dark;
