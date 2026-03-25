export default function GiftForm() {
  return (
    <form className="max-w-md space-y-4">
      <input placeholder="Nombre" className="w-full border p-2 rounded" />
      <input placeholder="Precio" className="w-full border p-2 rounded" />

      <button className="bg-black text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
