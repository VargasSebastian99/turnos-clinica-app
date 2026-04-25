import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/profesionales`;

// listar todos
export async function getProfesionales() {
  const res = await axios.get(API_URL);
  return res.data;
}
// crear profesional
export async function crearProfesional(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}
// obtener uno por ID
export async function getProfesionalById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}
// editar
export async function editarProfesional(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}
// eliminar
export async function eliminarProfesional(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}