import { InputField } from "./components/form/input-field";
import Stepper2 from "./components/form/stepper";
import { Header2 } from "./components/header2";
import { Formik, Form, FormikHelpers } from "formik";

import axios from "axios";

interface Values {
  nome: "";
  endereco: "";
  dataNascimento: any;
  telefone: "";
  comunidadeFrequenta: "";
}

export function FormFront() {
  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pessoa",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data); // Handle response data
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  async function testAPI() {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/pessoa",
        data: {
          nome: "Finn",
          endereco: "Williams",
          dataNascimento: new Date(),
          telefone: "Williams",
          sexo: "MASCULINO",
          religiao: "CATOLICO",
          sacramento: "BATISMO",
          lastName: "Williams",
          comunidadeFrequenta: "mato branco",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  testAPI();
  return (
    <div>
      <Header2 />
      <div className="flex justify-center h-full">
        <div className="isolate flex items-center justify-center bg-white sm:w-full md:w-1/2">
          <div className="w-auto">
            <div className="flex md:justify-start sm:justify-start pt-12 pb-14">
              <Stepper2 numberOfSteps={3} currentPage={2} />
            </div>

            <div className="mx-auto max-w-xl text-center md:text-left">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
                Dados do Noivo
              </h2>
              <p className="mt-2 font-light sm:text-md md:text-md leading-8 text-gray-600">
                Preencha os dados do Noivo Abaixo
              </p>
            </div>

            <Formik
              initialValues={{
                nome: "",
                endereco: "",
                dataNascimento: "",
                telefone: "",
                comunidadeFrequenta: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-1">
                  <InputField
                    label="Nome Completo"
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Nome Completo"
                  />
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <InputField
                      label="Data de Nascimento"
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                    />
                    <InputField
                      label="Telefone"
                      id="telefone"
                      name="telefone"
                      type="tel"
                    />
                  </div>
                  <InputField
                    label="Endereço"
                    id="endereco"
                    name="endereco"
                    type="text"
                    placeholder="Endereço"
                  />
                  <InputField
                    label="Paróquia/Comunidade que frequenta"
                    id="comunidadeFrequenta"
                    name="comunidadeFrequenta"
                    type="text"
                    placeholder="Nome da Paróquia/Comunidade"
                  />
                </div>
                <div className="mt-8 w-full md:w-1/3">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-marromclaro px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Dados da Noiva
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
