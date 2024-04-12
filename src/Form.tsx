import { InputField } from "./components/form/input-field";
import { ListBox } from "./components/form/listbox-form";
import { Header2 } from "./components/header2";

export function Form() {
  return (
    <div>
      <Header2></Header2>
      <div className="flex justify-center items-center h-full">
        <div className="isolate flex flex-col justify-center items-center bg-white px-6 py-24 sm:w-full md:w-1/2 ">
          <div className="mx-auto max-w-2xl text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dados do Noivo
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Preencha os dados do Noivo Abaixo
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20 rounded-md border p-8"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-1 ">
              <InputField
                label="Nome Completo"
                id="fullname"
                type="text"
                placeholder="Nome Completo"
              />
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <InputField
                  label="Data de Nascimento"
                  id="datanascimento"
                  type="date"
                />
                <InputField label="Telefone" id="phone" type="tel" />
              </div>
              <InputField
                label="Endereço"
                id="adress"
                type="text"
                placeholder="Endereço"
              />
              <InputField
                label="Paróquia/Comunidade que frequenta"
                id="paroquia_que_frequenta"
                type="text"
                placeholder="Nome da Paróquia/Comunidade"
              />
              <ListBox />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Dados da Noiva -
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
