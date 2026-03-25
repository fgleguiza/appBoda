import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const newCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

type NewCategoryFormData = z.infer<typeof newCategorySchema>;

interface NewCategoryFormProps {
  onSubmit: (data: NewCategoryFormData) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export default function NewCategoryForm({
  onSubmit,
  loading = false,
  onCancel,
}: NewCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCategoryFormData>({
    resolver: zodResolver(newCategorySchema),
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#2c3e50] mb-6">
        Nueva categoría
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nombre de categoría"
          placeholder="Ej: Electrodomésticos"
          register={register("name")}
          error={errors.name?.message}
          required
        />

        <Input
          label="Descripción (opcional)"
          placeholder="Ej: Aparatos para la cocina"
          register={register("description")}
          error={errors.description?.message}
        />

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
