type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
      >
        Anterior
      </button>

      {/* Números */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg ${
            page === currentPage ? "bg-amber-400 text-white" : "bg-white border"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
