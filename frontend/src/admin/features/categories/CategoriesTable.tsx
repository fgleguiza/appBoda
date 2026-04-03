import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/table/DataTable";
import TableActions from "../../components/table/TableActions";
import type { Categoria } from "../../../services/admin/adminService";

type Props = {
  data: Categoria[];
  onEdit?: (category: Categoria) => void;
  onDelete?: (category: Categoria) => void;
};

export default function CategoriesTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<Categoria>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => row.original.description || "Sin descripción",
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
