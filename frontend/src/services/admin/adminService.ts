import api from "../api";

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    errors?: any;
}

// ==================== INVITADOS ====================

export interface Invitado {
    id: number;
    token: string;
    nombre_invitado: string;
    email_invitado?: string;
    role: "novio" | "invitado";
    confirmado: boolean;
    fecha_confirmacion?: string;
    created_at: string;
    updated_at: string;
}

export async function getInvitadosService(): Promise<Invitado[]> {
    try {
        const response = await api.get<Invitado[]>("/admin/invitados");
        return response.data;
    } catch (error) {
        throw new Error("No se pudieron cargar los invitados");
    }
}

export async function createInvitadoService(data: {
    nombre_invitado: string;
    email_invitado?: string;
    role?: "novio" | "invitado";
}): Promise<Invitado> {
    try {
        const response = await api.post<Invitado>("/admin/invitados", data);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo crear el invitado");
    }
}

export async function updateInvitadoService(
    id: number,
    data: Partial<{
        nombre_invitado: string;
        email_invitado: string;
        role: "novio" | "invitado";
        confirmado: boolean;
    }>
): Promise<Invitado> {
    try {
        const response = await api.put<Invitado>(`/admin/invitados/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar el invitado");
    }
}

export async function deleteInvitadoService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/invitados/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar el invitado");
    }
}

// ==================== CATEGORÍAS ====================

export interface Categoria {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export async function getCategoriasService(): Promise<Categoria[]> {
    try {
        const response = await api.get<Categoria[]>("/admin/categorias");
        return response.data;
    } catch (error) {
        throw new Error("No se pudieron cargar las categorías");
    }
}

export async function createCategoriaService(data: {
    name: string;
    description?: string;
}): Promise<Categoria> {
    try {
        const response = await api.post<Categoria>("/admin/categorias", data);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo crear la categoría");
    }
}

export async function updateCategoriaService(
    id: number,
    data: Partial<{
        name: string;
        description: string;
    }>
): Promise<Categoria> {
    try {
        const response = await api.put<Categoria>(`/admin/categorias/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar la categoría");
    }
}

export async function deleteCategoriaService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/categorias/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar la categoría");
    }
}

// ==================== REGALOS ====================

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

export async function getRegalosService(): Promise<Regalo[]> {
    try {
        const response = await api.get<Regalo[]>("/admin/regalos");
        return response.data;
    } catch (error) {
        throw new Error("No se pudieron cargar los regalos");
    }
}

export async function createRegaloService(data: FormData): Promise<Regalo> {
    try {
        const response = await api.post<Regalo>("/admin/regalos", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw new Error("No se pudo crear el regalo");
    }
}

export async function updateRegaloService(
    id: number,
    data: FormData
): Promise<Regalo> {
    try {
        const response = await api.put<Regalo>(`/admin/regalos/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw new Error("No se pudo actualizar el regalo");
    }
}

export async function deleteRegaloService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/regalos/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar el regalo");
    }
}
