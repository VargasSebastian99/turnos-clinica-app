import { useEffect, useState } from "react";

export default function EspecialidadForm({ initialValues,onSubmit }) {
   const [nombre, setNombre] = useState("");

  

  // Cargar valores iniciales
  useEffect(() => {
    if (initialValues) {
      setNombre(initialValues.nombre ?? "");
      
    }
  }, [initialValues]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre });
  };

  return (
    <form id="especialidad-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Nueva especialidad</h2>

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

    </form>
  );
}
