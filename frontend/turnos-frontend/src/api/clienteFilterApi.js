import axios from "../api/axiosConfig";

export const buscarClientes = async (filtros) => {
    const params = new URLSearchParams();

    if(filtros.nombre) params.append("nombre", filtros.nombre);
    if(filtros.email) params.append("email", filtros.email);

    if(filtros.page !== undefined) params.append("page", filtros.page);
    if(filtros.size !== undefined) params.append("size", filtros.size);

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/clientes/buscar?${params.toString()}`);
    return res.data;
}