import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { verifyGuestService } from "../services/verifyGuestService";
import { useInvitation } from "../hooks/useInvitation";

export default function InvitationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { setInvitation } = useInvitation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      if (!token) {
        navigate("/invitacion-invalida", { replace: true });
        return;
      }

      try {
        setLoading(true);

        const data = await verifyGuestService(token);
        console.log("verificado:", data);

        //si el token de invitado no existe se rompe porque falta una estructura diferente para la respuesta

        setInvitation({
          token,
          guest: {
            name: data.name,
            role: data.role,
            confirm: data.confirm,
            token: token,
          },
        });

        // 🔥 lógica de redirección
        if (!data.confirm) {
          // No confirmó → debe estar en confirm
          if (location.pathname !== `/confirm/${token}`) {
            navigate(`/confirm/${token}`, { replace: true });
          }
        } else {
          // Ya confirmó → debe ir a regalos
          if (location.pathname !== `/regalos/${token}`) {
            navigate(`/regalos/${token}`, { replace: true });
          }
        }
      } catch (error) {
        console.error(error);
        navigate("/error", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verificar();
  }, [token, location.key]); // 🔥 clave

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verificando invitado...
      </div>
    );
  }

  return children;
}
