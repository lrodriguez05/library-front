import { Modal, Table } from "antd";
import { useEffect, useState, createContext, useContext } from "react";
import { Edit, Trash, Eye, Info } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router";
import { Outlet } from "react-router";

function Loan({ id, title }) {
  const { fetchLibros } = useContext(BookContext);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const actualDate = new Date().toISOString().split("T")[0];
  const { userId } = useAuth();
  const navigate = useNavigate();
  const handleLoan = async (id) => {
    if (!date) {
      alert("Por favor ingrese una fecha de devolucion");
      return;
    }
    if (date <= actualDate) {
      alert("La fecha de devolucion debe ser posterior a la fecha actual");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/prestados/registrar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id_libro: id,
            usuario: userId,
            fecha_devolucion: date,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchLibros();
        setOpen(false);
      } else {
        alert(`Error al prestar libro: ${data.message}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  return (
    <div>
      <Eye
        size={20}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        open={open}
        onCancel={handleClose}
        title={title}
        okText="Prestar"
        cancelText="Cancelar"
        onOk={() => {
          handleLoan(id, title);
        }}
      >
        <p>
          Desea perdir prestado el libro: {title}, por favor introduzca de
          devolucion del libro
        </p>
        <br></br>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </Modal>
    </div>
  );
}

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

function ToDetails({ id }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/libros/detalles/${id}`);
  };

  return (
    <div onClick={handleDetails}>
      <Info size={20} />
    </div>
  );
}

function Delete({ id }) {
  const { fetchLibros, data } = useContext(BookContext);
  const { role } = useAuth();

  const handleDeleteBook = () => {
    if (role !== "admin") {
      alert("No tienes permisos para eliminar libros");
      return;
    }
    if (!confirm("¿Seguro que deseas eliminar este libro?")) return;
    fetch(`${import.meta.env.VITE_API_URL}/lib/libros/${id}`, {
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

export const BookContext = createContext();

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
      title: "Cant. Ejemplares",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Veces Prestado",
      dataIndex: "veces_prestado",
      key: "veces_prestado",
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
            <Delete id={data.id} />
            <ToEdit id={data.id} />
            <Loan id={data.id} title={data.titulo} autor={data.autor} />
            <ToDetails id={data.id} />
          </div>
        );
      },
    });
  } else {
    columns.push({
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (data) => {
        return (
          <div className="flex gap-3">
            <Loan id={data.id} title={data.titulo} autor={data.autor} />
            <ToDetails id={data.id} />
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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Listado de Libros</h2>
          <Link
            to={"crearLibro"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Añadir Libro
          </Link>
        </div>
        <section>
          <Table dataSource={data} columns={columns} loading={loading}></Table>
        </section>
      </div>
      <Outlet />
    </BookContext.Provider>
  );
}

export default BookList;
