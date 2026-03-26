import type { GuestUser } from "../../types/auth.types";
import api from "../api";

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    errors: any;
}

interface GuestApiResponse {
    id?: number | string;
    nombre: string;
    email?: string | null;
    confirmado?: boolean;
    role: "novio" | "invitado";
    token: string;
    estado_confirmacion?: string;
}

/**
 * Verifica si un token es válido y obtiene los datos del usuario
 * @param token Token de autenticación
 * @returns Datos del usuario autenticado
 * @throws Error si el token es inválido
 */
export async function verifyTokenService(token: string): Promise<GuestUser> {
    try {
        console.log("[authService] Requesting /verifyGuest/" + token);
        const response = await api.get<ApiResponse<GuestApiResponse>>(
            `/verifyGuest/${token}`
        );

        console.log("[authService] Full response:", response);
        console.log("[authService] Response data:", response.data);

        // Maneja estructura de respuesta del backend
        const apiData = response.data;

        // El backend devuelve { code, message, data: {...} }
        if (!apiData.data) {
            throw new Error("Invalid response structure from server");
        }

        const data = apiData.data;
        console.log("[authService] Extracted data:", data);

        // Validar que role sea uno de los esperados
        if (data.role !== "invitado" && data.role !== "novio") {
            throw new Error(`Invalid role: ${data.role}`);
        }

        return {
            id: data.id,
            name: data.nombre,
            email: data.email || undefined,
            role: data.role,
            token: data.token,
        };
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("[authService] Error:", msg);
        throw new Error("Token inválido o expirado: " + msg);
    }
}

/**
 * Obtiene el token del URL o localStorage
 */
export function getStoredToken(): string | null {
    return localStorage.getItem("guestToken");
}

/**
 * Guarda el token en localStorage
 */
export function saveToken(token: string): void {
    localStorage.setItem("guestToken", token);
}

/**
 * Elimina el token del almacenamiento
 */
export function clearToken(): void {
    localStorage.removeItem("guestToken");
}
