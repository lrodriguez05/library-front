import { useState } from "react";

function CrearLibro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ titulo: title, autor: author, sede_id: 1 }),
        }
      );
      if (response.ok) {
        setTitle("");
        setAuthor("");
      }
    } catch (e) {
      console.error("Error al crear el libro:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-4 border p-6 rounded shadow-md bg-white"
        onSubmit={handleSubmit}
      >
        <label>Titulo del Libro</label>
        <input
          required
          value={title}
          type="text"
          className="border p-3 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Autor del Libro</label>
        <input
          required
          value={author}
          type="text"
          className="border p-3 rounded-lg"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Sede</label>
        <select>
          <option value="1">Sede 1</option>
          <option value="2">Sede 2</option>
          <option value="3">Sede 3</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Libro"}
        </button>
      </form>
    </section>
  );
}

export default CrearLibro;
