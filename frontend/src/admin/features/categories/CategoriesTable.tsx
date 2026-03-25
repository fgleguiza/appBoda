import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/table/DataTable";
import TableActions from "../../components/table/TableActions";

type Category = {
  id: number;
  name: string;
};

type Props = {
  data: Category[];
  onEdit?: (category: Category) => void;
};

export default function CategoriesTable({ data, onEdit }: Props) {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <TableActions
          onEdit={() => onEdit?.(row.original)}
          onDelete={() => console.log("delete", row.original)}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
