import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5e6da]">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-white via-[#faf7f2] to-[#f5e6da]">
        <Outlet />
      </main>
    </div>
  );
}
