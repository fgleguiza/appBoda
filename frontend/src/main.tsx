import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <div className="bg-red-500 text-white p-10">
      Si esto es rojo, Tailwind 4 funciona 🔥
    </div>
  </React.StrictMode>
);


{/* <div class="col-xs-12 col-sm-6 col-md-12"><a href="/prefecturanaval/educacion/webcampus" class="panel panel-default panel-icon panel-primary"><div class="panel-heading icon-fix"><i class="fa icono-arg-graduada"></i></div>
<div class="panel-body">
  <h3>Cursos Externos</h3>
    <div class="text-muted">
    <p>Formacion y capacitación para ciudadania</p>
  </div>
  </div>
</a></div> */}