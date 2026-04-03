import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/table/DataTable";
import TableActions from "../../components/table/TableActions";
import type { Regalo } from "../../../services/admin/adminService";

type Props = {
  data: Regalo[];
  onEdit?: (gift: Regalo) => void;
  onDelete?: (gift: Regalo) => void;
};

export default function GiftsTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<Regalo>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "category.name",
      header: "Categoría",
      cell: ({ row }) => row.original.category?.name || "Sin categoría",
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.original.type === "special"
              ? "bg-[#f5e6da] text-[#b86b4b]"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.type === "special" ? "⭐ Especial" : "📦 Básico"}
        </span>
      ),
    },
    {
      accessorKey: "max_quantity",
      header: "Stock",
      cell: ({ row }) => `${row.original.available_quantity || 0}/${row.original.max_quantity}`,
    },
    {
      accessorKey: "reserved_quantity",
      header: "Reservados",
      cell: ({ row }) => row.original.reserved_quantity,
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

  return <DataTable columns={columns} data={data} />;
}
