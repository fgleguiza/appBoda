import { LuGift, LuExternalLink } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";

export default function GiftList() {
  const { token } = useAuth();
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-[#EACB91]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl mb-8 text-[#a3543a] font-[Great_Vibes]">
          Lista de Regalos
        </h2>

        <p className="font-[Cormorant_Garamond] text-lg md:text-xl mb-10 text-[#5a463f] max-w-xl mx-auto">
          Tu presencia es lo más importante para nosotros. Si querés hacernos un
          regalo, podés ver nuestra lista o colaborar con nuestra luna de miel.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="px-8 py-6 rounded-2xl bg-white/25 backdrop-blur-lg border border-white/40 shadow-md">
            <div className="flex items-center justify-center gap-2 text-[#8c4b47] mb-2">
              <LuGift className="text-xl" />
              <span className="font-[Cormorant_Garamond] text-lg">
                Transferencia
              </span>
            </div>
            <p className="font-[Cormorant_Garamond] text-sm text-[#5a463f]">
              Alias: facu.aldi.boda
            </p>
          </div>

          <a
            href={`/regalos/${token}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-[#b86b4b]/30 border border-[#b86b4b]/40 text-[#2c3e50] font-[Cormorant_Garamond] font-semibold text-base shadow-md hover:scale-105 hover:opacity-90 transition"
          >
            Ver lista de regalos
            <LuExternalLink />
          </a>
        </div>
      </div>
    </section>
  );
}
