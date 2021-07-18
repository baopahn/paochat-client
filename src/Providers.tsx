import { AuthContextProvider } from "contexts/AuthProvider";
import { ModalProvider } from "contexts/ModalProvider";
import React from "react";
import { Provider } from "react-redux";
import store from "state";
import { ThemeContextProvider } from "./contexts/ThemeProvider";

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default Providers;
