import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TurnoForm from "./TurnoForm";
import Modal from "../common/Modal";
import { editarTurno, getTurnoById } from "../../api/turnosApi";
import { getProfesionales } from "../../api/profesionalesApi";
import { getServicios } from "../../api/serviciosApi";
import { getClientes } from "../../api/clientesApi";

export default function TurnoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turno, setTurno] = useState(null);
  const [profesionales, setProfesionales] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getTurnoById(id).then(setTurno);
    getProfesionales().then(setProfesionales);
    getServicios().then(setServicios);
    getClientes().then(setClientes);
  }, [id]);

  if (!turno || profesionales.length === 0 || clientes.length === 0 || servicios.length === 0) return <div>Cargando...</div>;

  function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }

  function confirmUpdate() {
    editarTurno(id, formData)
    .then(() => navigate(`/turnos/${id}`));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Editar Turno</h1>
        <TurnoForm 
            initialValues={turno}
            profesionales={profesionales}
            clientes={clientes}
            servicios={servicios}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3">
            <button
                form="turno-form"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Guardar Cambios
            </button>

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
                Cancelar
            </button>
            </div>

        <Modal
             Open={openModal}
             title = "Confirmar"
             message = "¿Confirmar edición de turno?"
             onClose={() => setOpenModal(false)}
             onConfirm={confirmUpdate}
        >
        </Modal>
        </div>

    
  );
}