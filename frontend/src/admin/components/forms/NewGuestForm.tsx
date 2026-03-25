import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const newGuestSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  confirmed: z.boolean(),
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
      confirmed: false,
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
          register={register("name")}
          error={errors.name?.message}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="Ej: juan@example.com"
          register={register("email")}
          error={errors.email?.message}
          required
        />

        <Input
          label="Teléfono (opcional)"
          placeholder="Ej: +54 9 11 23456789"
          register={register("phone")}
          error={errors.phone?.message}
        />

        <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5e6da] rounded-lg border border-[#e8d5c4]">
          <input
            type="checkbox"
            id="confirmed"
            {...register("confirmed")}
            className="w-4 h-4 rounded border-[#e8d5c4] text-[#b86b4b] focus:ring-[#b86b4b]"
          />
          <label
            htmlFor="confirmed"
            className="text-sm font-medium text-gray-700"
          >
            Marcar como confirmado
          </label>
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
