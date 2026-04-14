import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
export default function EspecialidadesTable({ especialidades }) {
  const navigate = useNavigate();
  const handleEliminar = (id) => {
    alert("Eliminar Especialidad " + id);
  }
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de especialidades</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Acciones</th>
            <th className="p-2 border">Nombre</th>
          </tr>
        </thead>

        <tbody>
          {especialidades.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan="2">
                No hay especialidades cargadas
              </td>
            </tr>
          ) : (
            especialidades.map((e, i) => (
              <tr key={i}>
                  <td className="p-2 border text-center justify-center py-2">
                    <div className="flex gap-2 justify-center">
                    <button onClick={()=> navigate(`/especialidades/${e.id}`)}>
                        <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={()=> navigate(`/especialidades/${e.id}/editar`)}>
                        <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                    </button>
                    <button onClick={()=> handleEliminar(e.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                    </button>
                    </div>
                </td>
                <td className="p-2 border">{e.nombre}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
