import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

// 🌐 PUBLIC (WEB)
import Home from "../pages/Home";
import Gifts from "../pages/Gifts";
import NotFound from "../pages/NotFound";
import { TokenGuard } from "../guards/TokenGuard";
import { HomeGuard } from "../guards/HomeGuard";
import { AdminTokenGuard } from "../guards/AdminTokenGuard";

// 🔒 ADMIN
import AdminLayout from "../admin/layout/AdminLayout";
import GuestsPage from "../admin/pages/GuestsPage";
import CategoriesPage from "../admin/pages/CategoriesPage";
import GiftsPage from "../admin/pages/GiftsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ==================== */}
          {/* � INVITADO ROUTES (requiere token) */}
          {/* ==================== */}

          {/* Página de inicio con token compartible (verifica y guarda token) */}
          <Route
            path="/home/:token"
            element={
              <HomeGuard>
                <Home />
              </HomeGuard>
            }
          />

          {/* Regalos (accedido con token en URL) */}
          <Route
            path="/regalos/:token"
            element={
              <TokenGuard requiredRole="invitado">
                <Gifts />
              </TokenGuard>
            }
          />

          {/* ==================== */}
          {/* 🔐 ADMIN ROUTES (requiere token + role = "novio") */}
          {/* ==================== */}

          <Route
            path="/admin/:token"
            element={
              <AdminTokenGuard>
                <AdminLayout />
              </AdminTokenGuard>
            }
          >
            <Route path="invitados" element={<GuestsPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="regalos" element={<GiftsPage />} />
          </Route>

          {/* ==================== */}
          {/* ❌ ERROR PAGES */}
          {/* ==================== */}

          <Route path="/404" element={<NotFound />} />

          {/* Fallback: cualquier ruta desconocida */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
