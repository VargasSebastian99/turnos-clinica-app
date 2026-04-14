import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClienteForm from "./ClienteForm";
import Modal from "../common/Modal";
import { editarCliente, getClienteById } from "../../api/clientesApi";

export default function ClienteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        {/*fetch(`http://localhost:8080/clientes/${id}`)
            .then(response => response.json())
            .then(setCliente);
        */} 
        getClienteById(id).then(data => setCliente(data));
    }, []);

    if (!cliente) return <div>Cargando...</div>;
    function handleSubmit(data) {
        setFormData(data);
        setOpenModal(true);
    }
    function confirmUpdate() {
        {/*fetch(`http://localhost:8080/clientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(() => navigate(`/clientes/${id}`));
        */}
        editarCliente(id, formData).then(() => navigate(`/clientes`));
    }
    return(
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Editar Cliente</h1>
            <ClienteForm
                initialValues={cliente}
                onSubmit={handleSubmit}
            />
            <div className="flex gap-3">
                <button
                    form="cliente-form"
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
                title="Confirmar"
                message="¿Confirmar Actualización de Cliente?"
                onConfirm={confirmUpdate}
                onClose={() => setOpenModal(false)}
                confirmLabel="Confirmar"
                cancelLabel="Cancelar"
                onCancel={() => setOpenModal(false)}
            ></Modal>
        </div>
    );
}