import { useState } from "react";
import CategoriesTable from "../features/categories/CategoriesTable";
import Modal from "../components/Modal";
import NewCategoryForm from "../components/forms/NewCategoryForm";
import EditCategoryForm from "../components/forms/EditCategoryForm";
import Toast from "../components/Toast";

type CategoryItem = {
  id: number;
  name: string;
  description?: string;
};

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null,
  );

  const data = [
    { id: 1, name: "Electrodomésticos" },
    { id: 2, name: "Hogar" },
    { id: 3, name: "Experiencias" },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      if (editingCategory) {
        console.log("Editar categoría:", {
          id: editingCategory.id,
          ...formData,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Categoría actualizada exitosamente");
      } else {
        console.log("Nueva categoría:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Categoría creada exitosamente");
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: CategoryItem) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#2c3e50] mb-2">
            Categorías
          </h1>
          <p className="text-[#b86b4b] text-sm">
            Organiza los regalos por categorías
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="bg-[#b86b4b] text-white px-6 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors font-medium text-sm"
        >
          + Nueva
        </button>
      </div>

      <CategoriesTable data={data} onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingCategory ? (
          <EditCategoryForm
            category={editingCategory}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={handleCloseModal}
          />
        ) : (
          <NewCategoryForm
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
