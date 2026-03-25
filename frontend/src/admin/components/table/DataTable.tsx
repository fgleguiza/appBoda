import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type DataTableProps<TData extends object> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  className?: string;
};

export function DataTable<TData extends object>({
  columns,
  data,
  className = "",
}: DataTableProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return (
      <div
        className={`rounded-xl border border-[#e8d5c4] overflow-hidden bg-white ${className}`}
      >
        <div className="p-8 text-center text-[#b86b4b]">
          <p className="text-sm font-medium">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[#e8d5c4] overflow-hidden bg-white shadow-sm ${className}`}
    >
      <table className="w-full text-sm">
        <thead className="bg-[#f5e6da] text-left border-b border-[#e8d5c4]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 font-semibold text-[#2c3e50]"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#f5e6da] hover:bg-[#f5e6da]/30 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
