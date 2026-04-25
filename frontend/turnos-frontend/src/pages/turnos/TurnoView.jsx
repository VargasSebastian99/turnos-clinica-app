import EntityViewLayout from "../../layouts/EntityViewLayout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getTurnoById } from "../../api/turnosApi";
import { hasPermission } from "../../utils/permissions";
export default function TurnoView(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [turno, setTurno] = useState(null);
    const {user, loading} = useAuth();

    useEffect(() => {
        if (loading) return;
        getTurnoById(id).then(setTurno);
    }, [id, loading]);

    if (loading) return <div>Cargando usuario...</div>;
    if (!turno) return <div>Cargando...</div>;

    if (!hasPermission(user, "ver_turnos")) {
        return <div>No tenés permisos para ver este turno</div>;
    }

    return(
        <EntityViewLayout
            title={`Turno #${turno.id} - ${turno.clienteNombre}`}
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
                        <h2 className="text-lg font-semibold">Datos del Turno</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Fecha:</strong> {turno.fecha}</p>
                        <p><strong>Hora:</strong> {turno.hora}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Cliente</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.clienteNombre}</p>
                        <p><strong>Email:</strong> {turno.clienteEmail}</p>
                        <p><strong>Teléfono:</strong> {turno.clienteTelefono}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Profesional</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.profesionalNombre}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Servicio</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.servicioNombre}</p>
                        <p><strong>Duración (minutos):</strong> {turno.duracion}</p>
                    </div>
                </div>
            )}

            {tab === "auditoria" && (
                <div>
                    <h2>Auditoría del Turno</h2>
                    <p>Historial de cambios para el turno #{turno.id}</p>
                </div>
            )}
        </EntityViewLayout>
    );
}