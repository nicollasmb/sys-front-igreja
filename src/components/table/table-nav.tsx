import logo from "./../../assets/logo.png";
import { NavLink } from "../nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2 sm:w-full">
      <img src={logo} alt="NLW Unite" className="h-14 pl-5 pt-1 w-auto" />

      <nav className="flex items-center gap-5">
        <NavLink href="/formularioCursoDeNoivos/Noiva">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  );
}
