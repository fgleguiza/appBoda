import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const editGiftSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  category: z.string().min(1, "Selecciona una categoría"),
  image: z.any().optional(),
});

type EditGiftFormData = z.infer<typeof editGiftSchema>;

interface EditGiftFormProps {
  gift: {
    id: number;
    name: string;
    category?: number;
    imageUrl?: string;
  };
  categories: Array<{ id: number; name: string }>;
  onSubmit: (data: EditGiftFormData & { imageFile?: File }) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export default function EditGiftForm({
  gift,
  categories,
  onSubmit,
  loading = false,
  onCancel,
}: EditGiftFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGiftFormData>({
    resolver: zodResolver(editGiftSchema),
    defaultValues: {
      name: gift.name,
      category: gift.category ? gift.category.toString() : "",
    },
  });

  const handleFormSubmit = (data: EditGiftFormData) => {
    const imageFile = (data.image as FileList)?.[0];
    onSubmit({ ...data, imageFile });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#2c3e50] mb-6">Editar regalo</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Nombre del regalo"
          placeholder="Ej: Tostadora"
          register={register("name")}
          error={errors.name?.message}
          required
        />

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-[#2c3e50]">
            Categoría <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("category")}
            className="border border-[#e8d5c4] rounded-lg px-4 py-2 bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent
            transition-all"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs font-medium">
              {errors.category.message}
            </p>
          )}
        </div>

        {gift.imageUrl && (
          <div className="mb-4">
            <p className="text-sm font-medium text-[#2c3e50] mb-2">
              Imagen actual
            </p>
            <img
              src={gift.imageUrl}
              alt={gift.name}
              className="w-24 h-24 object-cover rounded-lg border border-[#e8d5c4]"
            />
          </div>
        )}

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-[#2c3e50]">
            Cambiar imagen (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="border border-[#e8d5c4] rounded-lg px-4 py-2 bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent
            transition-all file:mr-4 file:py-1 file:px-3 file:rounded file:border-0
            file:bg-[#e8d5c4] file:text-[#b86b4b] file:font-medium"
          />
          {errors.image && (
            <p className="text-red-500 text-xs font-medium">
              {typeof errors.image.message === "string"
                ? errors.image.message
                : "Error en la imagen"}
            </p>
          )}
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
