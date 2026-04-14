const API_URL = "http://localhost:8080/servicios";
// listar todos
export async function getServicios() {
  const res = await fetch(API_URL);
  return res.json();
}

// obtener uno por ID
export async function getServicioById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el servicio");
  return res.json();
}
//editar 
export async function editarServicio(id, data) {
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
//crear
export async function crearServicio(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
//eliminar  
export async function eliminarServicio(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }
  return true;
} 