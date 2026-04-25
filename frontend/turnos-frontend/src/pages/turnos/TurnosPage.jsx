import { useState, useEffect } from "react";
import { getTurnos, crearTurno } from "../../api/turnosApi";
import { getClientes } from "../../api/clientesApi";
import { getProfesionales } from "../../api/profesionalesApi";
import { getServicios } from "../../api/serviciosApi";
import { useNavigate } from "react-router-dom";
import TurnosTable from "../../components/turnos/TurnosTable";
import TurnoForm from "../../components/turnos/TurnoForm";
import Modal from "../../components/common/Modal";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
export default function TurnosPage() {
  const [open, setOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();
  const {user, loading } = useAuth();
  
  useEffect(() => {
    if (loading) return; // Esperar a que se cargue el usuario
    //getTurnos().then(data => setTurnos(data || []));
    getTurnos().then(setTurnos);
    getClientes().then(setClientes);
    getProfesionales().then(setProfesionales);
    getServicios().then(setServicios);
  }, [loading]);

  const agregarTurno = async (data) => {
      try{
    const nuevo = await crearTurno(data);
    setTurnos(prev => [...prev, nuevo]);
    setOpen(false);
    } catch(err){
        alert(err.message);
        }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Turnos</h1>
        {hasPermission(user, "crear_turno") && (
        <button
          onClick={() => navigate("/turnos/crear")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo turno
        </button>
        )}
      </div>
      
      <TurnosTable turnos={turnos} />

      <Modal open={open} onClose={() => setOpen(false)} formId="turno-form">
        <TurnoForm
          onSubmit={agregarTurno}
          profesionales={profesionales}
          clientes={clientes}
          servicios={servicios}
        />
      </Modal>
    </div>
  );
}