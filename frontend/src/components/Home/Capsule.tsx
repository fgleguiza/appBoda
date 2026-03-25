import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Capsule({ children }: Props) {
  return (
    <div className="px-4 py-2 rounded-xl bg-white/30 backdrop-blur-md shadow-md">
      {children}
    </div>
  );
}
