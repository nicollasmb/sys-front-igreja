import { InputField } from "../components/form/input-field";
import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import logo from "./../assets/logo.png";
import { PasswordField } from "../components/form/password-input";

interface Values {
  login: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          login: values.login,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("jwt-token", response.data.token);
        navigate(`/`);
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
    login: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-52 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                <InputField
                  label="Usuário"
                  id="login"
                  type="text"
                  name="login"
                ></InputField>

                <PasswordField
                  label="Senha"
                  id="password"
                  type="text"
                  name="password"
                ></PasswordField>
              </div>
              <div className="flex mt-10 mx-auto align-middle justify-center">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-marromclaro px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-gray-700 transition duration-800 hover:border-2 hover:border-marromclaro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Entrar
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
