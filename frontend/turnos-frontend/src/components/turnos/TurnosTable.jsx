import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";


export default function TurnosTable({ turnos = [] }) {
  const {user, loading} = useAuth();
  const navigate = useNavigate();
  
  const handleEliminar = (id) => {
    alert("Eliminar Turno " + id);
  }
  console.log("TURNOS EN COMPONENTE:", turnos);
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de turnos</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border w-32 text-center">Acciones</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Hora</th>
            <th className="p-2 border">Profesional</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Servicio</th>
            <th className="p-2 border">Estado</th>
          </tr>
        </thead>

        <tbody>
          {turnos.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan="6">
                No hay turnos cargados
              </td>
            </tr>
          ) : (
            turnos.map((t) => (
              <tr key={t.id}>
                <td className="p-2 border text-center justify-center py-2">
                    <div className="flex gap-2 justify-center">
                      {hasPermission(user, "ver_turnos") && (
                    <button onClick={() => navigate(`/turnos/${t.id}`)}>


                        <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                      )}
                      {hasPermission(user, "editar_turno") && (
                    <button onClick={()=> navigate(`/turnos/${t.id}/editar`)}>
                        <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                    </button>
                      )}
                      {hasPermission(user, "eliminar_turno") && (
                    <button onClick={()=> handleEliminar(t.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                      )}
                    </div   >
                </td>
                <td className="p-2 border">{t.fecha || "-"}</td>
                <td className="p-2 border">{t.hora || "-"}</td>
                <td className="p-2 border">{t.profesionalNombre || "-"}</td>
                <td className="p-2 border">{t.clienteNombre || "-"}</td>
                <td className="p-2 border">{t.servicioNombre || "-"}</td>
                <td className="p-2 border">{t.estado || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
