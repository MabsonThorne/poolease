// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import TableProvider from "./contexts/TableProvider"; // 导入 TableProvider
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <TableProvider> {/* 包裹 App 组件 */}
      <App />
    </TableProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
