import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#faf7f2] to-[#f5e6da] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="text-9xl font-light text-[#b86b4b] mb-4">404</div>
            <h1 className="text-4xl font-light text-[#2c3e50] mb-3">
              Página no encontrada
            </h1>
            <p className="text-lg text-[#b86b4b]">
              Lo sentimos, la página que buscas no existe o el acceso no está
              permitido
            </p>
          </div>

          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#b86b4b] to-[#f5e6da] mx-auto mb-12"></div>

          {/* Message */}
          <div className="mb-12 p-6 bg-white rounded-xl border border-[#e8d5c4]">
            <p className="text-[#2c3e50] mb-2 font-medium">Posibles razones:</p>
            <ul className="text-left text-[#b86b4b] space-y-2">
              <li>✓ Token inválido o expirado</li>
              <li>✓ Acceso denegado por permisos insuficientes</li>
              <li>✓ La página ha sido movida</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#b86b4b] text-white rounded-lg hover:bg-[#a35d3d] transition-colors font-medium"
            >
              <LuArrowLeft size={20} />
              Volver al inicio
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f5e6da] text-[#2c3e50] rounded-lg hover:bg-[#e8d5c4] transition-colors font-medium border border-[#e8d5c4]"
            >
              <LuArrowLeft size={20} />
              Atrás
            </button>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="text-6xl mb-4">💒</div>
            <p className="text-[#b86b4b] text-sm italic">
              Si necesitas ayuda, contacta con los organizadores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
