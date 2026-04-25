import { useEffect, useState } from "react";
import { getEspecialidades, crearEspecialidad } from "../../api/especialidadesApi";
import { useNavigate } from "react-router-dom";
import EspecialidadesTable from "../../components/especialidades/EspecialidadesTable";
import EspecialidadForm from "../../components/especialidades/EspecialidadForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";

export default function EspecialidadesPage() {
  const [open, setOpen] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const {user, loading} = useAuth();
  const navigate = useNavigate();
   useEffect(() => {
       if (loading) return;

       getEspecialidades().then(setEspecialidades);
       },[loading]);
  const agregarEspecialidad = async(data) => {
      const nueva = await crearEspecialidad(data);
    setEspecialidades([...especialidades, nueva]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Especialidades</h1>
        {hasPermission(user, "crear_especialidad") && (
        <button
          onClick={() => navigate("/especialidades/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nueva especialidad
        </button>
        )}
      </div>

      <EspecialidadesTable especialidades={especialidades} />

      <Modal open={open} onClose={() => setOpen(false)} formId="especialidad-form">
        <EspecialidadForm onSubmit={agregarEspecialidad} />
      </Modal>
    </div>
  );
}
