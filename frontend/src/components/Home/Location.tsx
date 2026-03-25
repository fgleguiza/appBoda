export default function Location() {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl mb-6 font-semibold">Ubicación</h2>

          <div className="px-4 py-2 rounded-xl bg-white/30 backdrop-blur-md shadow-md inline-block">
            <p className="text-lg">📍 Salón Los Robles</p>
            <p className="text-sm">Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
    </section>
  );
}
