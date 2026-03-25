import { useEffect, useState } from "react";
import GiftCard from "../components/GiftCard/GiftCard";
import Pagination from "../components/Pagination";

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
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(4); // mock por ahora

  useEffect(() => {
    // 🔥 simulando llamada a API con page
    console.log("Traer datos de la página:", page);

    // mock de datos
    setGifts([
      {
        id: 1,
        name: "Cafetera Espresso",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
        category: "Electrodomésticos",
        available: true,
        selectedCount: 4,
        stock: 3,
        type: "basic",
      },
      {
        id: 2,
        name: "Juego de Toallas",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
        category: "Hogar",
        available: true,
        selectedCount: 0,
        stock: 1,
        type: "especial",
      },
    ]);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* HEADER */}
      <div className="text-center pt-10 mb-10">
        <h1 className="text-4xl font-serif text-gray-800">Lista de Regalos</h1>
      </div>

      {/* CONTENEDOR */}
      <div className="max-w-6xl mx-auto px-6">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>

        {/* 🔥 PAGINADO */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </div>
    </div>
  );
}
