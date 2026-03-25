type Gift = {
  id: number;
  name: string;
  image: string;
  category: string;
  available: boolean;
  selectedCount: number;
  stock: number;
  type: string;
};

const handleReserve = async () => {
  try {
    console.log("Reservado");
  } catch (error) {
    console.error(error);
  }
};

export default function GiftCard({ gift }: { gift: Gift }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-md border border-[#8C3A3A]/10 transition-all duration-300 group hover:shadow-xl">
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105 contrast-105 brightness-105"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        <div className="absolute top-2 left-2 flex items-center gap-2">
          <span className="bg-[#7A2E2E] px-3 py-1 text-xs rounded-full font-semibold text-white border border-white/20 shadow-lg">
            {gift.category}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold border backdrop-blur-md shadow-sm transition-all duration-300 ${
              gift.type === "especial"
                ? "bg-purple-900/60 text-purple-100 border-purple-400/30"
                : "bg-green-800/70 text-green-100 border-green-300/30"
            }`}
          >
            {gift.type === "especial" ? "Especial" : "Básico"}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="mt-2 space-y-2">
        <h3 className="text-[16px] font-medium text-gray-800 leading-snug">
          {gift.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs px-2 py-1 rounded-full font-medium border bg-green-50 text-green-600 border-green-200">
            {gift.stock} disponibles
          </span>

          <span className="text-xs px-2 py-1 rounded-full font-medium border bg-gray-50 text-gray-700 border-gray-200">
            {gift.selectedCount} seleccionados
          </span>
        </div>

        <button
          disabled={!gift.available}
          onClick={handleReserve}
          className={`w-full mt-3 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
            gift.available
              ? "bg-[#7A2E2E] text-white border-white/20 shadow-lg hover:bg-[#6A2626] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          }`}
        >
          {gift.available ? "Reservar" : "No disponible"}
        </button>
      </div>
    </div>
  );
}
