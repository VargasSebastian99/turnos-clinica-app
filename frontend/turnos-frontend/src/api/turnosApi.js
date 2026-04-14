const API_URL = "http://localhost:8080/turnos";

// GET: listar todos
export async function getTurnos() {
  const res = await fetch(API_URL);
  return res.json();
}

// GET: obtener uno por ID
export async function getTurnoById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el turno");
  return res.json();
}

// POST: crear
export async function crearTurno(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }

  return res.json();
}

// PUT: editar
export async function editarTurno(id, data) {
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

// DELETE: eliminar
export async function eliminarTurno(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }

  return true;
}

// PUT: cancelar turno (cambio de estado seguro)
export async function cancelarTurno(id) {
  const res = await fetch(`${API_URL}/${id}/cancelar`, {
    method: "PUT",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error desconocido");
  }

  return res.json();
}