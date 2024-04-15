import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { FormNoiva } from "./FormNoiva";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormNoivo } from "./FormNoivo";
import { FormCasal } from "./FormCasal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/formularioCursoDeNoivos/Noivo",
    element: <FormNoivo></FormNoivo>,
  },
  {
    path: "/formularioCursoDeNoivos/Noiva",
    element: <FormNoiva></FormNoiva>,
  },
  {
    path: "/formularioCursoDeNoivos/Casal",
    element: <FormCasal></FormCasal>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
