import api from "./api"

interface ApiResponse {
    code: string
    message: string
    data: any
    errors?: any
}

export async function confirmGuestService(token: string, email: string): Promise<ApiResponse> {

    const response = await api.post<ApiResponse>(
        `/confirm`,
        {
            token: token,
            email: email
        }
    )

    return response.data

}