import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";

export default function ClientesTable({ clientes }) {
  const navigate = useNavigate();
  const {user, loading} = useAuth();
  const handleEliminar = (id) => {
    alert("Eliminar Cliente " + id);
  }
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de clientes</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Acciones</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Teléfono</th>

          </tr>
        </thead>

        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan="6">
                No hay clientes cargados
              </td>
            </tr>
          ) : (
            clientes.map((c, i) => (
              <tr key={i}>
                <td className="p-2 border text-center justify-center py-2">
                      <div className="flex gap-2 justify-center">
                        {hasPermission(user, "ver_clientes") && (
                          <button onClick={()=> navigate(`/clientes/${c.id}`)}>
                            <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                          </button>
                        )}
                        {hasPermission(user, "editar_cliente") && (
                          <button onClick={()=> navigate(`/clientes/${c.id}/editar`)}>
                            <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                          </button>
                        )}
                        {hasPermission(user, "eliminar_cliente") && (
                          <button onClick={()=> handleEliminar(c.id)}>
                            <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                          </button>
                        )}
                      </div>
                </td>
                <td className="p-2 border">{c.nombre}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.telefono}</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
