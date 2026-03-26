import axios from "axios";
import { getStoredToken } from "./auth/authService";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Interceptor para agregar token automáticamente a todas las requests
 * El backend espera el token en el header X-Invitacion-Token
 */
api.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
        config.headers["X-Invitacion-Token"] = token;
    }
    return config;
});

/**
 * Interceptor para manejar errores globales
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem("guestToken");
            window.location.href = "/404";
        }
        return Promise.reject(error);
    }
);

export default api;