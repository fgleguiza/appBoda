import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const editGuestSchema = z.object({
  nombre_invitado: z.string().min(1, "El nombre es requerido"),
  email_invitado: z.string().email("Email inválido").optional().or(z.literal("")),
  role: z.enum(["novio", "invitado"]),
  confirmado: z.boolean(),
});

type EditGuestFormData = z.infer<typeof editGuestSchema>;

interface EditGuestFormProps {
  initialData: {
    nombre_invitado: string;
    email_invitado: string;
    role: "novio" | "invitado";
    confirmado: boolean;
  };
  onSubmit: (data: EditGuestFormData) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export default function EditGuestForm({
  initialData,
  onSubmit,
  loading = false,
  onCancel,
}: EditGuestFormProps) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<EditGuestFormData>({
    resolver: zodResolver(editGuestSchema),
    defaultValues: {
      nombre_invitado: initialData.nombre_invitado,
      email_invitado: initialData.email_invitado,
      role: initialData.role,
      confirmado: initialData.confirmado,
    },
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#2c3e50] mb-6">
        Editar invitado
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

        <div className="flex items-center gap-3 mb-4 p-3 bg-[#f5e6da] rounded-lg border border-[#e8d5c4]">
          <input
            type="checkbox"
            id="confirmado"
            {...register("confirmado")}
            className="w-4 h-4 rounded border-[#e8d5c4] text-[#b86b4b] focus:ring-[#b86b4b]"
          />
          <label
            htmlFor="confirmado"
            className="text-sm font-medium text-gray-700"
          >
            Marcar como confirmado
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <Button text="Cancelar" variant="secondary" onClick={onCancel} />
          <Button
            text={loading ? "Guardando..." : "Guardar cambios"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
