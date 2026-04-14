import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfesionalForm from "./ProfesionalForm";
import Modal from "../common/Modal";
import { crearProfesional } from "../../api/profesionalesApi";
import { getEspecialidades } from "../../api/especialidadesApi";

export default function ProfesionalCreate() {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getEspecialidades().then(setEspecialidades);
    }, []);

    if (!especialidades.length) return <div>Cargando...</div>;
    function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }
  function confirmCreate() {
    crearProfesional(formData)
    .then(() => navigate("/profesionales"));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuevo Profesional</h1>
        <ProfesionalForm initialValues={{
            nombre: "",
            especialidadId: "",
            estado: "ACTIVO",
            horaInicioManiana: "",
            horaFinManiana: "",
            horaInicioTarde: "",
            horaFinTarde: ""

        }}
        onSubmit={handleSubmit} especialidades={especialidades} 
        />
        <div className="flex gap-3 mt-4">
            <button
                form="profesional-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >Crear Profesional</button>
            <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700"
                onClick={() => navigate("/profesionales")}
            >
                Cancelar
            </button>
        </div>
        <Modal
            Open={openModal}
            title="Confirmar"
            message="¿Confirma que desea crear este profesional?"
            onConfirm={confirmCreate}
            onCancel={() => setOpenModal(false)}
            onClose={() => setOpenModal(false)}
        />
    </div>
  );
}