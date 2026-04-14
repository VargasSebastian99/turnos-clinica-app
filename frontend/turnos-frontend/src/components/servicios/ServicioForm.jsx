import { useEffect, useState } from "react";

export default function ServicioForm({ initialValues, onSubmit, especialidades }) {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [duracionMinutos, setDuracion] = useState(initialValues.duracionMinutos || "");
  const [precio, setPrecio] = useState(initialValues.precio || "");
  const [especialidadId, setEspecialidadId] = useState(initialValues.especialidad?.id || "");

  // Cargar valores iniciales
  useEffect(() => {
    if (initialValues) {
      setNombre(initialValues.nombre ?? "");
      setDuracion(initialValues.duracionMinutos ?? "");
      setPrecio(initialValues.precio ?? "");
      setEspecialidadId(initialValues.especialidad?.id ?? "");
    }
  }, [initialValues]);


  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      nombre,
      duracionMinutos: Number(duracionMinutos),
      precio: Number(precio),
      especialidad: { id: Number(especialidadId) }
    });
  };

  return (
    <form id="servicio-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Nuevo servicio</h2>

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

      {/* Duración */}
      <div>
        <label className="block text-sm font-medium">Duración (minutos)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={duracionMinutos}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-medium">Precio</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>
    </form>
  );
}
