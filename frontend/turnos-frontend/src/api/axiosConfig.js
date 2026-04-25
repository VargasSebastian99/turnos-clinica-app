import axios from "axios";
import { logout } from "../context/AuthContext";

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
            window.location.href = "/login";
        }
        if (error.response && error.response.status === 403) {
            alert("No tienes permiso para realizar esta acción");
        }
        return Promise.reject(error);
    }
);