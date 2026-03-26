/**
 * Gestiona la sesión del home (confirmación)
 * Se mantiene separada de la autenticación
 * El usuario puede navegar sin confirmar, pero confirmar abre funcionalidades
 */

const SESSION_KEY = "homeSession";

interface HomeSession {
    guestId?: number;
    confirmed: boolean;
    confirmedAt?: string;
}

/**
 * Guarda si el invitado confirmó asistencia
 */
export function saveSessionConfirmation(confirmed: boolean): void {
    const session = getSession();
    session.confirmed = confirmed;
    if (confirmed) {
        session.confirmedAt = new Date().toISOString();
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Obtiene el estado de confirmación de la sesión actual
 */
export function getSessionConfirmation(): boolean {
    const session = getSession();
    return session.confirmed || false;
}

/**
 * Obtiene toda la sesión
 */
export function getSession(): HomeSession {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) {
        return { confirmed: false };
    }
    try {
        return JSON.parse(stored);
    } catch {
        return { confirmed: false };
    }
}

/**
 * Limpia la sesión
 */
export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}
