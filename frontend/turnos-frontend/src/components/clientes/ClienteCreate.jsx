import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteForm from "./ClienteForm";
import Modal from "../common/Modal";
import { crearCliente, getClientes } from "../../api/clientesApi";

export default function ClienteCreate() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(null);

    function handleSubmit(data) {
        setFormData(data);
        setOpenModal(true);
    }
    function confirmCreate() {
        crearCliente(formData)
        .then(() => navigate("/clientes"));
    }
    return(
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Nuevo Cliente</h1>
            <ClienteForm
                initialValues={{
                    nombre: "",
                    apellido: "",
                    dni: "",
                    telefono: "",
                    email: "",
                    obraSocial: "",
                    notas: ""
                }}
                onSubmit={handleSubmit}
            />
            <div className="flex gap-3 mt-4">
                <button
                    form="cliente-form"
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >Crear Cliente</button>
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700"
                    onClick={() => navigate("/clientes")}
                >
                    Cancelar
                </button>
                </div>
            <Modal
                Open={openModal}
                title="Confirmar"
                message="¿Confirmar Nuevo Cliente?"
                onConfirm={confirmCreate}
                onClose={() => setOpenModal(false)}
                confirmLabel="Confirmar"
                cancelLabel="Cancelar"
            ></Modal>
        </div>
    );
}