import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useInvitation } from "../hooks/useInvitation";
import { GiDiamondRing } from "react-icons/gi";
import { RiEmotionLaughLine } from "react-icons/ri";

export default function Confirm() {
  const [email, setEmail] = useState("");
  const { guest } = useInvitation();

  const handleConfirm = () => {
    console.log(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          alegría queremos invitarte a celebrar nuestro casamiento. Nos
          encantaría que nos acompañes en este día tan especial.
        </p>

        {/* Formulario */}
        <div className="space-y-4 text-left">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={setEmail}
          />

          <Button text="Confirmar asistencia" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
