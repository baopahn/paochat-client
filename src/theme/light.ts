import { ThemeType } from "./types";

// primary: "hsl(15, 96%, 54%)",
// secondary: "hsl(15, 96%, 60%)",

export const light: ThemeType = {
  isDark: false,
  primary: "hsl(206, 70%, 30%)",
  secondary: "hsl(206, 70%, 30%)",
  text: "hsl(206, 70%, 10%)",
  // background: "#f8f8f8",
  // background: "hsl(210,100%,96%,0.25)",
  background: "#ebf5ff40",
  button: "rgba(0,0,0,0.1)",
  border: "rgba(0,0,0,0.05)",
  icon: "hsl(206, 70%, 30%)",
  card: "#f8f8f8",
  zIndexModal: 10,
  overlay: "rgba(0,0,0,0.2)",
  menu: "#fff",
  modal: "#fff",
};

export default light;
