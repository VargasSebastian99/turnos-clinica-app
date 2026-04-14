import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; 
export default function ProfesionalesTable({ profesionales }) {
  const navigate = useNavigate();
  const handleEliminar = (id) => {
    alert("Eliminar Profesional " + id);
  }
  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de profesionales</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">

            <th className="p-2 border"></th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Especialidad</th>
            <th className="p-2 border">Horario Mañana</th>
            <th className="p-2 border">Horario Tarde</th>
            <th className="p-2 border">Estado</th>
          </tr>
        </thead>

        <tbody>
          {profesionales.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan="5">
                No hay profesionales cargados
              </td>
            </tr>
          ) : (
            profesionales.map((p, i) => (
              <tr key={i}>
                  <td className="p-2 border text-center justify-center py-2">
                      <div className="flex gap-2 justify-center">
                      <button onClick={()=> navigate(`/profesionales/${p.id}`)}>
                          <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                      </button>
                      <button onClick={()=> navigate(`/profesionales/${p.id}/editar`)}>
                          <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                      </button>
                      <button onClick={()=> handleEliminar(p.id)}>
                          <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                      </button>
                      </div>
                  </td>
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.especialidad?.nombre}</td>
                <td className="p-2 border">
                  {p.horaInicioManiana} - {p.horaFinManiana}
                </td>
                <td className="p-2 border">
                  {p.horaInicioTarde} - {p.horaFinTarde}
                </td>
                <td className="p-2 border">{p.estado}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
