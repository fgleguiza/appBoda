import { useState } from "react";
import GuestsTable from "../features/guests/GuestsTable";
import Modal from "../components/Modal";
import NewGuestForm from "../components/forms/NewGuestForm";
import EditGuestForm from "../components/forms/EditGuestForm";
import Toast from "../components/Toast";

type GuestItem = {
  id: number;
  name: string;
  email: string;
  confirmed: boolean;
  phone?: string;
};

export default function GuestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingGuest, setEditingGuest] = useState<GuestItem | null>(null);

  const data = [
    { id: 1, name: "Juan", email: "juan@mail.com", confirmed: true },
  ];

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      if (editingGuest) {
        console.log("Editar invitado:", { id: editingGuest.id, ...formData });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Invitado actualizado exitosamente");
      } else {
        console.log("Nuevo invitado:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
        setToastMessage("Invitado agregado exitosamente");
      }
      setIsModalOpen(false);
      setEditingGuest(null);
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar el invitado");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (guest: GuestItem) => {
    setEditingGuest(guest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGuest(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#2c3e50] mb-2">Invitados</h1>
          <p className="text-[#b86b4b] text-sm">
            Gestiona la lista de invitados a tu boda
          </p>
        </div>

        <button
          onClick={() => {
            setEditingGuest(null);
            setIsModalOpen(true);
          }}
          className="bg-[#b86b4b] text-white px-6 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors font-medium text-sm"
        >
          + Nuevo
        </button>
      </div>

      <GuestsTable data={data} onEdit={handleEdit} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingGuest ? (
          <EditGuestForm
            guest={editingGuest}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={handleCloseModal}
          />
        ) : (
          <NewGuestForm
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
