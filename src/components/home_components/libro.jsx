import { Table } from "antd";
import { useEffect, useState, createContext, useContext } from "react";
import { Link } from "react-router";
import { Trash } from "lucide-react";

const columns = [
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
  },
  {
    title: "Sede",
    dataIndex: "sede",
    key: "sede",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: (data) => {
      return <Delete bookId={data.id} key={data.id} />;
    },
  },
];

function Delete({ bookId }) {
  const { fetchLibros, data } = useContext(BookContext);

  const handleDeleteBook = () => {
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

function Libro() {
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

      setLoading(false);

      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }

      const result = await response.json();
      console.log("Libros:", result.libros);
      setData(result.libros);
    } catch (err) {
      setLoading(false);
      console.error("Error cargando libros:", err);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <BookContext.Provider value={{ fetchLibros, data }}>
      <div className="flex flex-col gap-2">
        <h2>Hola desde libros</h2>
        <button
          onClick={fetchLibros}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refrescar libros
        </button>
        <Link
          to={"/crearLibro"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Añadir Libro
        </Link>
        <Table dataSource={data} columns={columns} loading={loading}></Table>
      </div>
    </BookContext.Provider>
  );
}

export default Libro;
