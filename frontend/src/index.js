import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TaskContextProvider } from "./context/TaskContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>
);
