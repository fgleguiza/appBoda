import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  verifyTokenService,
  saveToken,
  getStoredToken,
} from "../services/auth/authService";

interface TokenGuardProps {
  children: React.ReactNode;
  requiredRole?: "novio" | "invitado";
}

/**
 * Guard que verifica si el usuario tiene un token válido
 * Intenta obtener token del URL primero, luego del localStorage
 */
export function TokenGuard({ children, requiredRole }: TokenGuardProps) {
  const { token: urlToken } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { setAuth, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);

        // 1. Obtén el token: del URL o localStorage
        const tokenToVerify = urlToken || getStoredToken();

        if (!tokenToVerify) {
          setError(true);
          navigate("/404", { replace: true });
          return;
        }

        // 2. Verifica el token
        const userData = await verifyTokenService(tokenToVerify);

        // 3. Verifica rol si es requerido
        if (requiredRole && userData.role !== requiredRole) {
          setError(true);
          navigate("/404", { replace: true });
          return;
        }

        // 4. Guarda y redirecciona
        setAuth(userData, tokenToVerify);
        saveToken(tokenToVerify);

        // Si viene del URL y fue verificado, redirige sin el token en URL
        if (urlToken && userData.role === "invitado") {
          navigate("/regalos", { replace: true });
        }
      } catch (err) {
        console.error("Error verificando token:", err);
        setError(true);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    // Solo verifica si aún no está autenticado
    if (!user) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [urlToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#faf7f2] to-[#f5e6da]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b86b4b]"></div>
          <p className="mt-4 text-[#2c3e50]">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // El Navigate ya redirigió
  }

  return <>{children}</>;
}
