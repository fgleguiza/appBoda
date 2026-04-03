import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../../components/table/DataTable";
import TableActions from "../../components/table/TableActions";
import Toast from "../../components/Toast";

type Guest = {
  id: number;
  name: string;
  email: string;
  confirmed: boolean;
  token: string;
};

export default function GuestsTable({
  data,
  onEdit,
  onDelete,
  onCopyLink,
  onCopyGiftList,
}: {
  data: Guest[];
  onEdit?: (guest: Guest) => void;
  onDelete?: (guest: Guest) => void;
  onCopyLink?: (guest: Guest) => void;
  onCopyGiftList?: (guest: Guest) => void;
}) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const columns: ColumnDef<Guest>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "confirmed",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.original.confirmed
              ? "bg-[#f5e6da] text-[#b86b4b]"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.confirmed ? "✓ Confirmado" : "⏳ Pendiente"}
        </span>
      ),
    },
    {
      id: "web",
      header: "Web",
      cell: ({ row }) => (
        <button
          onClick={() => onCopyLink?.(row.original)}
          className="px-3 py-1 text-xs bg-white text-[#b86b4b] rounded-md hover:bg-[#f5e6da] transition-colors font-medium border border-[#e8d5c4]"
        >
          Web
        </button>
      ),
    },
    {
      id: "gift-list",
      header: "Lista de regalos",
      cell: ({ row }) => (
        <button
          onClick={() => onCopyGiftList?.(row.original)}
          className="px-3 py-1 text-xs bg-[#e8d5c4] text-[#b86b4b] rounded-md hover:bg-[#d4c4b4] transition-colors font-medium"
        >
          Lista de regalos
        </button>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <TableActions
          onEdit={() => onEdit?.(row.original)}
          onDelete={() => onDelete?.(row.original)}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
