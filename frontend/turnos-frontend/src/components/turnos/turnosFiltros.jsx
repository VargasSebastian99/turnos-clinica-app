import { useState } from "react";
import { getTurnos } from "../../api/turnosApi";
export default function TurnosFiltros({ onFiltrar }) {
    const [estado, setEstado] = useState("");
    const [profesionalId, setProfesionalId] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [servicioId, setServicioId] = useState("");

    const aplicarFiltros = () => {
        onFiltrar({ estado, profesionalId, clienteId, desde, hasta, servicioId },0);
    };

    const limpiarFiltros = () => {
    const filtrosVacios = {
        estado: "",
        profesionalId: "",
        clienteId: "",
        desde: "",
        hasta: "",
        servicioId: ""
    };

    setEstado("");
    setProfesionalId("");
    setClienteId("");
    setDesde("");
    setHasta("");
    setServicioId("");

    onFiltrar(filtrosVacios);
};

    return (
        <div className="filtros-container">
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
            </select>
            <input
                type="number"
                placeholder="Profesional"
                value={profesionalId}
                onChange={(e) => setProfesionalId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
            />
            <input
                type="date"
                placeholder="Desde"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
            />
            <input
                type="date"
                placeholder="Hasta"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
            />
            <input
                type="number"
                placeholder="Servicio"
                value={servicioId}
                onChange={(e) => setServicioId(e.target.value)}
            />
            <div className="flex justify-end gap-5 mt-6">
            <button onClick={aplicarFiltros}
                 className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                    Filtrar</button>
            <button onClick={limpiarFiltros}
             className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
                Limpiar</button>
            </div>

        </div>
    );
}