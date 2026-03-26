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
    nombre: string;
    email: string;
    confirmado: boolean;
    rol: "novio" | "invitado";
    fecha_creacion: string;
}

export async function getInvitadosService(): Promise<Invitado[]> {
    try {
        const response = await api.get<ApiResponse<Invitado[]>>("/admin/guests");
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudieron cargar los invitados");
    }
}

export async function createInvitadoService(data: {
    nombre: string;
    email: string;
    rol?: "novio" | "invitado";
    // El backend puede requerir más campos
}): Promise<Invitado> {
    try {
        const response = await api.post<ApiResponse<Invitado>>(
            "/admin/guests",
            data
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo crear el invitado");
    }
}

export async function updateInvitadoService(
    id: number,
    data: Partial<Invitado>
): Promise<Invitado> {
    try {
        const response = await api.put<ApiResponse<Invitado>>(
            `/admin/guests/${id}`,
            data
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo actualizar el invitado");
    }
}

export async function deleteInvitadoService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/guests/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar el invitado");
    }
}

// ==================== CATEGORÍAS ====================

export interface Categoria {
    id: number;
    nombre: string;
    descripcion?: string;
    fecha_creacion: string;
}

export async function getCategoriasService(): Promise<Categoria[]> {
    try {
        const response = await api.get<ApiResponse<Categoria[]>>(
            "/admin/categories"
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudieron cargar las categorías");
    }
}

export async function createCategoriaService(data: {
    nombre: string;
    descripcion?: string;
}): Promise<Categoria> {
    try {
        const response = await api.post<ApiResponse<Categoria>>(
            "/admin/categories",
            data
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo crear la categoría");
    }
}

export async function updateCategoriaService(
    id: number,
    data: Partial<Categoria>
): Promise<Categoria> {
    try {
        const response = await api.put<ApiResponse<Categoria>>(
            `/admin/categories/${id}`,
            data
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo actualizar la categoría");
    }
}

export async function deleteCategoriaService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/categories/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar la categoría");
    }
}

// ==================== REGALOS ====================

export interface Regalo {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    categoria_id: number;
    imagen_url?: string;
    reservado: boolean;
    fecha_creacion: string;
}

export async function getRegaloService(): Promise<Regalo[]> {
    try {
        const response = await api.get<ApiResponse<Regalo[]>>("/admin/gifts");
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudieron cargar los regalos");
    }
}

export async function createRegaloService(
    data: FormData | {
        nombre: string;
        descripcion?: string;
        precio: number;
        categoria_id: number;
        imagen?: File;
    }
): Promise<Regalo> {
    try {
        const response = await api.post<ApiResponse<Regalo>>(
            "/admin/gifts",
            data,
            {
                headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
            }
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo crear el regalo");
    }
}

export async function updateRegaloService(
    id: number,
    data: Partial<Regalo> | FormData
): Promise<Regalo> {
    try {
        const response = await api.put<ApiResponse<Regalo>>(
            `/admin/gifts/${id}`,
            data,
            {
                headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
            }
        );
        return response.data.data;
    } catch (error) {
        throw new Error("No se pudo actualizar el regalo");
    }
}

export async function deleteRegaloService(id: number): Promise<void> {
    try {
        await api.delete(`/admin/gifts/${id}`);
    } catch (error) {
        throw new Error("No se pudo eliminar el regalo");
    }
}
