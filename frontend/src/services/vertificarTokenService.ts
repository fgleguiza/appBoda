import api from "./api"

interface ApiResponse<T> {
    code: string
    message: string
    data: T
    errors?: any
}

interface VerifyInvitationResponse {
    nombre: string
    confirmado: number
    role: string
}

export async function vertificarTokenService(
    token: string
): Promise<VerifyInvitationResponse> {

    const response = await api.get<ApiResponse<VerifyInvitationResponse>>(
        `/invitacion/${token}`
    )

    return response.data.data
}