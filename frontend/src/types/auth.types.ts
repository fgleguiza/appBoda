export type UserRole = "novio" | "invitado";

export interface GuestUser {
    id?: number;
    name: string;
    email?: string;
    role: UserRole;
    token: string;
}

export interface AuthContextType {
    user: GuestUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    sessionConfirmed: boolean;
    setAuth: (user: GuestUser, token: string) => void;
    setSessionConfirmed: (confirmed: boolean) => void;
    logout: () => void;
}
