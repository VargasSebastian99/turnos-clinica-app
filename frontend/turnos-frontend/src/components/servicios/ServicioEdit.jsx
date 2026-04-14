import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServicioForm from "./ServicioForm";
import Modal from "../common/Modal";
import { editarServicio,getServicioById } from "../../api/serviciosApi";
import { getEspecialidades } from "../../api/especialidadesApi";
export default function ServicioEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getServicioById(id).then(setServicio);
    getEspecialidades().then(setEspecialidades);
  }, [id]);
  
  if (!servicio || especialidades.length === 0) return <div>Cargando...</div>;

  function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }

  function confirmUpdate() {
     editarServicio(id, formData)
    .then(() => navigate(`/servicios`));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Editar Servicio</h1>
        <ServicioForm 
            initialValues={servicio}
            especialidades={especialidades}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3">
            <button
                form="servicio-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Guardar cambios
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
            title="Confirmar Edición"
            message="¿Estás seguro de que quieres actualizar este servicio?"
             confimmLabel="Guardar"
             cancelLabel="Cancelar"
            onClose={() => setOpenModal(false)}
            onConfirm={confirmUpdate}
        >
        </Modal>
    </div>

  );
}