import { useContext } from "react"
import { InvitationContext } from "../context/InvitationContext"

export function useInvitation() {
    return useContext(InvitationContext)
}