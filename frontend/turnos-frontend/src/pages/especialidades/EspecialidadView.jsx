import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEspecialidadById } from "../../api/especialidadesApi";
import { useAuth } from "../../hooks/useAuth";
import { hasPermission } from "../../utils/permissions";
import EntityViewLayout from "../../layouts/EntityViewLayout";

export default function EspecialidadView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [especialidad, setEspecialidad] = useState(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        getEspecialidadById(id).then(setEspecialidad);  
    }, [id, loading]);

    if (!especialidad) return <div>Cargando...</div>;
    return (
        <EntityViewLayout
            title={`Especialidad: ${especialidad.nombre}`}
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
                        <p><strong>Nombre:</strong> {especialidad.nombre}</p>
                        <p><strong>Activo:</strong> {especialidad.activo ? "Sí" : "No"}</p>
                    </div>
                </div>
            )}
            {tab === "auditoria" && (
                <div className="space-y-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <p><strong>Auditoría:</strong> {especialidad.auditoria}</p>
                    </div>
                </div>
            )}  
        </EntityViewLayout>
    );
}