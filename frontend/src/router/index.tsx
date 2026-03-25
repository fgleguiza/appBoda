import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌐 PUBLIC (WEB)
import Home from "../pages/Home";
import Gifts from "../pages/Gifts";
import SaveToDate from "../pages/saveToDate";
import InvitationGuard from "../guards/InvitationGuard";

// 🔒 ADMIN
import AdminLayout from "../admin/layout/AdminLayout";
import GuestsPage from "../admin/pages/GuestsPage";
import CategoriesPage from "../admin/pages/CategoriesPage";
import GiftsPage from "../admin/pages/GiftsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== */}
        {/* 🌐 PUBLIC ROUTES */}
        {/* ==================== */}

        <Route
          path="/confirm/:token"
          element={
            <InvitationGuard>
              <SaveToDate />
            </InvitationGuard>
          }
        />

        <Route path="/regalos/" element={<Gifts />} />
        <Route path="/home/" element={<Home />} />

        <Route
          path="/invitacion-invalida"
          element={<div>Invitación inválida</div>}
        />

        {/* ==================== */}
        {/* 🔒 ADMIN ROUTES */}
        {/* ==================== */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="invitados" element={<GuestsPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="regalos" element={<GiftsPage />} />
        </Route>

        {/* ==================== */}
        {/* ❌ FALLBACK */}
        {/* ==================== */}

        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
