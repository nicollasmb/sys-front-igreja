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

  const [total, setTotal] = useState(0);

  const [casal, setCasal] = useState<CasalData[]>([]);

  const totalPages = Math.ceil(total / 10);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    const url = new URL("http://localhost:8080/dados_casal");
    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const filteredData = data.filter((casalData: any) => {
          // Check if either the noiva or noivo name matches the search term
          return (
            casalData.noiva.nome.toLowerCase().includes(search.toLowerCase()) ||
            (casalData.noivo &&
              casalData.noivo.nome.toLowerCase().includes(search.toLowerCase()))
          );
        });
        setCasal(
          filteredData.map((casalData: any) => ({
            id: casalData.casalId,
            nomeNoiva: casalData.noiva.nome, // Accessing noiva's nome
            enderecoNoiva: casalData.noiva.endereco, // Accessing noiva's endereco
            dataNascimentoNoiva: casalData.noiva.dataNascimento, // Accessing noiva's dataNascimento
            telefoneNoiva: casalData.noiva.telefone, // Accessing noiva's telefone
            comunidadeNoiva: casalData.noiva.comunidadeFrequenta, // Accessing noiva's comunidadeFrequenta
            religiaoNoiva: casalData.noiva.religiao, // Accessing noiva's religiao
            sacramentoNoiva: casalData.noiva.sacramento, // Accessing noiva's sacramento
            nomeNoivo: casalData.noivo.nome, // Accessing noivo's nome
            enderecoNoivo: casalData.noivo.endereco, // Accessing noivo's endereco
            dataNascimentoNoivo: casalData.noivo.dataNascimento, // Accessing noivo's dataNascimento
            telefoneNoivo: casalData.noivo.telefone, // Accessing noivo's telefone
            comunidadeNoivo: casalData.noivo.comunidadeFrequenta, // Accessing noivo's comunidadeFrequenta
            religiaoNoivo: casalData.noivo.religiao, // Accessing noivo's religiao
            sacramentoNoivo: casalData.noivo.sacramento, // Accessing noivo's sacramento
          }))
        );
        setTotal(filteredData.length);
      });
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
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

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <div className="flex gap-6 items-center">
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

                  {/* <TableCell>
                    {casalData.sexo === "FEMININO" ? (
                      <span className="text-gray-400">Feminino</span>
                    ) : (
                      <span className="text-gray-400">Masculino</span>
                    )}
                  </TableCell> */}
                  <TableCell className="flex flex-row gap-2">
                    <IconButton
                      transparent
                      className="bg-black/20 border border-white/10 rounded-md p-1.5"
                    >
                      <Folder className="size-4" />
                    </IconButton>
                    <IconButton
                      transparent
                      className="bg-black/20 border border-white/10 rounded-md p-1.5"
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
      <tfoot>
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
                <IconButton onClick={goToPreviousPage} disabled={page === 1}>
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
