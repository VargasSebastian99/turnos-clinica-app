import { useEffect, useState } from "react";
import { getClientes, crearCliente } from "../../api/clientesApi";
import { useNavigate } from "react-router-dom";
import ClientesTable from "../../components/clientes/ClientesTable";
import ClienteForm from "../../components/clientes/ClienteForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";

export default function ClientesPage() {
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const {user, loading} = useAuth();
  const navigate = useNavigate();
    useEffect(()=>{
        if (loading) return;

        getClientes().then(setClientes);
        },[loading]);
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

      <ClientesTable clientes={clientes} />

      <Modal open={open} onClose={() => setOpen(false)} formId="cliente-form">
        <ClienteForm onSubmit={agregarCliente} />
      </Modal>
    </div>
  );
}
