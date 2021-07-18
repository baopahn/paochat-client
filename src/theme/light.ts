import { ThemeType } from "./types";

// primary: "hsl(15, 96%, 54%)",
// secondary: "hsl(15, 96%, 60%)",

export const light: ThemeType = {
  isDark: false,
  primary: "hsl(206, 70%, 30%)",
  secondary: "hsl(206, 70%, 30%)",
  text: "#050505",
  // background: "#f8f8f8",
  background: "hsl(210,100%,96%,0.25)",
  button: "rgba(0,0,0,0.1)",
  border: "rgba(0,0,0,0.05)",
  icon: "rgba(0,0,0,0.5)",
  card: "#f8f8f8",
  zIndexModal: 10,
  overlay: "rgba(0,0,0,0.2)",
  menu: "#fff",
};

export default light;
