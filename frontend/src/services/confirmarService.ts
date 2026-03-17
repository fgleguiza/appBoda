import api from "./api"

interface VerifyInvitationResponse {
    nombre: string
    confirmado: number
    role: string
}

export async function vertificarTokenService(token: string): Promise<VerifyInvitationResponse> {

    const response = await api.get<VerifyInvitationResponse>(
        `/invitacion/${token}`
    )

    return response.data
}