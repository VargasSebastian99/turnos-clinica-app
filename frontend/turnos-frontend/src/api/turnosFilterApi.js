import axios from "../api/axiosConfig";

export const buscarTurnos = async (filtros) => {
    const params = new URLSearchParams();

    if(filtros.estado) params.append("estado", filtros.estado.toUpperCase());
    if(filtros.profesionalId) params.append("profesionalId", filtros.profesionalId);
    if(filtros.clienteId) params.append("clienteId", filtros.clienteId);
    if(filtros.desde) params.append("desde", filtros.desde);
    if(filtros.hasta) params.append("hasta", filtros.hasta);
    if(filtros.servicioId) params.append("servicioId", filtros.servicioId);
    if(filtros.page !== undefined) params.append("page", filtros.page);
    if(filtros.size !== undefined) params.append("size", filtros.size);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/turnos/buscar?${params.toString()}`);
    return res.data ?? [];
};