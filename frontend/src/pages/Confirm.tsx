import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "../Schema/EmailSchema";
import type { EmailFormData } from "../Schema/EmailSchema";
import Input from "../components/Input";
import Button from "../components/Button";
import { useInvitation } from "../hooks/useInvitation";
import { GiDiamondRing } from "react-icons/gi";

export default function Confirm() {
  const { guest } = useInvitation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleConfirm = (data: EmailFormData) => {
    console.log("Email:", data.email);
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
          <span className="font-semibold">{guest?.nombre}</span>, con mucha
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
        <Button text="Confirmar asistencia" type="submit" />
      </div>
    </form>
  );
}
