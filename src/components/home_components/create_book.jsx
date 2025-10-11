import { useState, useEffect } from "react";

function CrearLibro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [sedes, setSedes] = useState([]);
  const [sedeId, setSedeId] = useState("");

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/sedes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Error al cargar sedes");
        const data = await response.json();

        setSedes(data.sedes);
      } catch (e) {
        console.error("Error al obtener sedes:", e);
      }
    };

    fetchSedes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sedeId) {
      alert("Por favor selecciona una sede.");
      return;
    }

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
          body: JSON.stringify({
            titulo: title,
            autor: author,
            sede_id: sedeId,
          }),
        }
      );
      if (response.ok) {
        setTitle("");
        setAuthor("");
        setSedeId("");
      }
    } catch (e) {
      console.error("Error al crear el libro:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-full flex flex-col items-center justify-center py-5">
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
        <label>Seleccione la Sede</label>
        <select
          required
          value={sedeId}
          onChange={(e) => setSedeId(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Selecciona una sede</option>
          {sedes.map((sede) => (
            <option key={sede.id} value={sede.id}>
              {sede.nombre}
            </option>
          ))}
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
