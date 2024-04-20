import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import { InputField } from "./components/form/input-field";
import Stepper2 from "./components/form/stepper";
import { Header2 } from "./components/header2";
import SelectField from "./components/combo/selector";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

interface Values {
  sexo: string;
  nome: string;
  endereco: string;
  dataNascimento: string;
  telefone: string;
  comunidadeFrequenta: string;
  religiao: string;
  sacramento: string;
}

interface Option {
  value: string | boolean;
  label: string;
}

export function FormNoivo() {
  const sacramentoOptions: Option[] = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const religiaoOptions: Option[] = [
    { value: "CATOLICO", label: "Católico" },
    { value: "OUTROS", label: "Outros" },
  ];

  const navigate = useNavigate();

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

      if (response.status === 201) {
        console.log(response.data);
        console.log(response.data.id);
        navigate(`/formularioCursoDeNoivos/noiva?sn21s=${response.data.id}`);
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    comunidadeFrequenta: Yup.string().required("Campo obrigatório"),
    sacramento: Yup.boolean().required("Campo obrigatório"),
    religiao: Yup.string().required("Campo obrigatório"),
  });

  return (
    <div>
      <Header2 />
      <div className="flex justify-center h-full ">
        <div className="isolate flex items-center justify-center bg-white sm:w-full md:w-1/2 ">
          <div className="w-auto">
            <div className="flex md:justify-start sm:justify-start pt-12 pb-12">
              <Stepper2 numberOfSteps={3} currentPage={2} />
            </div>

            <div className="mx-auto max-w-xl text-center md:text-left">
              <h2 className="2xl:text-4xl notebook:mb-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Dados do Noivo
              </h2>
              <p className="notebook:hidden 2xl:inline-block font-light sm:text-md md:text-md leading-8 text-gray-600 mb-4">
                Preencha os dados do Noivo Abaixo
              </p>
            </div>

            <Formik
              initialValues={{
                sexo: "MASCULINO",
                nome: "",
                endereco: "",
                dataNascimento: "",
                telefone: "",
                comunidadeFrequenta: "",
                religiao: "",
                sacramento: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-1 border border-gray-300 rounded-md p-8">
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
                      min="1930-01-01"
                      max="2024-04-30"
                    />
                    <InputField
                      label="Telefone"
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(42) 99999-9999"
                      minLength={8}
                      maxLength={11}
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
                    label="Comunidade que Frequenta"
                    id="comunidadeFrequenta"
                    name="comunidadeFrequenta"
                    type="text"
                    placeholder="Matriz"
                  />
                  <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-6">
                    <SelectField
                      label="Tem todos os Sacramentos?"
                      name="sacramento"
                      options={sacramentoOptions}
                      additionalLabel="Batismo, Comunhão e Crisma"
                    />
                    <SelectField
                      label="Religião"
                      name="religiao"
                      options={religiaoOptions}
                    />
                    <span className="hidden md:inline-block  text-xs text-gray-600 -mt-2">
                      (Batismo, Comunhão e Crisma)
                    </span>
                  </div>
                </div>
                <div className="mt-8 sm:mt-8 w-full md:w-1/3 ml-auto notebook:mb-6 sm:mb-8">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-marromclaro px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Avançar
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
