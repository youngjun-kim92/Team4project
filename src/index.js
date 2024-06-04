import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MapProvider from "./components/MapContext";
import "../src/css/reset.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MapProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MapProvider>
);
