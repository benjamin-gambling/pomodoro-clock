import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Title from "./Title";
import Clock from "./Clock";

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Clock />
  </React.StrictMode>,
  root
);
