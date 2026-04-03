import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { Categoria } from "../../../services/admin/adminService";

const newGiftSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  category_id: z.string().min(1, "Selecciona una categoría"),
  type: z.enum(["basic", "special"]).default("basic"),
  max_quantity: z.string().min(1, "La cantidad máxima es requerida"),
});

type NewGiftFormData = z.infer<typeof newGiftSchema>;

interface NewGiftFormProps {
  categories: Categoria[];
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export default function NewGiftForm({
  categories,
  onSubmit,
  loading = false,
  onCancel,
}: NewGiftFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGiftFormData>({
    resolver: zodResolver(newGiftSchema),
    defaultValues: {
      type: "basic",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: NewGiftFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("category_id", data.category_id);
    formData.append("type", data.type);
    formData.append("max_quantity", data.max_quantity);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#2c3e50] mb-6">Nuevo regalo</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Nombre del regalo"
          placeholder="Ej: Tostadora"
          register={register("name")}
          error={errors.name?.message}
          required
        />

        <Input
          label="Descripción (opcional)"
          placeholder="Descripción del regalo"
          register={register("description")}
          error={errors.description?.message}
        />

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-[#2c3e50]">
            Categoría <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("category_id")}
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
          {errors.category_id && (
            <p className="text-red-500 text-xs font-medium">
              {errors.category_id.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-[#2c3e50]">
            Tipo <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("type")}
            className="border border-[#e8d5c4] rounded-lg px-4 py-2 bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent
            transition-all"
          >
            <option value="basic">Básico</option>
            <option value="special">Especial</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs font-medium">
              {errors.type.message}
            </p>
          )}
        </div>

        <Input
          label="Cantidad máxima"
          type="number"
          placeholder="Ej: 5"
          register={register("max_quantity")}
          error={errors.max_quantity?.message}
          required
        />

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-[#2c3e50]">
            Imagen del regalo (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-[#e8d5c4] rounded-lg px-4 py-2 bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent
            transition-all file:mr-4 file:py-1 file:px-3 file:rounded file:border-0
            file:bg-[#e8d5c4] file:text-[#b86b4b] file:font-medium"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-[#e8d5c4]"
              />
            </div>
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
