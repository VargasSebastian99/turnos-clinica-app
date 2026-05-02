import axios from "../api/axiosConfig";

export const buscarProfesionales = async (filtros) => {
    const params = new URLSearchParams();

    if(filtros.nombre) params.append("nombre", filtros.nombre);
    if(filtros.especialidadId) params.append("especialidadId", filtros.especialidadId);
    if(filtros.estado) params.append("estado", filtros.estado.toUpperCase());

    if(filtros.page !== undefined) params.append("page", filtros.page);
    if(filtros.size !== undefined) params.append("size", filtros.size);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/profesionales/buscar?${params.toString()}`);
    return res.data;
};