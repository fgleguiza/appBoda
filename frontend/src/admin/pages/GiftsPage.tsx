import { useState } from "react";
import GiftsTable from "../features/gifts/GiftsTable";
import Modal from "../components/Modal";
import NewGiftForm from "../components/forms/NewGiftForm";
import EditGiftForm from "../components/forms/EditGiftForm";
import Toast from "../components/Toast";

type GiftItem = {
  id: number;
  name: string;
  price: number;
  reserved: boolean;
  category?: number;
  imageUrl?: string;
};

export default function GiftsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingGift, setEditingGift] = useState<GiftItem | null>(null);

  // Mock de categorías - en producción vendrían de una API
  const categories = [
    { id: 1, name: "Electrodomésticos" },
    { id: 2, name: "Hogar" },
    { id: 3, name: "Experiencias" },
  ];

  const data = [
    {
      id: 1,
      name: "Tostadora",
      price: 15000,
      reserved: false,
    },
    {
      id: 2,
      name: "Cena romántica",
      price: 30000,
      reserved: true,
    },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      if (editingGift) {
        console.log("Editar regalo:", { id: editingGift.id, ...formData });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Regalo actualizado exitosamente");
      } else {
        console.log("Nuevo regalo:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Regalo creado exitosamente");
      }
      setIsModalOpen(false);
      setEditingGift(null);
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar el regalo");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (gift: GiftItem) => {
    setEditingGift(gift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGift(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#2c3e50] mb-2">Regalos</h1>
          <p className="text-[#b86b4b] text-sm">
            Administra la lista de regalos
          </p>
        </div>

        <button
          onClick={() => {
            setEditingGift(null);
            setIsModalOpen(true);
          }}
          className="bg-[#b86b4b] text-white px-6 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors font-medium text-sm"
        >
          + Nuevo
        </button>
      </div>

      <GiftsTable data={data} onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingGift ? (
          <EditGiftForm
            gift={editingGift}
            categories={categories}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={handleCloseModal}
          />
        ) : (
          <NewGiftForm
            categories={categories}
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
