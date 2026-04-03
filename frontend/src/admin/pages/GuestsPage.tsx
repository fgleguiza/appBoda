import { useState, useEffect } from "react";
import GuestsTable from "../features/guests/GuestsTable";
import Modal from "../components/Modal";
import NewGuestForm from "../components/forms/NewGuestForm";
import EditGuestForm from "../components/forms/EditGuestForm";
import Toast from "../components/Toast";
import {
  getInvitadosService,
  createInvitadoService,
  updateInvitadoService,
  deleteInvitadoService,
  type Invitado,
} from "../../services/admin/adminService";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Invitado[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Invitado | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar invitados al montar el componente
  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setLoadingData(true);
      const data = await getInvitadosService();
      setGuests(data);
    } catch (error) {
      console.error("Error cargando invitados:", error);
      setToastMessage("Error al cargar los invitados");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      if (editingGuest) {
        await updateInvitadoService(editingGuest.id, {
          nombre_invitado: formData.nombre_invitado,
          email_invitado: formData.email_invitado,
          role: formData.role,
          confirmado: formData.confirmado,
        });
        setToastMessage("Invitado actualizado exitosamente");
      } else {
        await createInvitadoService({
          nombre_invitado: formData.nombre_invitado,
          email_invitado: formData.email_invitado,
          role: formData.role,
        });
        setToastMessage("Invitado agregado exitosamente");
      }
      setIsModalOpen(false);
      setEditingGuest(null);
      await loadGuests(); // Recargar la lista
    } catch (error) {
      console.error(error);
      setToastMessage("Error al guardar el invitado");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (guest: Invitado) => {
    setEditingGuest(guest);
    setIsModalOpen(true);
  };

  const handleDelete = async (guest: Invitado) => {
    if (!confirm(`¿Estás seguro de eliminar a ${guest.nombre_invitado}?`)) {
      return;
    }

    try {
      await deleteInvitadoService(guest.id);
      setToastMessage("Invitado eliminado exitosamente");
      await loadGuests(); // Recargar la lista
    } catch (error) {
      console.error("Error eliminando invitado:", error);
      setToastMessage("Error al eliminar el invitado");
    }
  };

  const handleCopyLink = (guest: Invitado) => {
    const link = `${window.location.origin}/home/${guest.token}`;
    navigator.clipboard.writeText(link);
    setToastMessage("Enlace web copiado");
  };

  const handleCopyGiftList = (guest: Invitado) => {
    const link = `${window.location.origin}/regalos/${guest.token}`;
    navigator.clipboard.writeText(link);
    setToastMessage("Enlace de lista de regalos copiado");
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
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Invitados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#b86b4b] text-white px-4 py-2 rounded-lg hover:bg-[#a35d3d] transition-colors"
        >
          Agregar Invitado
        </button>
      </div>

      <GuestsTable
        data={guests.map((guest) => ({
          id: guest.id,
          name: guest.nombre_invitado,
          email: guest.email_invitado || "",
          confirmed: guest.confirmado,
          token: guest.token,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCopyLink={handleCopyLink}
        onCopyGiftList={handleCopyGiftList}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGuest(null);
        }}
        title={editingGuest ? "Editar Invitado" : "Nuevo Invitado"}
      >
        {editingGuest ? (
          <EditGuestForm
            initialData={{
              nombre_invitado: editingGuest.nombre_invitado,
              email_invitado: editingGuest.email_invitado || "",
              role: editingGuest.role,
              confirmado: editingGuest.confirmado,
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <NewGuestForm onSubmit={handleSubmit} loading={loading} />
        )}
      </Modal>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
