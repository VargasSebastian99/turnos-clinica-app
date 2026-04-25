import {  useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfesionalForm from "./ProfesionalForm";
import Modal from "../common/Modal";
import { getProfesionalById, editarProfesional } from "../../api/profesionalesApi";
import { getEspecialidades } from "../../api/especialidadesApi";
export default function ProfesionalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profesional, setProfesional] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getProfesionalById(id).then(setProfesional);
    getEspecialidades().then(setEspecialidades);
    }, [id]);
    

    if (!profesional || especialidades.length === 0) return <div>Cargando...</div>;

    function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }
    function confirmUpdate() {
    editarProfesional(id, formData)
    .then(() => navigate(`/profesionales/${id}`));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Editar Profesional</h1>
        <ProfesionalForm 
        initialValues={profesional}
        especialidades={especialidades}
        onSubmit={handleSubmit}
        />
        <div className="flex gap-3">
            <button
                form="profesional-form"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Guardar Cambios
            </button>
            <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => navigate(`/profesionales/${id}`)}
            >
                Cancelar
            </button>

        </div>
        <Modal
            Open={openModal}
            title="Confirmar Edición"
            message="Esta seguro de guardar los cambios?"
            confirmLabel="Guardar"
            cancelLabel="Cancelar"
            onClose={() => setOpenModal(false)}
            onConfirm={confirmUpdate}
        >
        </Modal>
    </div>

  );
}