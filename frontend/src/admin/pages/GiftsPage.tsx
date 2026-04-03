import { useState, useEffect } from "react";
import GiftsTable from "../features/gifts/GiftsTable";
import Modal from "../components/Modal";
import NewGiftForm from "../components/forms/NewGiftForm";
import EditGiftForm from "../components/forms/EditGiftForm";
import Toast from "../components/Toast";
import {
  getRegalosService,
  createRegaloService,
  updateRegaloService,
  deleteRegaloService,
  getCategoriasService,
  type Regalo,
  type Categoria,
} from "../../services/admin/adminService";

export default function GiftsPage() {
  const [gifts, setGifts] = useState<Regalo[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingGift, setEditingGift] = useState<Regalo | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar regalos y categorías al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const [giftsData, categoriesData] = await Promise.all([
        getRegalosService(),
        getCategoriasService(),
      ]);
      setGifts(giftsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setToastMessage("Error al cargar los datos");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      if (editingGift) {
        await updateRegaloService(editingGift.id, formData);
        setToastMessage("Regalo actualizado exitosamente");
      } else {
        await createRegaloService(formData);
        setToastMessage("Regalo creado exitosamente");
      }
      setIsModalOpen(false);
      setEditingGift(null);
      await loadData(); // Recargar la lista
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar el regalo");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (gift: Regalo) => {
    setEditingGift(gift);
    setIsModalOpen(true);
  };

  const handleDelete = async (gift: Regalo) => {
    if (!confirm(`¿Estás seguro de eliminar el regalo "${gift.name}"?`)) {
      return;
    }

    try {
      await deleteRegaloService(gift.id);
      setToastMessage("Regalo eliminado exitosamente");
      await loadData(); // Recargar la lista
    } catch (error) {
      console.error("Error eliminando regalo:", error);
      setToastMessage("Error al eliminar el regalo");
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
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Regalos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#b86b4b] text-white px-4 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors"
        >
          Agregar Regalo
        </button>
      </div>

      <GiftsTable
        data={gifts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGift(null);
        }}
        title={editingGift ? "Editar Regalo" : "Nuevo Regalo"}
      >
        {editingGift ? (
          <EditGiftForm
            initialData={editingGift}
            categories={categories}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <NewGiftForm
            categories={categories}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </Modal>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
