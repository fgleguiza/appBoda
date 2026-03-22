type ReserveButtonProps = {
  available: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export default function ReserveButton({
  available,
  loading = false,
  onClick,
}: ReserveButtonProps) {
  return (
    <button
      disabled={!available || loading}
      onClick={onClick}
      className={`w-full mt-3 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
        available && !loading
          ? "bg-[#7A2E2E] text-white border-white/20 shadow-lg hover:bg-[#6A2626] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
      }`}
    >
      {loading ? "Reservando..." : available ? "Reservar" : "No disponible"}
    </button>
  );
}
