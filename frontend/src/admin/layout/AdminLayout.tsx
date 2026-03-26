import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleGoToWeb = () => {
    if (token) {
      navigate(`/home/${token}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5e6da]">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-white via-[#faf7f2] to-[#f5e6da]">
        {/* Alert Banner */}
        <div className="mb-6 bg-[#f5e6da] border-l-4 border-[#b86b4b] p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[#2c3e50] font-medium">
              ¿Quieres ver la página web? 🌐
            </p>
            <p className="text-[#b86b4b] text-sm">
              Haz clic en el botón para ir a la página principal
            </p>
          </div>
          <button
            onClick={handleGoToWeb}
            className="ml-4 px-6 py-2 bg-[#b86b4b] text-white rounded-lg hover:bg-[#a35d3d] transition font-medium whitespace-nowrap"
          >
            Ir a Página Web
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
