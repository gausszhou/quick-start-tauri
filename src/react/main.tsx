import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

const container = document.getElementById("react-app") as HTMLDivElement;
const app = ReactDOM.createRoot(container);
app.render(<App />);
