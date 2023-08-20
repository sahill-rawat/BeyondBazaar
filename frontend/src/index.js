import App from "./App";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";
import ColorModeSwitcher from './ColorModeSwitcher';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <ChakraProvider theme={theme}>
        <ColorModeSwitcher/>
        <ColorModeScript />
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
);
