import { useEffect, useState } from "react";

export default function TurnoForm({ initialValues, onSubmit, profesionales, clientes, servicios }) {
  const [profesionalId, setProfesionalId] = useState(null);
  const [clienteId, setClienteId] = useState(null);
  const [servicioId, setServicioId] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

 useEffect(() => {
  if (initialValues) {
    setProfesionalId(initialValues.profesionalId ?? null);
    setClienteId(initialValues.clienteId ?? null);
    setServicioId(initialValues.servicioId ?? null);
    setFecha(initialValues.fecha ?? "");
    setHora(initialValues.hora ?? "");
  }
}, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      clienteId: clienteId,
      profesionalId: profesionalId,
      servicioId: servicioId,
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
          value={profesionalId ?? ""}
          onChange={(e) => setProfesionalId(Number(e.target.value))}
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
          value={clienteId ?? ""}
          onChange={(e) => setClienteId(Number(e.target.value))}
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
          value={servicioId ?? ""}
          onChange={(e) => setServicioId(Number(e.target.value))}
          required
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
    </form>
  );
}
