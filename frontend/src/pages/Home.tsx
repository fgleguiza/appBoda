import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import Hero from "../components/Home/Hero";
import Welcome from "../components/Home/Welcome";
import TimelineElegant from "../components/Home/TimelineElegant";
import Location from "../components/Home/Location";
import GiftList from "../components/Home/GiftList";
import Input from "../components/Input";
import Button from "../components/Button";
import { emailSchema, type EmailFormData } from "../Schema/EmailSchema";
import { confirmGuestService } from "../services/guest/guestService";
import { GiDiamondRing } from "react-icons/gi";

export default function Home() {
  const {
    isAuthenticated,
    user,
    token,
    isAdmin,
    sessionConfirmed,
    setSessionConfirmed,
  } = useAuth();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleConfirm = async (data: EmailFormData) => {
    if (!token) {
      alert("Error: token no disponible");
      return;
    }

    try {
      setLoadingConfirm(true);
      // El backend espera tanto token como email en el POST
      await confirmGuestService(data.email, token);
      setSessionConfirmed(true);
      setShowConfirmModal(false);
      reset();
      alert("¡Confirmación enviada exitosamente! 🎉");
    } catch (error) {
      console.error(error);
      alert("Error al confirmar asistencia");
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <Welcome />
      <TimelineElegant />
      <Location />

      {/* Si está autenticado, muestra opciones de invitado */}
      {isAuthenticated && user && (
        <>
          {/* Banner con info del invitado y botones de acción */}
          <div className="bg-gradient-to-r from-[#b86b4b]/5 via-white to-[#f5e6da]/30 py-12 px-4 border-t-4 border-[#b86b4b]">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-serif text-[#2c3e50] mb-2">
                    ¡Bienvenido, {user.name}!
                  </h3>
                  <p className="text-[#b86b4b] font-light text-lg">
                    {sessionConfirmed
                      ? "✓ Tu asistencia ha sido confirmada"
                      : "Confirma tu asistencia para que nos organicemos mejor"}
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap justify-center">
                  {!sessionConfirmed && (
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      className="px-8 py-3 backdrop-blur-md bg-[#b86b4b]/20 border border-[#b86b4b]/40 text-[#2c3e50] rounded-full hover:bg-[#b86b4b]/30 hover:border-[#b86b4b]/60 transition font-serif font-semibold"
                    >
                      Confirmar Asistencia
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal de confirmación */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <form
                onSubmit={handleSubmit(handleConfirm)}
                className="bg-gradient-to-br from-white via-[#faf7f2] to-[#f5e6da] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-[#e8d5c4]"
              >
                {/* Encabezado decorativo */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#b86b4b]/10 rounded-full">
                    <GiDiamondRing className="text-[#b86b4b] text-3xl" />
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-3xl font-serif text-[#2c3e50] mb-2 text-center">
                  Confirmar Asistencia
                </h2>

                {/* Línea decorativa */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#b86b4b] to-transparent w-16"></div>
                </div>

                <p className="text-[#2c3e50] mb-8 text-center font-light">
                  Cuéntanos que asistirás a la ceremonia. Por favor, ingresa tu
                  email.
                </p>

                {/* Input */}
                <div className="mb-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    register={register("email")}
                    error={errors.email?.message}
                  />
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-8 w-full">
                  <button
                    type="submit"
                    disabled={loadingConfirm}
                    className="w-full px-6 py-3 backdrop-blur-md bg-[#b86b4b]/30 border border-[#b86b4b]/40 text-[#2c3e50] rounded-full hover:bg-[#b86b4b]/40 hover:border-[#b86b4b]/60 transition font-serif font-semibold disabled:opacity-50"
                  >
                    {loadingConfirm ? "Confirmando..." : "Confirmar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(false)}
                    className="w-full px-6 py-3 backdrop-blur-md bg-white/20 border border-white/40 text-[#2c3e50] rounded-full hover:bg-white/30 hover:border-white/60 transition font-serif font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de regalos */}
          <GiftList />
        </>
      )}
    </div>
  );
}
