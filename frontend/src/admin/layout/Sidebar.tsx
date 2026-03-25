import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white text-gray-800 p-6 border-r border-[#e8d5c4] flex flex-col">
      <h2 className="text-2xl font-light mb-8 text-[#b86b4b]">Bodas</h2>

      <nav className="flex flex-col gap-1">
        <Link
          to="/admin/invitados"
          className="px-4 py-3 text-sm rounded-lg transition-all hover:bg-[#f5e6da] hover:text-[#b86b4b] text-gray-700 font-medium"
        >
          👥 Invitados
        </Link>
        <Link
          to="/admin/categorias"
          className="px-4 py-3 text-sm rounded-lg transition-all hover:bg-[#f5e6da] hover:text-[#b86b4b] text-gray-700 font-medium"
        >
          📂 Categorías
        </Link>
        <Link
          to="/admin/regalos"
          className="px-4 py-3 text-sm rounded-lg transition-all hover:bg-[#f5e6da] hover:text-[#b86b4b] text-gray-700 font-medium"
        >
          🎁 Regalos
        </Link>
      </nav>
    </aside>
  );
}
