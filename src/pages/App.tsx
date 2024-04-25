import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "../util/PrivateRoutes";
import LoginPage from "./LoginPage";
import { FormNoivo } from "./FormNoivo";
import { FormCasal } from "./FormCasal";
import { FormNoiva } from "./FormNoiva";
import FormSucess from "./FormSuccess";
import PageNotFound from "./ErrorPage";
import Home from "./Home";
import { ListaCursoNoivos } from "./ListaCursoNoivos";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ListaCursoNoivos />} path="/pastoralfamiliar" />
          </Route>

          <Route
            element={<FormNoivo />}
            path="/formularioCursoDeNoivos/Noivo"
          />
          <Route
            element={<FormNoiva />}
            path="/formularioCursoDeNoivos/Noiva"
          />
          <Route
            element={<FormCasal />}
            path="/formularioCursoDeNoivos/Casal"
          />

          <Route
            element={<FormSucess />}
            path="/formularioCursoDeNoivos/Sucesso"
          />

          <Route path="/" element={<Home />} />

          <Route element={<PageNotFound />} path="*" />
          <Route element={<LoginPage />} path="/admin/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
