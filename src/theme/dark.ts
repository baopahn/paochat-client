import { ThemeType } from "./types";

export const dark: ThemeType = {
  isDark: true,
  primary: "hsl(206, 70%, 20%)",
  secondary: "hsl(206, 70%, 20%)",
  text: "#e4e6eb",
  // background: "#18191a",
  background: "hsl(210,35%,12%)",
  button: "rgba(255,255,255,0.3)",
  border: "rgba(255,255,255,0.1)",
  icon: "rgba(255,255,255,0.5)",
  card: "#fff",
  zIndexModal: 10,
  overlay: "rgba(0,0,0,0.3)",
  menu: "hsl(210,35%,12%)",
  modal: "hsl(210,35%,15%)",
};

export default dark;
