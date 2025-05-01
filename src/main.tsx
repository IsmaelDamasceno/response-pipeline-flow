import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./routes/app/App";
import { Index } from "./routes/index";
import AsyncConfirmRoot from "./components/async-confirm-root";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AsyncConfirmRoot />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
