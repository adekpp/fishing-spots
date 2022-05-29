import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Welcome } from "./pages/Welcome";
import {store} from './store'
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<App />} />
    </Routes>
  </BrowserRouter>
  </Provider>
);
