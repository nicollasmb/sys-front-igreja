import logo from "../assets/logo.png";

export function Header2() {
  return (
    <header className="fixed flex items-center justify-between p-4 w-full">
      <img src={logo} alt="Logo" className="h-14 pl-5 pt-1 w-auto" />
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 w-auto mr-4" />
        <h1 className="text-white text-lg font-semibold">Your Logo</h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
