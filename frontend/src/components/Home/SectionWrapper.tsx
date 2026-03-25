import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className = "" }: Props) {
  return (
    <section className={`w-full py-16 px-6 md:px-12 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}
