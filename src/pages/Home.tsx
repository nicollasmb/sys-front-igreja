import logo from "./../assets/logo.png";

export default function Home() {
  return (
    <div>
      <div className="bg-brancofundo">
        <header className="absolute inset-x-0 top-0 z-50 ">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-12 w-auto" src={logo} alt="" />
              </a>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <a
                href="/formularioCursoDeNoivos/Noivo"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Curso de Noivos
              </a>
              <a
                href="https://www.instagram.com/paroquiaimbituva/"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Instagram
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=554298159595&text&type=phone_number&app_absent=0"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Contato
              </a>
            </div>
            <div className="hidden md:flex md:flex-1 md:justify-end">
              {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a> */}
            </div>
          </nav>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[280deg] bg-gradient-to-tr from-[#3b251a] to-[#ffffff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          <div className="mx-auto max-w-2xl py-32  sm:py-30 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-md leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Site em Desenvolvimento{" "}
              </div>
            </div>
            <div className="text-center">
              <h1 className="sm:text-4xl md:text-6xl font-bold tracking-tight text-gray-900 ">
                Na luz da tradição, fortalecendo corações na fé.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Uma plataforma completa está sendo desenvolvida para a nossa
                paróquia, fique por dentro das novidades seguindo as nossas
                redes sociais.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="https://www.instagram.com/paroquiaimbituva/"
                  className="rounded-md bg-marromclaro px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white transition duration-200 hover:text-marromclaro hover:ring-2 hover:ring-marromclaro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Siga-nos nas redes sociais
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=554298159595&text&type=phone_number&app_absent=0"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Entre em contato <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b251a] to-[#ffffff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
