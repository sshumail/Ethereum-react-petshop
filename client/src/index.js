import React from "react";
import ReactDOM from "react-dom";
import { DrizzleProvider } from "@drizzle/react-plugin";
import drizzleOptions from "./drizzleOptions";
import App from './app/index.js';


ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <App />
  </DrizzleProvider>,
  document.getElementById("root")
);