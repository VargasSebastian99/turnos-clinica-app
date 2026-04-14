import { useEffect, useState } from "react";

export default function ProfesionalForm({ initialValues, onSubmit, especialidades }) {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [especialidadId, setEspecialidadId] = useState(initialValues.especialidadId || "");
  const [estado, setEstado] = useState(initialValues.estado || "ACTIVO");

  const [horaInicioManiana, setHoraInicioManiana] = useState(initialValues.horaInicioManiana || "");
  const [horaFinManiana, setHoraFinManiana] = useState(initialValues.horaFinManiana || "");
  const [horaInicioTarde, setHoraInicioTarde] = useState(initialValues.horaInicioTarde || "");
  const [horaFinTarde, setHoraFinTarde] = useState(initialValues.horaFinTarde || "");


  // Cargar valores iniciales
  useEffect(() => {
    if (initialValues) {
      setNombre(initialValues.nombre ?? "");
      setEspecialidadId(initialValues.especialidadId ?? "");
      setEstado(initialValues.estado ?? "ACTIVO");
      setHoraInicioManiana(initialValues.horaInicioManiana ?? "");
      setHoraFinManiana(initialValues.horaFinManiana ?? "");
      setHoraInicioTarde(initialValues.horaInicioTarde ?? "");
      setHoraFinTarde(initialValues.horaFinTarde ?? "");
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const especialidad = especialidades.find(
      (e) => e.id.toString() === especialidadId
    );

    onSubmit({
      nombre,
      especialidad,
      estado,
      horaInicioManiana,
      horaFinManiana,
      horaInicioTarde,
      horaFinTarde,
    });
  };
  if (!especialidades) return <div> Cargando especialidades ...</div>
  return (
    <form id="profesional-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Nuevo profesional</h2>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      {/* Especialidad */}
      <div>
        <label className="block text-sm font-medium">Especialidad</label>
        <select
          className="w-full border p-2 rounded"
          value={especialidadId}
          onChange={(e) => setEspecialidadId(e.target.value)}
          required
        >
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          className="w-full border p-2 rounded"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </select>
      </div>

      {/* Horarios */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Inicio mañana</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horaInicioManiana}
            onChange={(e) => setHoraInicioManiana(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fin mañana</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horaFinManiana}
            onChange={(e) => setHoraFinManiana(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Inicio tarde</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horaInicioTarde}
            onChange={(e) => setHoraInicioTarde(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fin tarde</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horaFinTarde}
            onChange={(e) => setHoraFinTarde(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
