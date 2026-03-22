import api from "./api"

interface ApiResponse<T> {
    code: number
    message: string
    data: T
    errors: any
}

interface GuestApiResponse {
    nombre: string
    confirmado: number
    role: string
    estado_confirmacion: string
    token: string
}

interface Guest {
    name: string
    confirm: boolean
    role: string
    token: string
}
export async function verifyGuestService(token: string): Promise<Guest> {

    const response = await api.get<ApiResponse<GuestApiResponse>>(
        `/verifyGuest/${token}`
    )

    const data = response.data.data

    return {
        name: data.nombre,
        confirm: data.confirmado === 1,
        role: data.role,
        token: data.token
    }
}