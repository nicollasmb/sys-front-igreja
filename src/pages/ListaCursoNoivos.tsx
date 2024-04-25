import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Folder,
} from "lucide-react";
import { IconButton } from "../components/icon-button";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCell } from "../components/table/table-cell";
import { TableRow } from "../components/table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

import axios from "axios";

import SelectDropdown from "../components/combo/dropdown-button";
import { Header } from "../components/table/table-nav";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface CasalData {
  id: number;
  nomeNoiva: string;
  enderecoNoiva: string;
  dataNascimentoNoiva: string;
  telefoneNoiva: string;
  comunidadeNoiva: string;
  religiaoNoiva: string;
  sacramentoNoiva: string;
  nomeNoivo?: string;
  enderecoNoivo?: string;
  dataNascimentoNoivo?: string;
  telefoneNoivo?: string;
  comunidadeNoivo?: string;
  religiaoNoivo?: string;
  sacramentoNoivo?: string;
  impresso: boolean;
}

const token = localStorage.getItem("jwt-token");

const headers = {
  Authorization: `Bearer ${token}`,
};

export function ListaCursoNoivos() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("nome")) {
      return url.searchParams.get("nome") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  // const [size, setSize] = useState(() => {
  //   const url = new URL(window.location.toString());

  //   if (url.searchParams.has("size")) {
  //     return Number(url.searchParams.get("size"));
  //   }

  //   return 1;
  // });

  const [total, setTotal] = useState(0);

  const [casal, setCasal] = useState<CasalData[]>([]);

  const totalPages = Math.ceil(total / 9);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:8080/dados_casal");

        // Set search parameters
        url.searchParams.set("page", page.toString());
        url.searchParams.set("nome", search.toString());

        const response = await axios.get<any>(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.content && response.data.content.length > 0) {
          const formattedData = response.data.content.map((casalData: any) => ({
            id: casalData.casalId,
            nomeNoiva: casalData.noiva.nome,
            enderecoNoiva: casalData.noiva.endereco,
            dataNascimentoNoiva: casalData.noiva.dataNascimento,
            telefoneNoiva: casalData.noiva.telefone,
            comunidadeNoiva: casalData.noiva.comunidadeFrequenta,
            religiaoNoiva: casalData.noiva.religiao,
            sacramentoNoiva: casalData.noiva.sacramento,
            nomeNoivo: casalData.noivo.nome,
            enderecoNoivo: casalData.noivo.endereco,
            dataNascimentoNoivo: casalData.noivo.dataNascimento,
            telefoneNoivo: casalData.noivo.telefone,
            comunidadeNoivo: casalData.noivo.comunidadeFrequenta,
            religiaoNoivo: casalData.noivo.religiao,
            sacramentoNoivo: casalData.noivo.sacramento,
            impresso: casalData.impresso,
          }));

          setCasal(formattedData);
          setTotal(response.data.totalElements);
        } else {
          console.log("No content found in the response.");
        }

        // console.log(response.data.content); // Log the content array
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("nome", search);
    window.history.pushState({}, "", url);
    setSearch(search);
  }
  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
    console.log(search);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function handleCheckboxChange(id: number) {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

  function handleAllCheckboxes(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const updatedSelectedRows = isChecked
      ? casal.map((casalData) => casalData.id)
      : [];
    setSelectedRows(updatedSelectedRows);
  }

  function getPdf(casalData: CasalData) {
    const { id, nomeNoivo, nomeNoiva } = casalData;

    axios
      .get(`http://localhost:8080/dados_casal/pdf/${id}`, {
        responseType: "blob",
        headers,
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");

        // Set filename with groom and bride names
        const filename = `Ficha ${nomeNoivo} e ${nomeNoiva}.pdf`;

        link.href = pdfUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getAllPdf() {
    axios
      .get(`http://localhost:8080/dados_casal/pdf`, {
        responseType: "blob",
        headers,
      })
      .then((response) => {
        // Create a Blob from the PDF data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a URL object representing the PDF blob
        const pdfUrl = URL.createObjectURL(blob);

        // Create a temporary link element (<a>) to trigger the download
        const link = document.createElement("a");
        link.href = pdfUrl;
        const now = dayjs().format("dddd, DD [de] MMMM [de] YYYY");
        link.download = `Fichas - ${now}.pdf`; // Set the filename for the downloaded PDF
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate the download
        link.click();

        // Cleanup: Remove the temporary link and revoke the URL object
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function exportSelected() {
    selectedRows.forEach((id) => {
      // Find the casalData object corresponding to the current id
      const casalData = casal.find((data) => data.id === id);

      // If casalData is found, call getPdf with casalData
      if (casalData) {
        getPdf(casalData);
      }
    });
  }
  const options = ["Selecionados", "Todos"];
  const buttonLabel = "Exportar";

  const handleOptionSelect = (selectedOption: string) => {
    switch (selectedOption) {
      case "Selecionados":
        exportSelected();
        break;
      case "Todos":
        getAllPdf();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="max-w-[1112px] mx-auto py-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4 overflow-x-auto">
          <div className=" md:flex gap-6 items-center space place-content-between sm:grid sm:grid-cols-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Casais Inscritos
            </h1>

            <div className="flex gap-8">
              <div className="bg-white px-3 w-72 py-1.5 border border-marromclaro rounded-lg flex items-center gap-3">
                <Search className="size-6 text-marromclaro" />
                <input
                  className="focus:ring-0 bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                  placeholder="Buscar Casal..."
                  onChange={onSearchInputChanged}
                />
              </div>
              <div>
                <SelectDropdown
                  options={options}
                  buttonLabel={buttonLabel}
                  onSelectOption={handleOptionSelect}
                />
              </div>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto rounded-lg shadow-md">
            <Table>
              <thead>
                <tr className="border-b border-gray-600">
                  <TableHeader style={{ width: 48 }}>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10"
                      onChange={handleAllCheckboxes}
                    />
                  </TableHeader>

                  <TableHeader>Noivo</TableHeader>
                  <TableHeader>Telefone</TableHeader>
                  <TableHeader>Endereço</TableHeader>
                  <TableHeader>Noiva</TableHeader>
                  <TableHeader>Telefone</TableHeader>
                  <TableHeader>Endereço</TableHeader>
                  <TableHeader>Status</TableHeader>

                  <TableHeader style={{ width: 64 }}></TableHeader>
                </tr>
              </thead>
              <tbody>
                {casal.map((casalData) => {
                  const isChecked = selectedRows.includes(casalData.id);
                  const rowClassName = isChecked
                    ? "bg-marromclaro/20 "
                    : "bg-white hover:bg-gray-100";
                  return (
                    <TableRow
                      key={casalData.id}
                      className={rowClassName}
                      onClick={() => handleCheckboxChange(casalData.id)}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          className="size-4 bg-black/20 rounded border border-white/10"
                          checked={isChecked}
                          onClick={() => handleCheckboxChange(casalData.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {casalData.nomeNoivo}
                      </TableCell>
                      <TableCell>{casalData.telefoneNoivo}</TableCell>
                      <TableCell>{casalData.enderecoNoivo}</TableCell>
                      <TableCell className="font-medium">
                        {casalData.nomeNoiva}
                      </TableCell>
                      <TableCell>{casalData.telefoneNoiva}</TableCell>
                      <TableCell>{casalData.enderecoNoiva}</TableCell>

                      <TableCell>
                        {casalData.impresso == true ? (
                          <span className="text-green-700 font-medium">
                            Entregue
                          </span>
                        ) : (
                          <span className="text-red-800 font-medium">
                            Pendente
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="flex flex-row gap-2">
                        <IconButton
                          className="border-1border-gray-900 rounded-md p-1.5"
                          onClick={() => getPdf(casalData)}
                        >
                          <Folder className="size-4 text-marromclaro" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <tfoot className="flex ml-auto">
            <tr>
              <TableCell className="border-none" colSpan={3}>
                Mostrando {casal.length} de {total} itens
              </TableCell>
              <TableCell className="text-right border-none" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>
                    Página {page} de {totalPages}
                  </span>

                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>

                    <IconButton
                      onClick={goToPreviousPage}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={goToNextPage}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={goToLastPage}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
        </div>
      </div>
    </div>
  );
}
