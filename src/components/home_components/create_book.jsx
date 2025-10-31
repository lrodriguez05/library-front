import { ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

function CrearLibro() {
  const navigate = useNavigate();
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
        navigate("/libros");
      }
    } catch (e) {
      console.error("Error al crear el libro:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-full flex flex-col items-center justify-center py-5">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6 rounded shadow px-8 py-4 bg-white"
      >
        <Link to="/libros">
          <ArrowLeftIcon />
        </Link>
        <div className="flex flex-col">
          <label className="text-lg mb-2">Titulo del libro</label>
          <input
            className="border p-3 rounded-lg"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg mb-2">Autor del libro</label>
          <input
            className="border p-3 rounded-lg"
            type="text"
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg mb-2">Sede</label>
          <select
            required
            value={sedeId}
            onChange={(e) => setSedeId(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option>Seleccionar Sede</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.nombre}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={loading}
          className="bg-blue-500 w-full p-3 rounded-lg text-white mt-2 hover:bg-blue-600"
        >
          {loading ? "Agregando Libro" : "Agregar Libro"}
        </button>
      </form>
    </section>
  );
}

export default CrearLibro;
