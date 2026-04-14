import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
export default function ServiciosTable({ servicios }) {
  const navigate = useNavigate();
  const handleEliminar = (id) => {
    alert("Eliminar Servicio " + id);
  }
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de servicios</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border"></th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Duración (min)</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Especialidad</th>
          </tr>
        </thead>

        <tbody>
          {servicios.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan="4">
                No hay servicios cargados
              </td>
            </tr>
          ) : (
            servicios.map((s, i) => (
              <tr key={i}>
                <td className="p-2 border text-center justify-center py-2">
                    <div className="flex gap-2 justify-center">
                    <button onClick={()=> navigate(`/servicios/${s.id}`)}>
                        <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={()=> navigate(`/servicios/${s.id}/editar`)}>
                        <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                    </button>
                    <button onClick={()=> handleEliminar(s.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                    </div>
                </td>
                <td className="p-2 border">{s.nombre}</td>
                <td className="p-2 border">{s.duracionMinutos}</td>
                <td className="p-2 border">${s.precio}</td>
                <td className="p-2 border">{s.especialidad.nombre}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
