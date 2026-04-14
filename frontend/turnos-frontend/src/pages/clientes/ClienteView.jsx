import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EntityViewLayout from "../../layouts/EntityViewLayout";  

export default function ClienteView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/clientes/${id}`)
            .then(response => response.json())
            .then(setCliente);
    }, [id]);

    if (!cliente) return <div>Cargando...</div>;    

    return (
        <EntityViewLayout
            title={`Cliente: ${cliente.nombre} ${cliente.apellido}`}
            tabs={[
                { id: "info", label: "Información" },
                { id: "auditoria", label: "Auditoría" }
            ]}
            activeTab={tab}
            onTabChange={setTab}
            onBack={() => navigate(-1)}
        >
            {tab === "info" && (
                <div className="space-y-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Cliente</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nro° Cliente:</strong> {cliente.id}</p>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Email:</strong> {cliente.email}</p>
                        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                    </div>
                </div>
            )}
            {tab === "auditoria" && (
                <div>
                    <h2>Auditoría del Cliente</h2>
                    <p>Historial de cambios para el cliente # {cliente.id}</p>
                </div>
            )}
        </EntityViewLayout>
    );
}