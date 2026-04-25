import {use, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfesionalById } from "../../api/profesionalesApi";
import EntityViewLayout from "../../layouts/EntityViewLayout";
import { useAuth } from "../../hooks/useAuth";
export default function ProfesionalView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [profesional, setProfesional] = useState(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        getProfesionalById(id).then(setProfesional);
    }, [id, loading]);

    if (!profesional) return <div>Cargando...</div>;
    return (
        <EntityViewLayout
            title={`Profesional: ${profesional.nombre} ${profesional.apellido}`}
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
                        <h2 className="text-lg font-semibold">Datos del Profesional</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {profesional.nombre}</p>
                        <p><strong>Especialidad:</strong> {profesional.especialidadNombre}</p>
                        <p><strong>Estado:</strong> {profesional.estado ? "Activo" : "Inactivo"}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Horarios</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Turno Mañana:</strong> {profesional.horaInicioManiana} - {profesional.horaFinManiana}</p>
                        <p><strong>Turno Tarde:</strong> {profesional.horaInicioTarde} - {profesional.horaFinTarde}</p>
                    </div>
                </div>
            )}
            {tab === "auditoria" && (
                <div>
                    <h2>Auditoría del Profesional</h2>
                    <p>Historial de cambios para el profesional # {profesional.id}</p>
                </div>
            )}
        </EntityViewLayout>
    );
}