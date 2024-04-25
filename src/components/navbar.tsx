import logo from "./../assets/logo.png";

import { NavLink } from "./nav-link";

export function Navbar() {
  return (
    <div className="bg-brancofundo">
      <div className="flex items-center sm:justify-center md:justify-start gap-5 py-4 px-4 sm:w-full">
        <img src={logo} alt="NLW Unite" className="h-14 w-auto" />
      </div>
    </div>
  );
}
