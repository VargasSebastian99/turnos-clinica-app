import { useEffect,useState } from "react";
import { getServicios, crearServicio } from "../../api/serviciosApi";
import { getEspecialidades } from "../../api/especialidadesApi";
import { useNavigate } from "react-router-dom";
import ServiciosTable from "../../components/servicios/ServiciosTable";
import ServicioForm from "../../components/servicios/ServicioForm";
import Modal from "../../components/common/Modal";

export default function ServiciosPage() {
  const [open, setOpen] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        getServicios().then(setServicios);
        getEspecialidades().then(setEspecialidades);
        },[]);
  const agregarServicio = async(data) => {
      const nuevo = await crearServicio(data);
    setServicios([...servicios, nuevo]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Servicios</h1>

        <button
          onClick={() => navigate("/servicios/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo servicio
        </button>
      </div>

      <ServiciosTable servicios={servicios} />

      <Modal open={open} onClose={() => setOpen(false)} formId="servicio-form">
        <ServicioForm
            onSubmit={agregarServicio}
            especialidades={especialidades}
         />
      </Modal>
    </div>
  );
}
