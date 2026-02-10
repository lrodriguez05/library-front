import Modal from "antd/es/modal/Modal";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { BookContext } from "./book_list";

function CrearLibro() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [sedes, setSedes] = useState([]);
  const [sedeId, setSedeId] = useState("");

  const { fetchLibros } = useContext(BookContext);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/sedes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
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

    if (!title || !author || !sedeId) {
      alert("Por favor ingrese los datos requeridos.");
      return;
    }

    if (cantidad <= 0) {
      alert("La cantidad de ejemplares debe ser al menos 1.");
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
            cantidad: cantidad,
          }),
        },
      );
      if (response.ok) {
        setTitle("");
        setAuthor("");
        setSedeId("");
        setCantidad(1);
        fetchLibros();
        navigate("/libros");
      }
    } catch (e) {
      console.error("Error al crear el libro:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={true}
      onCancel={() => navigate("/libros")}
      okText={loading ? "Guardano..." : "Guardar Libro"}
      cancelText="Cancelar"
      onOk={handleSubmit}
    >
      <section className="h-full flex flex-col py-5 gap-5">
        <h1 className="text-bold text-2xl">Crear Libro</h1>
        <form className="space-y-4 py-4 bg-white">
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
          <div className="flex flex-col">
            <label className="text-lg mb-2">Cantidad de Ejemplares</label>
            <input
              className="border p-3 rounded-lg"
              type="number"
              value={cantidad}
              min={1}
              required
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default CrearLibro;
