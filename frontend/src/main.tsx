import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { InvitationProvider } from "./context/InvitationContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InvitationProvider>
      <Router />
    </InvitationProvider>
  </React.StrictMode>,
);
