import api from "../api";

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    errors?: any;
}

interface ConfirmationResponse {
    estado_confirmacion: string;
    mensaje: string;
}

/**
 * Confirma la asistencia del invitado
 * @param email Email del invitado para verificación
 * @param token Token del invitado (será agregado por el interceptor en headers)
 */
export async function confirmGuestService(
    email: string,
    token: string
): Promise<ConfirmationResponse> {
    try {
        // Backend espera token y email en el body del POST
        const response = await api.post<ApiResponse<ConfirmationResponse>>(
            "/confirm",
            {
                email,
                token,
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo confirmar la asistencia");
    }
}

/**
 * Obtiene la lista de regalos disponibles para el invitado
 */
export async function getGuestsGiftsService() {
    try {
        // El backend aún no tiene este endpoint específico
        // Retornamos mock data por ahora
        // TODO: Implementar en backend cuando sea necesario
        return [];
    } catch (error) {
        throw new Error("No se pudieron cargar los regalos");
    }
}

/**
 * Reserva un regalo
 * @param giftId ID del regalo a reservar
 */
export async function reserveGiftService(giftId: number) {
    try {
        // El backend usa POST /reservar/{id}
        const response = await api.post(`/reservar/${giftId}`, {});
        return response.data;
    } catch (error) {
        throw new Error("No se pudo reservar el regalo");
    }
}

/**
 * Cancela la reserva de un regalo
 * TODO: El backend no tiene este endpoint aún
 */
export async function cancelReservationService(giftId: number) {
    try {
        // Placeholder para cuando el backend implemente esta funcionalidad
        throw new Error("Funcionalidad no disponible aún");
    } catch (error) {
        throw new Error("No se pudo cancelar la reserva");
    }
}
