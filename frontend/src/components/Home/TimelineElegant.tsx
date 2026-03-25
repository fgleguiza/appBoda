import type { ReactNode } from "react";
import { GiDiamondRing } from "react-icons/gi";
import { LuUtensils } from "react-icons/lu";
import { GiMute } from "react-icons/gi";
import { LuGlassWater } from "react-icons/lu";
import { LuCar } from "react-icons/lu";

interface EventItem {
  title: string;
  icon: ReactNode;
}

const events: EventItem[] = [
  { title: "Ceremonia", icon: <GiDiamondRing /> },
  { title: "Almuerzo", icon: <LuUtensils /> },
  { title: "Mate", icon: <GiMute /> },
  { title: "Brindis", icon: <LuGlassWater /> },
  { title: "Despedida de Novios", icon: <LuCar /> },
];

export default function TimelineElegant() {
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-[#e8d5c4]">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-[Great_Vibes] text-[#b86b4b]">
            Itinerario
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#b86b4b]/50 -translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="relative flex items-center">
                  <div
                    className={`w-1/2 ${
                      isLeft
                        ? "pr-6 flex justify-end"
                        : "pl-6 flex justify-start ml-auto"
                    }`}
                  >
                    <div className="flex items-center gap-3 px-2 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:scale-105 transition duration-300">
                      {isLeft ? (
                        <>
                          <span className="font-[Cormorant_Garamond] text-[17px] font-normal text-[#5a463f] tracking-wide">
                            {event.title}
                          </span>
                          <span className="text-[20px] text-[#8c4b47] opacity-90">
                            {event.icon}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[20px] text-[#8c4b47] opacity-90">
                            {event.icon}
                          </span>
                          <span className="font-[Cormorant_Garamond] text-[17px] font-normal text-[#5a463f] tracking-wide">
                            {event.title}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#b86b4b] rounded-full border-[3px] border-[#e8d5c4]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
