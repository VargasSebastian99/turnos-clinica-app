import { useState, useEffect } from "react";
import { getTurnos, crearTurno } from "../../api/turnosApi";
import { getClientes } from "../../api/clientesApi";
import { getProfesionales } from "../../api/profesionalesApi";
import { getServicios } from "../../api/serviciosApi";
import { useNavigate } from "react-router-dom";
import TurnosTable from "../../components/turnos/TurnosTable";
import TurnoForm from "../../components/turnos/TurnoForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
import TurnosFiltros from "../../components/turnos/turnosFiltros";
import { buscarTurnos } from "../../api/turnosFilterApi";
import Pagination from "../../components/common/Paginacion";
export default function TurnosPage() {
  const [open, setOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();
  const {user, loading } = useAuth();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filtrosActivos, setFiltrosActivos] = useState({});

  const filtrar = async (filtros, nuevaPagina = page) => {
    const filtrosCompletos = { ...filtrosActivos, ...filtros}
    const data = await buscarTurnos({ ...filtrosCompletos, page: nuevaPagina, size });
    console.log("Respuesta ", data);
    setFiltrosActivos(filtrosCompletos);
    setTurnos(data.content);
    setTotalPages(data.totalPages);
    setPage(data.number);
  };
  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario
    //getTurnos().then(data => setTurnos(data || []));
    getTurnos().then(setTurnos);
    getClientes().then(setClientes);
    getProfesionales().then(setProfesionales);
    getServicios().then(setServicios);
  }, [loading]);

  const agregarTurno = async (data) => {
      try{
    const nuevo = await crearTurno(data);
    setTurnos(prev => [...prev, nuevo]);
    setOpen(false);
    } catch(err){
        alert(err.message);
        }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Turnos</h1>
        {hasPermission(user, "crear_turno") && (
        <button
          onClick={() => navigate("/turnos/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo turno
        </button>
        )}
      </div>
      <TurnosFiltros onFiltrar={filtrar} />
      <TurnosTable turnos={turnos} />
      <Pagination 
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => filtrar({}, newPage)}
      />
      <div className="flex justify-center mt-4">
        <select
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
            filtrar({}, 0);
          }}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
    </div>

      <Modal open={open} onClose={() => setOpen(false)} formId="turno-form">
        <TurnoForm
          onSubmit={agregarTurno}
          profesionales={profesionales}
          clientes={clientes}
          servicios={servicios}
        />
      </Modal>
    </div>
  );
}