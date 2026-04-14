import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export default function TurnosTable({ turnos }) {

  const navigate = useNavigate();
  const handleEliminar = (id) => {
    alert("Eliminar Turno " + id);
  }
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
            turnos.map((t, i) => (
              <tr key={i}>
                <td className="p-2 border text-center justify-center py-2">
                    <div className="flex gap-2 justify-center">
                    <button onClick={() => navigate(`/turnos/${t.id}`)}>


                        <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={()=> navigate(`/turnos/${t.id}/editar`)}>
                        <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                    </button>
                    <button onClick={()=> handleEliminar(t.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                    </div   >
                </td>
                <td className="p-2 border">{t.fecha || "-"}</td>
                <td className="p-2 border">{t.hora || "-"}</td>
                <td className="p-2 border">{t.profesional?.nombre || "-"}</td>
                <td className="p-2 border">{t.cliente?.nombre || "-"} {t.cliente?.apellido || "-"}</td>
                <td className="p-2 border">{t.servicio?.nombre || "-"}</td>
                <td className="p-2 border">{t.estado || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
