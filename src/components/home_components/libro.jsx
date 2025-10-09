import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
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
];

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
  );
}

export default Libro;
