type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
};

export default function TableActions({ onEdit, onDelete, onCopy }: Props) {
  return (
    <div className="flex gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="px-3 py-1 text-xs bg-[#f5e6da] text-[#b86b4b] rounded-md hover:bg-[#e8d5c4] transition-colors font-medium"
        >
          Editar
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium"
        >
          Eliminar
        </button>
      )}

      {onCopy && (
        <button
          onClick={onCopy}
          className="px-3 py-1 text-xs bg-white text-[#b86b4b] rounded-md hover:bg-[#f5e6da] transition-colors font-medium border border-[#e8d5c4]"
        >
          Copiar
        </button>
      )}
    </div>
  );
}
