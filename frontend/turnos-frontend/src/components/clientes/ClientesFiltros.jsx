import { useState } from "react";

export default function ClientesFiltros({ onFiltrar }){
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    const limpiar = () =>{
        setNombre("");
        setEmail("");
        onFiltrar(null, 0);
    };
    const filtrar = () =>{
        onFiltrar(
            {
                nombre: nombre || null,
                email: email || null
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
                <label>Email</label>
                <input
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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