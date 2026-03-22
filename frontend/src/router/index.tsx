import { BrowserRouter, Routes, Route } from "react-router-dom";
import SaveToDate from "../pages/saveToDate";
import Gifts from "../pages/Gifts";
import InvitationGuard from "../guards/InvitationGuard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="confirm/:token"
          element={
            <InvitationGuard>
              <SaveToDate />
            </InvitationGuard>
          }
        />

        <Route
          path="/regalos/:token"
          element={
            <InvitationGuard>
              <Gifts />
            </InvitationGuard>
          }
        />

        <Route
          path="/invitacion-invalida"
          element={<div>Invitación inválida</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
