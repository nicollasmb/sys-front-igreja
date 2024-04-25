import Button from "../components/button";
import { Navbar } from "../components/navbar";

import { useNavigate } from "react-router-dom";

export default function FormSucess() {
  const history = useNavigate();

  const handleClick = () => {
    // Navigate to the home page when the button is clicked
    history("/");
  };

  const params = new URLSearchParams(location.search);
  const nomeNoivo = params.get("nomeNoivo");
  const nomeNoiva = params.get("nomeNoiva");

  function getFirstName(fullName: any) {
    // Split the full name by space character
    const parts = fullName.split(" ");
    // Return the first part (first name)
    return parts[0];
  }

  // Extract first names
  const firstNameNoivo = getFirstName(nomeNoivo);
  const firstNameNoiva = getFirstName(nomeNoiva);

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex md:my-48 sm:my-28 items-center justify-center h-full gap-y-8 ">
        <div className="p-6  md:mx-auto md:-mt-12">
          <svg
            viewBox="0 0 24 24"
            className="text-green-700 animate-bounce w-20 h-20 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <h3 className="text-3xl md:text-4xl text-gray-900 font-semibold text-center">
                {firstNameNoivo}
              </h3>
              <h3 className="text-3xl md:text-4xl text-gray-900 text-center align-mzddle">
                e
              </h3>
              <h3 className="text-3xl md:text-4xl text-gray-900 font-semibold text-center">
                {firstNameNoiva}
              </h3>
            </div>

            <h1 className="text-2xl text-marromclaro font-semibold sm:text-xl ">
              Recebemos a sua inscrição!
            </h1>

            <p className="pt-3 text-xl sm:text-lg">
              Entraremos em contato em breve com mais informações
            </p>
            <div className="md:flex-row gap-2">
              <p className="text-gray-600 pt-3 sm:text-md">
                Em caso de dúvidas, entre em contato com o Escritório Paroquial
                pelo:
              </p>
              <a
                className="text-gray-600 font-semibold pt-3"
                href="https://api.whatsapp.com/send/?phone=554298159595&text&type=phone_number&app_absent=0"
              >
                (42) 9 9815-9595
              </a>
            </div>

            <div className="flex items-center justify-center">
              <div className="md:w-1/3 sm:w-1/2 pt-8">
                <Button onClick={handleClick}>Página Principal</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
