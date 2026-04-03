import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const newGuestSchema = z.object({
  nombre_invitado: z.string().min(1, "El nombre es requerido"),
  email_invitado: z.string().email("Email inválido").optional().or(z.literal("")),
  role: z.enum(["novio", "invitado"]).default("invitado"),
});

type NewGuestFormData = z.infer<typeof newGuestSchema>;

interface NewGuestFormProps {
  onSubmit: (data: NewGuestFormData) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export default function NewGuestForm({
  onSubmit,
  loading = false,
  onCancel,
}: NewGuestFormProps) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<NewGuestFormData>({
    resolver: zodResolver(newGuestSchema),
    defaultValues: {
      role: "invitado",
    },
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#2c3e50] mb-6">
        Nuevo invitado
      </h2>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre completo"
          placeholder="Ej: Juan Pérez"
          register={register("nombre_invitado")}
          error={errors.nombre_invitado?.message}
          required
        />

        <Input
          label="Email (opcional)"
          type="email"
          placeholder="Ej: juan@example.com"
          register={register("email_invitado")}
          error={errors.email_invitado?.message}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent"
          >
            <option value="invitado">Invitado</option>
            <option value="novio">Novio (Admin)</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button text="Cancelar" variant="secondary" onClick={onCancel} />
          <Button
            text={loading ? "Guardando..." : "Guardar"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
