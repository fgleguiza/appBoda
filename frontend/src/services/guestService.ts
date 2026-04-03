import api from "./api";

// ==================== TIPOS ====================

export interface Categoria {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface Regalo {
    id: number;
    category_id: number;
    name: string;
    description?: string;
    image?: string;
    image_url?: string;
    type: "basic" | "special";
    max_quantity: number;
    reserved_quantity: number;
    available_quantity?: number;
    category?: Categoria;
    created_at: string;
    updated_at: string;
}

// ==================== SERVICIOS ====================

/**
 * Obtiene la lista de regalos para los invitados
 * Esta función usa la ruta pública /api/regalos que requiere invitado.token
 */
export async function getGuestRegalosService(): Promise<Regalo[]> {
    try {
        const response = await api.get<Regalo[]>("/regalos");
        return response.data;
    } catch (error) {
        console.error("Error fetching guest regalos:", error);
        throw new Error("No se pudieron cargar los regalos");
    }
}
