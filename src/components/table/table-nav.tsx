import logo from "./../../assets/logo.png";
import { NavLink } from "../nav-link";

import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center gap-5 py-2 sm:w-full ">
      <img src={logo} alt="NLW Unite" className="h-14 pl-5 pt-1 w-auto" />

      <nav className="flex items-center gap-5 ">
        <NavLink href="/formularioCursoDeNoivos/Noivo">Formulário</NavLink>
        <NavLink href="/pastoralfamiliar">Inscritos</NavLink>
        <Form onSubmit={handleLogout}>
          <button className="font-medium text-sm text-zinc-700" type="submit">
            Sair
          </button>
        </Form>
      </nav>
    </div>
  );
}
