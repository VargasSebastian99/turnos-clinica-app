import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/especialidades`;

// listar todas
export async function getEspecialidades() {
  const res = await axios.get(API_URL);
  return res.data;
}
// crear
export async function crearEspecialidad(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}
// obtener una por ID
export async function getEspecialidadById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}
// editar
export async function editarEspecialidad(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}
// eliminar
export async function eliminarEspecialidad(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}