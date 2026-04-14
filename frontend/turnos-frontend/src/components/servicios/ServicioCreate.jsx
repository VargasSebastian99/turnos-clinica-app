import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicioForm from "./ServicioForm";
import { getEspecialidades } from "../../api/especialidadesApi";
import Modal from "../common/Modal";
import { crearServicio } from "../../api/serviciosApi";

export default function ServicioCreate() {
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
    crearServicio(formData)
    .then(() => navigate("/servicios"));
  }

  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuevo Servicio</h1>
        <ServicioForm 
            initialValues={{
                nombre: "",
                duracionMinutos: "",
                precio: "",
                especialidad: { id: "" }
            }}
            especialidades={especialidades}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3 mt-4">
            <button
                form="servicio-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Crear servicio
            </button>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
            >
                Cancelar
            </button>
        </div>  
        <Modal
            Open={openModal}
            title="Confirmar"
            message="¿Confirmar Nuevo Servicio?"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            onConfirm={confirmCreate}
            onCancel={() => setOpenModal(false)}
        />
    </div>
  );
}
 
