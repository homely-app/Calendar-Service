import React from "react";
import ReactDOM from "react-dom";
import Applet from "./components/Applet";
import Header from "./components/Header";

// Component level styling
import "./styles/main.css";

ReactDOM.render(<Applet />, document.getElementById("booking"));
ReactDOM.render(<Header />, document.getElementById("header"));
