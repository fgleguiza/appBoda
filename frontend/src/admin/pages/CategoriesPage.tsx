import { useState, useEffect } from "react";
import CategoriesTable from "../features/categories/CategoriesTable";
import Modal from "../components/Modal";
import NewCategoryForm from "../components/forms/NewCategoryForm";
import EditCategoryForm from "../components/forms/EditCategoryForm";
import Toast from "../components/Toast";
import {
  getCategoriasService,
  createCategoriaService,
  updateCategoriaService,
  deleteCategoriaService,
  type Categoria,
} from "../../services/admin/adminService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingData(true);
      const data = await getCategoriasService();
      setCategories(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
      setToastMessage("Error al cargar las categorías");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      if (editingCategory) {
        await updateCategoriaService(editingCategory.id, {
          name: formData.name,
          description: formData.description,
        });
        setToastMessage("Categoría actualizada exitosamente");
      } else {
        await createCategoriaService({
          name: formData.name,
          description: formData.description,
        });
        setToastMessage("Categoría creada exitosamente");
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      await loadCategories(); // Recargar la lista
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Categoria) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (category: Categoria) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
      return;
    }

    try {
      await deleteCategoriaService(category.id);
      setToastMessage("Categoría eliminada exitosamente");
      await loadCategories(); // Recargar la lista
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      setToastMessage("Error al eliminar la categoría");
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b86b4b]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Categorías</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#b86b4b] text-white px-4 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors"
        >
          Agregar Categoría
        </button>
      </div>

      <CategoriesTable
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Editar Categoría" : "Nueva Categoría"}
      >
        {editingCategory ? (
          <EditCategoryForm
            initialData={{
              name: editingCategory.name,
              description: editingCategory.description || "",
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <NewCategoryForm onSubmit={handleSubmit} loading={loading} />
        )}
      </Modal>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
