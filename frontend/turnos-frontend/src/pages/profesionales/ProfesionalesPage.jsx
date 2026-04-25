import { useEffect,useState } from "react";
import { getProfesionales, crearProfesional } from "../../api/profesionalesApi";
import { getEspecialidades } from "../../api/especialidadesApi";
import { useNavigate } from "react-router-dom";
import ProfesionalesTable from "../../components/profesionales/ProfesionalesTable";
import ProfesionalForm from "../../components/profesionales/ProfesionalForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";


export default function ProfesionalesPage() {
  const [open, setOpen] = useState(false);
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const {user, loading} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario  
    getProfesionales().then(setProfesionales);
    getEspecialidades().then(setEspecialidades);
  }, [loading]);

  const agregarProfesional = async (data) => {
    const nuevo = await crearProfesional(data);
    setProfesionales([...profesionales, nuevo]);
    setOpen(false);
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

      <ProfesionalesTable profesionales={profesionales} />

      <Modal open={open} onClose={() => setOpen(false)} formId="profesional-form">
        <ProfesionalForm
          onSubmit={agregarProfesional}
          especialidades={especialidades}
        />
      </Modal>
    </div>
  );
}
