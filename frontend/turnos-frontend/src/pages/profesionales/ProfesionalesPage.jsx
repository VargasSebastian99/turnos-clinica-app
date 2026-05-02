import { useEffect, useState } from "react";
import { getEspecialidades } from "../../api/especialidadesApi";
import { useNavigate } from "react-router-dom";
import ProfesionalesTable from "../../components/profesionales/ProfesionalesTable";
import ProfesionalForm from "../../components/profesionales/ProfesionalForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
import ProfesionalesFiltros from "../../components/profesionales/ProfesionalesFiltros";
import Pagination from "../../components/common/Paginacion";
import { buscarProfesionales } from "../../api/profesionalesFilterApi";

export default function ProfesionalesPage() {
  const [open, setOpen] = useState(false);
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const { user, loading } = useAuth();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [filtros, setFiltros] = useState({});

  const navigate = useNavigate();

  
  useEffect(() => {
    if (loading) return;

    filtrar({}, 0); // carga inicial con paginación real
    getEspecialidades().then(setEspecialidades);
  }, [loading]);

  
  const filtrar = async (nuevosFiltros = null, nuevaPagina = 0) => {
    const filtrosCompletos = 
      nuevosFiltros === null
        ? {} 
        : { ...filtros, ...nuevosFiltros };

    const data = await buscarProfesionales({
      ...filtrosCompletos,
      page: nuevaPagina,
      size
    });

    setFiltros(filtrosCompletos);
    setProfesionales(data.content);
    setTotalPages(data.totalPages);
    setPage(data.number);
  };

  const agregarProfesional = async (data) => {
    setOpen(false);
    filtrar({}, 0); // recargar lista después de crear
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profesionales</h1>

        {hasPermission(user, "crear_profesional") && (
          <button
            onClick={() => navigate("/profesionales/crear")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nuevo profesional
          </button>
        )}
      </div>

      <ProfesionalesFiltros
        especialidades={especialidades}
        onFiltrar={filtrar}
      />

      <ProfesionalesTable profesionales={profesionales} />

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
          }}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
    </div>

      <Modal open={open} onClose={() => setOpen(false)} formId="profesional-form">
        <ProfesionalForm
          onSubmit={agregarProfesional}
          especialidades={especialidades}
        />
      </Modal>
    </div>
  );
}
