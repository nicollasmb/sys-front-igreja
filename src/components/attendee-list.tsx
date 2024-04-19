import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  Folder,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

import axios from "axios";

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
}

const headers = {
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImlzcyI6ImlncmVqYUJhY2siLCJleHAiOjE3MTM0OTE2Nzl9.hyhHPSuXYex9_Ho2U4yhpzXbAbvVReArCvd59U3hvlk",
};

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
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
  const [size, setSize] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("size")) {
      return Number(url.searchParams.get("size"));
    }

    return 1;
  });

  const [total, setTotal] = useState(0);

  const [casal, setCasal] = useState<CasalData[]>([]);

  const totalPages = Math.ceil(total / size);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:8080/dados_casal");

        // Set search parameters
        url.searchParams.set("size", size.toString());
        url.searchParams.set("page", page.toString());

        // Add search parameter if it exists
        if (search.length > 0) {
          url.searchParams.set("query", search);
        }

        const response = await axios.get<any>(url.toString(), {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImlzcyI6ImlncmVqYUJhY2siLCJleHAiOjE3MTM1NjczNTV9.G0Gk8pffWtbmTFk44FYslSmTf54c_dW-OwNQOgxlx0A`,
          },
        });

        if (response.data.content && response.data.content.length > 0) {
          const filteredData = response.data.content.filter(
            (casalData: any) => {
              return (
                casalData.noiva.nome
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                (casalData.noivo &&
                  casalData.noivo.nome
                    .toLowerCase()
                    .includes(search.toLowerCase()))
              );
            }
          );

          const formattedData = filteredData.map((casalData: any) => ({
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
          }));

          setCasal(formattedData);
          setTotal(formattedData.length);
        } else {
          console.log("No content found in the response.");
        }

        console.log(response.data.content); // Log the content array
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search, size]);

  // useEffect(() => {
  //   const url = new URL("http://localhost:8080/dados_casal/?size=1&page=1"); // Set the page parameter
  //   console.log(url);

  //   fetch(url, {
  //     headers: {
  //       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImlzcyI6ImlncmVqYUJhY2siLCJleHAiOjE3MTM1NjczNTV9.G0Gk8pffWtbmTFk44FYslSmTf54c_dW-OwNQOgxlx0A`,
  //       "Content-Type": "application/pdf", // You may adjust the content type as per your API requirements
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const filteredData = data.filter((casalData: any) => {
  //         // Check if either the noiva or noivo name matches the search term
  //         return (
  //           casalData.noiva.nome.toLowerCase().includes(search.toLowerCase()) ||
  //           (casalData.noivo &&
  //             casalData.noivo.nome.toLowerCase().includes(search.toLowerCase()))
  //         );
  //       });
  //       setCasal(
  //         filteredData.push((casalData: any) => ({
  //           id: casalData.casalId,
  //           nomeNoiva: casalData.noiva.nome, // Accessing noiva's nome
  //           enderecoNoiva: casalData.noiva.endereco, // Accessing noiva's endereco
  //           dataNascimentoNoiva: casalData.noiva.dataNascimento, // Accessing noiva's dataNascimento
  //           telefoneNoiva: casalData.noiva.telefone, // Accessing noiva's telefone
  //           comunidadeNoiva: casalData.noiva.comunidadeFrequenta, // Accessing noiva's comunidadeFrequenta
  //           religiaoNoiva: casalData.noiva.religiao, // Accessing noiva's religiao
  //           sacramentoNoiva: casalData.noiva.sacramento, // Accessing noiva's sacramento
  //           nomeNoivo: casalData.noivo.nome, // Accessing noivo's nome
  //           enderecoNoivo: casalData.noivo.endereco, // Accessing noivo's endereco
  //           dataNascimentoNoivo: casalData.noivo.dataNascimento, // Accessing noivo's dataNascimento
  //           telefoneNoivo: casalData.noivo.telefone, // Accessing noivo's telefone
  //           comunidadeNoivo: casalData.noivo.comunidadeFrequenta, // Accessing noivo's comunidadeFrequenta
  //           religiaoNoivo: casalData.noivo.religiao, // Accessing noivo's religiao
  //           sacramentoNoivo: casalData.noivo.sacramento, // Accessing noivo's sacramento
  //         }))
  //       );
  //       setTotal(filteredData.length);
  //     });
  // }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  function setCurrentSize(size: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("size", String(size));
    window.history.pushState({}, "", url);
    setSize(size);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", search);
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
    setCurrentSize(2);
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

  function getPdf(casalId: number) {
    axios
      .get(`http://localhost:8080/dados_casal/pdf/${casalId}`, {
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
        link.download = "document.pdf"; // Set the filename for the downloaded PDF
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

  function getPdf2() {
    axios
      .get(`http://localhost:8080/dados_casal/pdf`, {
        responseType: "blob",
        headers,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <div className="flex gap-6 items-center space place-content-around">
        <h1 className="text-2xl font-bold text-gray-900">Casais</h1>
        <div className="px-3 w-72 py-1.5 border border-gray-400 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-gray-500" />
          <input
            className="focus:ring-0 bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar Casal..."
            onChange={onSearchInputChanged}
          />
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
                ? "bg-marromclaro/20"
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
                  <TableCell>{casalData.nomeNoivo}</TableCell>
                  <TableCell>{casalData.telefoneNoivo}</TableCell>
                  <TableCell>{casalData.enderecoNoivo}</TableCell>
                  <TableCell>{casalData.nomeNoiva}</TableCell>
                  <TableCell>{casalData.telefoneNoiva}</TableCell>
                  <TableCell>{casalData.enderecoNoiva}</TableCell>

                  <TableCell>
                    {casalData.sexo === "FEMININO" ? (
                      <span className="text-gray-400">Feminino</span>
                    ) : (
                      <span className="text-gray-400">Masculino</span>
                    )}
                  </TableCell>
                  <TableCell className="flex flex-row gap-2">
                    <IconButton
                      transparent
                      className="bg-black/20 border border-white/10 rounded-md p-1.5"
                      onClick={() => getPdf(casalData.id)}
                    >
                      <Folder className="size-4" />
                    </IconButton>
                    <IconButton
                      transparent
                      className="bg-black/20 border border-white/10 rounded-md p-1.5"
                      onClick={getPdf2}
                    >
                      <MoreHorizontal className="size-4" />
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
          <TableCell colSpan={3}>
            Mostrando {casal.length} de {total} itens
          </TableCell>
          <TableCell className="text-right" colSpan={3}>
            <div className="inline-flex items-center gap-8">
              <span>
                Página {page} de {totalPages}
              </span>

              <div className="flex gap-1.5">
                <IconButton onClick={goToFirstPage}>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton onClick={goToPreviousPage}>
                  {/* <IconButton onClick={goToPreviousPage} disabled={page === 1}></IconButton> */}
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
  );
}
