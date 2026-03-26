import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Guard que verifica si el usuario es admin (role = "novio")
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/404", { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
