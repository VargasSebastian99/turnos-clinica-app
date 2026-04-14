import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EspecialidadForm from "./EspecialidadForm";
import Modal from "../common/Modal";

export default function EspecialidadEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [especialidad, setEspecialidad] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/especialidades/${id}`)
            .then(response => response.json())
            .then(setEspecialidad);
    }, [id]);
    function handleSubmit(data) {
        setFormData(data);
        setOpenModal(true);
    }
    function confirmUpdate() {
        fetch(`http://localhost:8080/especialidades/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(() => navigate(`/especialidades/${id}`));
    }
    if (!especialidad) return <div>Cargando...</div>;
    return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Editar Especialidad</h1>
        <EspecialidadForm
            initialValues={especialidad}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3">
            <button
                form="especialidad-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Guardar
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
        title="Confirmar Edicion"
        message="¿Estas seguro de Actualizar la especialidad?"
        confirmLabel="Guardar"
        cancelLabel="Cancelar"
        onClose={() => setOpenModal(false)}
        onConfirm={confirmUpdate}
        ></Modal>
    </div>
  );
}