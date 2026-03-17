import { BrowserRouter, Routes, Route } from "react-router-dom"
import Confirm from "../pages/Confirm"
import Gifts from "../pages/Gifts"
import InvitationGuard from "../guards/InvitationGuard"

export default function Router() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/confirmacion/:token"
          element={
            <InvitationGuard>
              <Confirm />
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

      </Routes>

    </BrowserRouter>
  )
}