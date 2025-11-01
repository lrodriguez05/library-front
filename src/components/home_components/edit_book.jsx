import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../AuthContext";
import { Modal } from "antd";
import { BookContext } from "./book_list";

function EditBook() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [sedes, setSedes] = useState([]);
  const [sedeId, setSedeId] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchLibros } = useContext(BookContext);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
      return;
    }
    handleGetBook();
  }, [role]);
  const handleGetBook = async () => {
    try {
      const bookResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const sedeResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/sedes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const sedeData = await sedeResponse.json();
      setSedes(sedeData.sedes);
      const bookData = await bookResponse.json();
      if (bookResponse.ok) {
        console.log(bookData, titulo, autor);
        setTitulo(bookData.libro.titulo);
        setAutor(bookData.libro.autor);
        setSedeId(bookData.libro.id_sede);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            titulo: titulo,
            autor: autor,
            id_sede: sedeId,
          }),
        }
      );
      if (response.ok) {
        setSucces("Libro editado correctamente");
        setTimeout(() => {
          setSucces("");
        }, 1500);
        fetchLibros();
        navigate("/libros");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      open={true}
      onCancel={() => navigate("/libros")}
      okText={loading ? "Guardando..." : "Guardar Cambios"}
      cancelText="Cancelar"
      onOk={handleEdit}
    >
      <div className="h-full flex flex-col py-5">
        <h1 className="text-bold text-2xl mb-5">Editar Libro {titulo}</h1>
        <form className="space-y-4 py-4 bg-white">
          <div className="flex flex-col">
            <label className="text-lg mb-2">Titulo del libro</label>
            <input
              className="border p-3 rounded-lg"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2">Autor del libro</label>
            <input
              className="border p-3 rounded-lg"
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
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
              {sedes.map((sede) => (
                <option key={sede.id} value={sede.id}>
                  {sede.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="text-green-700 text-center">{succes}</div>
        </form>
      </div>
    </Modal>
  );
}

export default EditBook;
