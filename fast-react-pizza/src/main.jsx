import React from "react";
import App from "./app.jsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./core/store.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
