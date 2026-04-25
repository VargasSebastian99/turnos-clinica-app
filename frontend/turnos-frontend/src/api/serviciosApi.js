import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/servicios`;

// listar todos
export async function getServicios() {
  const res = await axios.get(API_URL);
  return res.data;
}

// obtener uno por ID
export async function getServicioById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}
//editar 
export async function editarServicio(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}
//crear
export async function crearServicio(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}
//eliminar  
export async function eliminarServicio(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}