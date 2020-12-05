import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/store";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
