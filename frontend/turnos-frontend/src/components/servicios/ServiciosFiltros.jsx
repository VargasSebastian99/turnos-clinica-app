import { useState } from "react";

export default function ServiciosFiltros({ especialidades, onFiltrar }){
    const [nombre, setNombre] = useState("");
    const [especialidadId, setEspecialidadId] = useState("");

    const limpiar = () => {
        setNombre("");
        setEspecialidadId("");
        
        onFiltrar(null, 0);
    };
    const filtrar = () =>{
        onFiltrar(
            {
                nombre: nombre || null,
                especialidadId: especialidadId || null
            },
            0
        );
    };
    return (
        <div className="bg-white p-4 rounded shadow mt-4 flex gap-4 items-end">
            <div className="flex flex-col">
                <label>Nombre</label>
                <input
                    className="border p-2 rounded"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label>Especialidad</label>
                <select
                    className="border p-2 rounded"
                    value={especialidadId}
                    onChange={(e) => setEspecialidadId(e.target.value)}
                    >
                    <option value="">Todas</option>
                    {especialidades.map((e) => (
                        <option key={e.id} value={e.id}>
                        {e.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-5 mt-6">
                <button
                    onClick={filtrar}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                    Filtrar
                </button>

                <button
                    onClick={limpiar}
                    className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                    Limpiar
                </button>
            </div>
        </div>
    )
}