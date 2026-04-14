const API_URL = "http://localhost:8080/especialidades";
// listar todas
export async function getEspecialidades() {
  const res = await fetch(API_URL);
  return res.json();
}
// crear
export async function crearEspecialidad(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
// obtener una por ID
export async function getEspecialidadById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener la especialidad");
  return res.json();
}
// editar
export async function editarEspecialidad(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }
  return res.json();
}
// eliminar
export async function eliminarEspecialidad(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }
  return true;
}