import { createContext, useState, useCallback, useEffect } from "react";
import type { AuthContextType, GuestUser } from "../types/auth.types";
import {
  getStoredToken,
  verifyTokenService,
} from "../services/auth/authService";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  sessionConfirmed: false,
  setAuth: () => {},
  setSessionConfirmed: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GuestUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sessionConfirmed, setSessionConfirmedState] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Al montar, intenta recuperar el token del localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = getStoredToken();
        if (storedToken) {
          // Verifica que el token aún sea válido
          const userData = await verifyTokenService(storedToken);
          setUser(userData);
          setToken(storedToken);

          // Recupera la confirmación de sesión si existe
          const sessionConfirmedStr = localStorage.getItem(
            "homeSessionConfirmed",
          );
          if (sessionConfirmedStr === "true") {
            setSessionConfirmedState(true);
          }
        }
      } catch (err) {
        console.error("Error inicializando auth:", err);
        // Si el token es inválido, lo limpia
        localStorage.removeItem("guestToken");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const setAuth = useCallback((newUser: GuestUser, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("guestToken", newToken);
  }, []);

  const setSessionConfirmed = useCallback((confirmed: boolean) => {
    setSessionConfirmedState(confirmed);
    if (confirmed) {
      localStorage.setItem("homeSessionConfirmed", "true");
    } else {
      localStorage.removeItem("homeSessionConfirmed");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setSessionConfirmedState(false);
    localStorage.removeItem("guestToken");
    localStorage.removeItem("homeSessionConfirmed");
  }, []);

  const isAuthenticated = token !== null && user !== null;
  const isAdmin = isAuthenticated && user?.role === "novio";

  // No renderiza hasta que termine de verificar el token
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#faf7f2] to-[#f5e6da]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b86b4b]"></div>
          <p className="mt-4 text-[#2c3e50]">Inicializando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        sessionConfirmed,
        setAuth,
        setSessionConfirmed,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
