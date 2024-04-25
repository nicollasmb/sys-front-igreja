import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import { InputField } from "../components/form/input-field";
import Stepper2 from "../components/form/stepper";
import { Header2 } from "../components/header2";

import SelectField from "../components/combo/select-options";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

interface Values {
  vivemJuntos: string;
  tempoJuntos: string;
  paroquiaCasamento: string;
  paroquiaFrequentam: string;
}

interface Option {
  value: string | boolean;
  label: string;
}

export function FormCasal() {
  const vivemJuntosOptions: Option[] = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const location = useLocation();

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const idNoivoString = params.get("sn21s");
  const idNoivaString = params.get("i99a");

  const nomeNoivo = params.get("nomeNoivo");
  const nomeNoiva = params.get("nomeNoiva");

  const idNoivo = idNoivoString;
  const idNoiva = idNoivaString;

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/dados_casal",
        { ...values, noivoId: idNoivo, noivaId: idNoiva },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log({ ...values, noivoID: idNoivo, noivaID: idNoiva });
    } finally {
      setSubmitting(false);
      navigate(
        `/formularioCursoDeNoivos/Sucesso?nomeNoivo=${nomeNoivo}&nomeNoiva=${nomeNoiva}`
      );
    }
  };

  const validationSchema = Yup.object().shape({
    vivemJuntos: Yup.boolean().required("Campo obrigatório"),
    tempoJuntos: Yup.string().required("Campo obrigatório"),
    paroquiaFrequentam: Yup.string().required("Campo obrigatório"),
    paroquiaCasamento: Yup.string().required("Campo obrigatório"),
  });

  return (
    <div>
      <Header2 />
      <div className="flex justify-center h-full ">
        <div className="isolate flex items-center justify-center bg-brancofundo sm:w-full md:w-1/2 ">
          <div className="w-auto">
            <div className="flex md:justify-start  sm:pt-10 md:pt-12 pb-12 ">
              <Stepper2 numberOfSteps={3} currentPage={0} />
            </div>

            <div className="mx-auto max-w-xl text-center md:text-left sm:-mt-4">
              <h2 className="2xl:text-4xl notebook:mb-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Dados do Casal
              </h2>
              <p className="notebook:hidden 2xl:inline-block font-light sm:text-md md:text-md leading-8 text-gray-600 mb-4">
                Preencha os dados do Casal Abaixo
              </p>
            </div>

            <Formik
              initialValues={{
                vivemJuntos: "",
                tempoJuntos: "",
                paroquiaCasamento: "",
                paroquiaFrequentam: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="bg-[#fdfdfc] grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1 sm:p-4 border border-gray-300 rounded-md md:p-8">
                  <SelectField
                    label="Vivem Juntos?"
                    name="vivemJuntos"
                    options={vivemJuntosOptions}
                  />
                  <InputField
                    label="Estão juntos há quanto tempo?"
                    id="dataNascimento"
                    name="tempoJuntos"
                    type="text"
                  />

                  <InputField
                    label="Paróquia em que vão casar"
                    id="paroquiaCasamento"
                    name="paroquiaCasamento"
                    type="text"
                  />
                  <InputField
                    label="Paróquia/Comunidade que frequentam:"
                    id="paroquiaFrequentam"
                    name="paroquiaFrequentam"
                    type="text"
                  />
                </div>

                <div className="mt-8 sm:mt-8 w-full md:w-1/3 ml-auto">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-marromclaro px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-gray-700 transition duration-800 hover:border-2 hover:border-marromclaro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
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
