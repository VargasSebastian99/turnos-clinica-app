import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/turnos`;
// GET: listar todos
export async function getTurnos() {
  const res = await axios.get(API_URL);
  console.log("RESPUESTA API TURNOS", res.data);
  console.log("data content", res.data);
  return res.data;
}

// GET: obtener uno por ID
export async function getTurnoById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

// POST: crear
export async function crearTurno(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}


// PUT: editar
export async function editarTurno(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}

// DELETE: eliminar
export async function eliminarTurno(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
 
// PUT: cancelar turno (cambio de estado seguro)
export async function cancelarTurno(id) {
  const res = await axios.put(`${API_URL}/${id}/cancelar`)
    return res.data;
  }
