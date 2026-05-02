import { useEffect, useState } from "react";
import { getClientes, crearCliente } from "../../api/clientesApi";
import { useNavigate } from "react-router-dom";
import ClientesTable from "../../components/clientes/ClientesTable";
import ClienteForm from "../../components/clientes/ClienteForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
import ClientesFiltros from "../../components/clientes/ClientesFiltros";
import Pagination from "../../components/common/Paginacion";
import { buscarClientes } from "../../api/clienteFilterApi";

export default function ClientesPage() {
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const {user, loading} = useAuth();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [filtros, setFiltros] = useState({});


  const navigate = useNavigate();
    useEffect(()=>{
        if (loading) return;

        getClientes().then(setClientes);
        },[loading]);

  const filtrar = async (nuevosFiltros = null, nuevaPagina = 0) =>{
    const filtrosCompletos =
      nuevosFiltros === null
        ? {}
        : { ...filtros, ...nuevosFiltros};
    const data = await buscarClientes({
      ...filtrosCompletos,
      page: nuevaPagina,
      size
    });
    setFiltros(filtrosCompletos);
    setClientes(data.content);
    setTotalPages(data.totalPages);
    setPage(data.number);
  };

  const agregarCliente = async(data) => {
      const nuevo = await crearCliente(data);
    setClientes([...clientes, nuevo]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        {hasPermission(user, "crear_cliente") && (
        <button
          onClick={() => navigate("/clientes/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo cliente
        </button>
        )}
      </div>

      <ClientesFiltros
        onFiltrar={filtrar}
      />
      <ClientesTable clientes={clientes} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => filtrar(filtros, newPage)}
      />
      <div className="flex justify-center mt-4">
        <select
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
          }}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} formId="cliente-form">
        <ClienteForm onSubmit={agregarCliente} />
      </Modal>
    </div>
  );
}
