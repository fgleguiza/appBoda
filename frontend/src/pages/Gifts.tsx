import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GiftCard from "../components/GiftCard/GiftCard";
import Pagination from "../components/Pagination";
import { getGuestRegalosService } from "../services/guestService";
import type { Regalo } from "../services/guestService";

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

export default function Gifts() {
  const { token } = useParams<{ token: string }>();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGifts();
  }, [page]);

  const loadGifts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener regalos de la API pública para invitados
      const regalos = await getGuestRegalosService();

      // Transformar datos de Regalo a Gift
      const transformedGifts: Gift[] = regalos.map((regalo: Regalo) => ({
        id: regalo.id,
        name: regalo.name,
        image: regalo.image_url || "https://via.placeholder.com/400x300?text=Sin+Imagen",
        category: regalo.category?.name || "Sin Categoría",
        available: (regalo.available_quantity || 0) > 0,
        selectedCount: regalo.reserved_quantity || 0,
        stock: regalo.available_quantity || (regalo.max_quantity - (regalo.reserved_quantity || 0)),
        type: regalo.type,
      }));

      setGifts(transformedGifts);
    } catch (err) {
      console.error("Error cargando regalos:", err);
      setError("No se pudieron cargar los regalos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
          <p className="mt-4 text-gray-600">Cargando regalos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadGifts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* CONTENEDOR */}
      <div className="max-w-6xl mx-auto px-6">
        {/* GRID */}
        {gifts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay regalos disponibles en esta lista</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gifts.map((gift) => (
                <GiftCard key={gift.id} gift={gift} />
              ))}
            </div>

            {/* 🔥 PAGINADO */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
