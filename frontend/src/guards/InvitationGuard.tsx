import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vertificarTokenService } from "../services/vertificarTokenService";
import { useInvitation } from "../hooks/useInvitation";

export default function InvitationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { guest, setInvitation } = useInvitation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guest) {
      setLoading(false);
      return;
    }

    const verificar = async () => {
      if (!token) {
        navigate("/invitacion-invalida", { replace: true });
        return;
      }

      try {
        const data = await vertificarTokenService(token);

        setInvitation({
          token,
          guest: {
            nombre: data.nombre,
            role: data.role,
            confirmado: data.confirmado,
          },
        });

        if (data.confirmado === 0) {
          navigate(`/confirmacion/${token}`, { replace: true });
          return;
        }

        if (data.confirmado === 1) {
          navigate(`/regalos/${token}`, { replace: true });
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate("/error", { replace: true });
      }
    };

    verificar();
  }, [token, guest]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verificando invitación...
      </div>
    );
  }

  return children;
}
