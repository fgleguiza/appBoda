import { createContext, useState } from "react"

interface InvitationContextType {
  token?: string
  guest?: any
  setInvitation: (data: any) => void
}

export const InvitationContext = createContext<InvitationContextType>({
  setInvitation: () => {}
})

export function InvitationProvider({ children }: { children: React.ReactNode }) {

  const [token, setToken] = useState<string>()
  const [guest, setGuest] = useState<any>()

  const setInvitation = (data: any) => {
    setToken(data.token)
    setGuest(data.guest)
  }

  return (
    <InvitationContext.Provider value={{ token, guest, setInvitation }}>
      {children}
    </InvitationContext.Provider>
  )
}