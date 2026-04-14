import { useEffect,useState } from "react";

export default function TurnoForm({ initialValues, onSubmit, profesionales, clientes, servicios }) {
  const [profesionalId, setProfesionalId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("PENDIENTE");
const profesionalSeleccionado = profesionales.find(p => p.id === Number(profesionalId));
const serviciosFiltrados = profesionalSeleccionado?.servicios ?? [];

    useEffect(() => {
      if(initialValues){
        setProfesionalId(initialValues.profesional?.id ?? "");
        setClienteId(initialValues.cliente?.id ?? "");
        setServicioId(initialValues.servicio?.id ?? "");
        setFecha(initialValues.fecha ?? "");
        setHora(initialValues.hora ?? "");
        setEstado(initialValues.estado ?? "PENDIENTE");
      }
}, []);



const handleSubmit = (e) => {
  e.preventDefault();

  const fechaHora = `${fecha}T${hora}:00`;

  onSubmit({
    profesional: { id: Number(profesionalId) },
    cliente: { id: Number(clienteId) },
    servicio: { id: Number(servicioId) },
    fecha,
    hora
  });
};

  return (
    <form id="turno-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Nuevo turno</h2>

      {/* Profesional */}
      <div>
        <label className="block text-sm font-medium">Profesional</label>
        <select
          className="w-full border p-2 rounded"
          value={profesionalId}
          onChange={(e) => setProfesionalId(e.target.value)}
          required
        >
          <option value="">Seleccione un profesional</option>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Cliente */}
      <div>
        <label className="block text-sm font-medium">Cliente</label>
        <select
          className="w-full border p-2 rounded"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} {c.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Servicio */}
      <div>
        <label className="block text-sm font-medium">Servicio</label>
        <select
          className="w-full border p-2 rounded"
          value={servicioId}
          onChange={(s) => setServicioId(s.target.value)}
          required
          disabled={!profesionalId}
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium">Fecha</label>
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      {/* Hora */}
      <div>
        <label className="block text-sm font-medium">Hora</label>
        <input
          type="time"
          className="w-full border p-2 rounded"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          className="w-full border p-2 rounded"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="CONFIRMADO">Confirmado</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="Ausente">Ausente</option>
          <option value="ATENDIDO">Atendido</option>
        </select>
      </div>
    </form>
  );
}
