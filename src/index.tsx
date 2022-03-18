import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
const autoSpeaking = localStorage.getItem("autoSpeaking");
if (autoSpeaking === "off") {
  localStorage.setItem("autoSpeaking", "off");
} else {
  localStorage.setItem("autoSpeaking", "on");
}
ReactDOM.render(<AppWithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
