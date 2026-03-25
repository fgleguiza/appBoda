import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/table/DataTable";
import TableActions from "../../components/table/TableActions";

type Gift = {
  id: number;
  name: string;
  price: number;
  reserved: boolean;
  category?: number;
};

type Props = {
  data: Gift[];
  onEdit?: (gift: Gift) => void;
};

export default function GiftsTable({ data, onEdit }: Props) {
  const columns: ColumnDef<Gift>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "reserved",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.original.reserved
              ? "bg-[#f5e6da] text-[#b86b4b]"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.original.reserved ? "🎁 Reservado" : "✓ Disponible"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <TableActions
          onEdit={() => onEdit?.(row.original)}
          onDelete={() => {
            if (confirm("¿Eliminar regalo?")) {
              console.log("delete", row.original);
            }
          }}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
