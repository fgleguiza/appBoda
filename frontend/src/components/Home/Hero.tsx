import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section
      className="h-screen flex flex-col items-center justify-center text-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-light tracking-wide">
          Facu & Aldi
        </h1>
        <Countdown />
      </div>
    </section>
  );
}
