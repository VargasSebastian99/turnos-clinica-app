import { useEffect,useState } from "react";

export default function ClienteForm({ initialValues,onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [obraSocial, setObraSocial] = useState("");
  const [notas, setNotas] = useState("");

  // Cargar valores iniciales
  useEffect(() => {
    if (initialValues) {
      setNombre(initialValues.nombre ?? "");
      setApellido(initialValues.apellido ?? "");
      setDni(initialValues.dni ?? "");
      setTelefono(initialValues.telefono ?? "");
      setEmail(initialValues.email ?? "");
      setObraSocial(initialValues.obraSocial ?? "");
      setNotas(initialValues.notas ?? "");
    }
  }, [initialValues]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      email,
      telefono
    });
  };

  return (
    <form id="cliente-form" onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Nuevo cliente</h2>

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
{/*
      <div>
        <label className="block text-sm font-medium">Apellido</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">DNI</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>
*/}


      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Teléfono</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      {/*
      <div>
        <label className="block text-sm font-medium">Obra social</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={obraSocial}
          onChange={(e) => setObraSocial(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Notas</label>
        <textarea
          className="w-full border p-2 rounded"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>
      */}
    </form>
  );
}
