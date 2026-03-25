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
};

export default function GuestsTable({
  data,
  onEdit,
}: {
  data: Guest[];
  onEdit?: (guest: Guest) => void;
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
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <TableActions
          onEdit={() => onEdit?.(row.original)}
          onDelete={() => console.log("delete", row.original)}
          onCopy={() => {
            navigator.clipboard.writeText(
              `https://tuapp.com/invitacion/${row.original.id}`,
            );
            setToastMessage("Enlace de invitación copiado");
          }}
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
