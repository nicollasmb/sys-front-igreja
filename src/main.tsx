import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css"; // Import Tailwind CSS styles
import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
