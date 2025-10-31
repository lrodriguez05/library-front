import { Modal, Table } from "antd";
import { useEffect, useState, createContext, useContext } from "react";
import { Edit, Trash } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";

function ToEdit({ id }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/libros/editarLibro/${id}`);
  };

  return (
    <div onClick={handleEdit}>
      <Edit size={20} />
    </div>
  );
}

function Delete({ bookId }) {
  const { fetchLibros, data } = useContext(BookContext);
  const { role } = useAuth();

  const handleDeleteBook = () => {
    if (role !== "admin") {
      alert("No tienes permisos para eliminar libros");
      return;
    }
    if (!confirm("¿Seguro que deseas eliminar este libro?")) return;
    fetch(`${import.meta.env.VITE_API_URL}/lib/libros/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchLibros();
      })
      .catch((error) => {
        console.error("Error al eliminar el libro:", error);
      });
  };

  return (
    <div onClick={handleDeleteBook}>
      <Trash size={20} />
    </div>
  );
}

const BookContext = createContext();

function BookList() {
  const { role } = useAuth();

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Autor",
      dataIndex: "autor",
      key: "autor",
    },
    {
      title: "Prestado",
      dataIndex: "prestado",
      key: "prestado",
      render: (value) => (
        <span className={value ? "text-red-500" : "text-green-500"}>
          {value ? "Prestado" : "Disponible"}
        </span>
      ),
    },
    {
      title: "Sede",
      dataIndex: "sede",
      key: "sede",
    },
  ];
  if (role === "admin") {
    columns.push({
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (data) => {
        return (
          <div className="flex gap-3">
            <Delete bookId={data.id} />
            <ToEdit id={data.id} />
          </div>
        );
      },
    });
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLibros = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }

      const result = await response.json();
      console.log("Libros:", result.libros);
      setData(result.libros);
    } catch (err) {
      setLoading(false);
      console.error("Error cargando libros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <BookContext.Provider value={{ fetchLibros, data }}>
      <section>
        <h1>Hola desde listado de libros</h1>
        <Table dataSource={data} columns={columns} loading={loading}></Table>
      </section>
    </BookContext.Provider>
  );
}

export default BookList;
