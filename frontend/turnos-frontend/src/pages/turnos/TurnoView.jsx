import EntityViewLayout from "../../layouts/EntityViewLayout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
export default function TurnoView(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("info");
    const [turno, setTurno] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/turnos/${id}`)
            .then(response => response.json())
            .then(setTurno);
    }, [id]);
    if (!turno) return <div>Cargando...</div>;
    return(
        <EntityViewLayout
            title={`Turno #${turno.id} - ${turno.cliente.nombre} ${turno.cliente.apellido}`}
            tabs={[
                { id: "info", label: "Información" },
                { id: "auditoria", label: "Auditoría"   }
            ]}
            activeTab={tab}
            onTabChange={setTab}
            onBack={() => navigate(-1)}
        >
            {tab === "info" && (
                <div className="space-y-4">
                    {/*card 1*/}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Turno</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Fecha:</strong> {turno.fecha}</p>
                        <p><strong>Hora:</strong> {turno.hora}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Cliente</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.cliente.nombre}</p>
                        <p><strong>Email:</strong> {turno.cliente.email}</p>
                        <p><strong>Teléfono:</strong> {turno.cliente.telefono}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Profesional</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.profesional.nombre}</p>
                        
                        
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Datos del Servicio</h2>
                        <div className="border-b my-3"></div>
                        <p><strong>Nombre:</strong> {turno.servicio.nombre}</p>
                        <p><strong>Duración (minutos):</strong> {turno.servicio.duracionMinutos}</p>
                    </div>
                </div>
                
            )}
            {tab === "auditoria" && (
                <div>
                    <h2>Auditoría del Turno</h2>
                    <p>Historial de cambios para el turno # {turno.id}</p>
                    {/* Agrega el historial de auditoría aquí */}
                </div>
            )}
        </EntityViewLayout>
    );
}