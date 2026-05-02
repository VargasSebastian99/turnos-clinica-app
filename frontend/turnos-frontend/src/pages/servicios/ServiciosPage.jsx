import { useEffect,useState } from "react";
import { getServicios, crearServicio } from "../../api/serviciosApi";
import { getEspecialidades } from "../../api/especialidadesApi";
import { useNavigate } from "react-router-dom";
import ServiciosTable from "../../components/servicios/ServiciosTable";
import ServicioForm from "../../components/servicios/ServicioForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
import ServiciosFiltros from "../../components/servicios/ServiciosFiltros";
import Pagination from "../../components/common/Paginacion";
import { buscarServicio } from "../../api/servicioFilterApi";

export default function ServiciosPage() {
  const [open, setOpen] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [servicios, setServicios] = useState([]);
  const {user, loading} = useAuth();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filtros, setFiltros] = useState({});
  const navigate = useNavigate();
    useEffect(() => {
      if (loading) return; // Esperar a que se cargue el usuario
        getServicios().then(setServicios);
        getEspecialidades().then(setEspecialidades);
        },[loading]);
  const filtrar = async (nuevosFiltros = null, nuevaPagina = 0) =>{
    const filtrosCompletos = 
      nuevosFiltros === null
        ? {}
        : {...filtros, ...nuevosFiltros};
    const data = await buscarServicio({
      ...filtrosCompletos,
      page: nuevaPagina,
      size
    });
    console.log("Data ", data);
    setFiltros(filtrosCompletos);
    setServicios(data.content);
    setTotalPages(data.totalPages);
    setPage(data.number);
  };
  const agregarServicio = async(data) => {
      const nuevo = await crearServicio(data);
    setServicios([...servicios, nuevo]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Servicios</h1>
        {hasPermission(user, "crear_servicio") && (
        <button
          onClick={() => navigate("/servicios/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo servicio
        </button>
        )}
      </div>

      <ServiciosFiltros
        especialidades={especialidades}
        onFiltrar={filtrar}
      />
      <ServiciosTable servicios={servicios} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => filtrar(filtros, newPage)}
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
      <Modal open={open} onClose={() => setOpen(false)} formId="servicio-form">
        <ServicioForm
            onSubmit={agregarServicio}
            especialidades={especialidades}
         />
      </Modal>
    </div>
  );
}
