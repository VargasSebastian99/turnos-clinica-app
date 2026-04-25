import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EntityViewLayout from "../../layouts/EntityViewLayout";
import { useAuth } from "../../hooks/useAuth";
import { hasPermission } from "../../utils/permissions";
import { getServicioById } from "../../api/serviciosApi";
export default function ServicioView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [servicio, setServicio] = useState(null);
  const { user, loading } = useAuth();  
  useEffect(() => {
    if (loading) return;
    getServicioById(id).then(setServicio); 
  }, [id, loading]);
  
  if (!servicio) return <div>Cargando...</div>;

  return (
    <EntityViewLayout
      title={`Servicio ${servicio.nombre}`}
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
            <h2 className="text-lg font-semibold">Información del Servicio</h2>
            <div className="border-b my-3"></div>
            <p><strong>Nombre:</strong> {servicio.nombre}</p>
            <p><strong>Duración:</strong> {servicio.duracionMinutos} min</p>
          </div>
        </div>
      )}

      {tab === "auditoria" && (
        <div>
          <h2>Auditoría del Servicio</h2>
          <p>Historial de cambios para el servicio {servicio.nombre}</p>
        </div>
      )}
    </EntityViewLayout>
  );
}
