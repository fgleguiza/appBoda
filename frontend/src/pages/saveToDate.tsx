import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "../Schema/EmailSchema";
import type { EmailFormData } from "../Schema/EmailSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { useInvitation } from "../hooks/useInvitation";
import { GiDiamondRing } from "react-icons/gi";
import { confirmGuestService } from "../services/confirmGuestService";

export default function saveToDate() {
  const { guest } = useInvitation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleConfirm = async (data: EmailFormData) => {
    try {
      setLoading(true);

      const response = await confirmGuestService(guest.token, data.email);

      console.log(response);

      alert("Confirmación enviada 🎉");
      navigate(`/confirm/${guest.token}`, { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error al confirmar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleConfirm)}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Encabezado */}
        <h1 className="text-3xl font-serif text-gray-800 mb-2 text-center">
          Aldí & Facu
        </h1>

        <p className="text-gray-500 mb-6 text-center">
          13 de Septiembre de 2026
        </p>

        {/* Línea decorativa */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-gray-300 w-16"></div>
          <GiDiamondRing className="text-rose-400 text-2xl" />
          <div className="h-px bg-gray-300 w-16"></div>
        </div>

        {/* Texto invitación */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          ¡Estás invitado a nuestra boda!
        </h2>

        <p className="text-gray-600 mb-6">
          <span className="font-semibold">{guest?.name}</span>, con mucha
          alegría queremos invitarte a celebrar nuestro casamiento.
        </p>

        {/* Input */}
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          register={register("email")}
          error={errors.email?.message}
        />

        {/* Botón */}
        <Button
          text={loading ? "Enviando..." : "Confirmar asistencia"}
          type="submit"
        />
      </div>
    </form>
  );
}
