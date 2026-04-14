const API_URL = "http://localhost:8080/clientes";
// listar todos
export async function getClientes() {
  const res = await fetch(API_URL);
  return res.json();
}
//crear
export async function crearCliente(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
// obtener uno por ID
export async function getClienteById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el cliente");
  return res.json();
}
// editar
export async function editarCliente(id, data) {
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
export async function eliminarCliente(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }
  return true;
}
