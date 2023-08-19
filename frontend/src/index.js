import App from "./App";
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
  </React.StrictMode>
);
