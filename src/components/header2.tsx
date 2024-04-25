import logo from "../assets/logo.png";

export function Header2() {
  return (
    <header className="sm:hidden lg:flex fixed flex items-center justify-between pl-1 py-4 w-full">
      <img src={logo} alt="Logo" className="h-14 pl-5 pt-1 w-auto" />

      <nav>
        <ul className="flex space-x-4"></ul>
      </nav>
    </header>
  );
}
