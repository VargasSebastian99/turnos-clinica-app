import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EspecialidadForm from "./EspecialidadForm";
import Modal from "../common/Modal";
import { crearEspecialidad, getEspecialidades } from "../../api/especialidadesApi";

export default function EspecialidadCreate() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);


  function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }

    function confirmCreate() {
    crearEspecialidad(formData)
    .then(() => navigate("/especialidades"));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nueva Especialidad</h1>
        <EspecialidadForm 
            initialValues={{
                nombre: "",
                descripcion: ""
            }}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3 mt-4">
            <button
                form="especialidad-form"
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Guardar
            </button>
            <button
                type="button"                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
            >
                Cancelar
            </button>
         
        </div>
         
        <Modal
            Open={openModal}
            title="Confirmar"
            message="¿Confirmar Nueva Especialidad?"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            onClose={() => setOpenModal(false)}
            onConfirm={confirmCreate}
        >
        </Modal>
    </div>
  );
}