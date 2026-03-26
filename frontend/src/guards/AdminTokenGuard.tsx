import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { verifyTokenService, saveToken } from "../services/auth/authService";

interface AdminTokenGuardProps {
  children: React.ReactNode;
}

/**
 * Guard específico para /admin/:token
 * Verifica que el token sea válido y que el usuario sea admin (role = "novio")
 */
export function AdminTokenGuard({ children }: AdminTokenGuardProps) {
  const { token: urlToken } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { setAuth, user, token: authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("[AdminTokenGuard] Token from URL:", urlToken);
        console.log("[AdminTokenGuard] Current stored token:", authToken);
        console.log("[AdminTokenGuard] Current user:", user);

        // 1. Si hay token en URL, verifica; si no, muestra error
        if (!urlToken) {
          setError("No token provided");
          navigate("/404", { replace: true });
          return;
        }

        // 2. Si el token en URL es diferente al almacenado, SIEMPRE verifica
        // Si es el mismo y ya hay usuario admin, no verifica nuevamente
        if (authToken === urlToken && user && user.role === "novio") {
          console.log(
            "[AdminTokenGuard] Token from URL matches stored token, already authenticated as admin",
          );
          setLoading(false);
          return;
        }

        console.log("[AdminTokenGuard] Verifying token with backend...");
        const userData = await verifyTokenService(urlToken);
        console.log("[AdminTokenGuard] Backend response:", userData);

        // 3. Verifica que sea ADMIN (role = "novio")
        if (userData.role !== "novio") {
          console.warn(
            "[AdminTokenGuard] User role is not novio (admin):",
            userData.role,
          );
          setError("Only admins can access this area");
          navigate("/404", { replace: true });
          return;
        }

        // 4. Guarda el token y usuario
        console.log(
          "[AdminTokenGuard] Setting auth with admin user:",
          userData,
        );
        setAuth(userData, urlToken);
        saveToken(urlToken);

        console.log("[AdminTokenGuard] Auth set successfully as admin");
        // No redirige, mantiene /admin/:token
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("[AdminTokenGuard] Error verificando token:", errorMsg);
        setError(errorMsg);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    // SIEMPRE verifica si hay un token en la URL
    if (urlToken) {
      verifyToken();
    } else {
      setLoading(false);
      setError("Missing token");
    }
  }, [urlToken]); // Solo depende de urlToken

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#faf7f2] to-[#f5e6da]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b86b4b]"></div>
          <p className="mt-4 text-[#2c3e50]">Verificando acceso admin...</p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  if (error && !user) {
    return null; // El Navigate ya redirigió
  }

  return <>{children}</>;
}
