import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
}

export default function Badge({ icon, text }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md shadow">
      <span>{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
