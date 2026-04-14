import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TurnoForm from "./TurnoForm";
import Modal from "../common/Modal";
import { getProfesionales } from "../../api/profesionalesApi";
import { crearTurno } from "../../api/turnosApi";
import { getClientes } from "../../api/clientesApi";
import { getServicios } from "../../api/serviciosApi";
export default function TurnoCreate() {
  const navigate = useNavigate();
  const [profesionales, setProfesionales] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(null);

    useEffect(() => {
        getProfesionales().then(setProfesionales);
    }, []);

    useEffect(() => {
        getClientes().then(setClientes);
    }, []);

    useEffect(() => {
        getServicios().then(setServicios);
    }, []);


    if (profesionales.length === 0 || clientes.length === 0 || servicios.length === 0) return <div>Cargando...</div>;

  function handleSubmit(data) {
    setFormData(data);
    setOpenModal(true);
  }

  function confirmCreate() {
    crearTurno(formData)
    .then(() => navigate("/turnos"));
  }
  return(
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuevo Turno</h1>
        <TurnoForm
            initialValues={{
                profesional: { id: "" },
                cliente: { id: "" },
                servicio: { id: "" },
                fecha: "",
                hora: "",
                estado: "PENDIENTE"
            }}
            profesionales={profesionales}
            clientes={clientes}
            servicios={servicios}
            onSubmit={handleSubmit}
        />
        <div className="flex gap-3 mt-4">
            <button
                form="turno-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >Crear turno</button>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
            >Cancelar</button>
        </div>
        <Modal
            Open={openModal}
            title="Confirmar"
            message="¿Confirmar Nuevo Turno?"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            onConfirm={confirmCreate}
            onCancel={() => setOpenModal(false)}
        >
        </Modal>
    </div>
  );
}