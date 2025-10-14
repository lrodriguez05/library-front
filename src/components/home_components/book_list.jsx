import { Modal, Table } from "antd";
import { useEffect, useState, createContext, useContext } from "react";
import { Edit, Trash } from "lucide-react";
import { useAuth } from "../AuthContext";

function EditBook({ bookId }) {
  const { fetchLibros } = useContext(BookContext);
  const { role } = useAuth();
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [sedes, setSedes] = useState([]);
  const [sedeId, setSedeId] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      alert("No tienes permisos para editar libros");
      return;
    }

    try {
      const bookResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros/${bookId}`,
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
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/libros/${bookId}`,
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
          setOpen(false);
          setSucces("");
        }, 1500);

        fetchLibros();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div onClick={handleOpenModal}>
        <Edit size={20} />
      </div>
      <Modal
        open={open}
        footer={null}
        destroyOnHidden
        centered
        onCancel={() => {
          setOpen(false);
        }}
      >
        <h1 className="text-center text-bold text-2xl mb-5">
          Editor de libros
        </h1>
        <form onSubmit={handleEdit} className="space-y-4 mt-6">
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
          <button
            disabled={loading}
            className="bg-blue-500 w-full p-3 rounded-lg text-white mt-2 hover:bg-blue-600"
          >
            {loading ? "Guardando Cambios" : "Guardar Cambios"}
          </button>
        </form>
      </Modal>
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
            <EditBook bookId={data.id} />
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
      <section>
        <h1>Hola desde listado de libros</h1>
        <Table dataSource={data} columns={columns} loading={loading}></Table>
      </section>
    </BookContext.Provider>
  );
}

export default BookList;
