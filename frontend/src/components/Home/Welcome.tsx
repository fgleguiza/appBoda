import { LuClock, LuShirt } from "react-icons/lu";

export default function Welcome() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-[#f5e6da]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl mb-8 text-[#b86b4b] font-[Great_Vibes]">
          Te esperamos en grande
        </h2>

        <p className="font-[Cormorant_Garamond] text-lg md:text-xl mb-10 text-gray-700">
          Acompañanos a celebrar este momento único
        </p>

        <div className="flex justify-center gap-6 font-[Cormorant_Garamond]">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md shadow">
            <LuClock />
            <span className="text-sm font-medium">18:00 hs</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md shadow">
            <LuShirt />
            <span className="text-sm font-medium">Elegante</span>
          </div>
        </div>
      </div>
    </section>
  );
}
