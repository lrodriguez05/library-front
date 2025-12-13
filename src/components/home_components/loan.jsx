import { Table, Modal } from "antd";
import { createContext, useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../auth_components/AuthContext";
import { ArrowLeft, BookOpen } from "lucide-react";

const LoanContext = createContext();

function Prestamos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { role, userId } = useAuth();

  const handleBack = (id) => async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/prestados/devolver/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al devolver el libro");
      }
      fetchPrestamos();
    } catch (err) {
      console.error("Error devolviendo el libro:", err);
    }
  };

  function CreateReview({ id }) {
    const [openModal, setOpenModal] = useState(false);
    const [resena, setResena] = useState("");
    const [calificacion, setCalificacion] = useState(1);
    const handleOpenReviewModal = () => {
      setOpenModal(true);
      console.log("Open review modal for book ID:", id);
    };

    const handleReview = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/resenas/crearResena/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              id_libro: id,
              comentario: resena,
              calificacion: calificacion,
              usuario: userId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Error al crear la reseña");
        }
        setOpenModal(false);
      } catch (err) {
        console.error("Error creando la reseña:", err);
      }
    };

    return (
      <div>
        <BookOpen
          onClick={handleOpenReviewModal}
          size={20}
          className="cursor-pointer"
        />
        <Modal
          title="Crear Reseña"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={() => {
            handleReview();
            setOpenModal(false);
          }}
        >
          <form className="space-y-2 py-4 bg-white">
            <div className="flex flex-col">
              <label className="text-lg mb-2">Calificacion de 1-10</label>
              <input
                className="border p-3 rounded-lg"
                type="number"
                min="1"
                max="10"
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg mb-2">Escriba su reseña</label>
              <textarea
                className="border p-3 rounded-lg"
                type="text"
                value={resena}
                onChange={(e) => {
                  if (e.target.value.length <= 300) setResena(e.target.value);
                }}
              />
            </div>
            <p className="text-sm opacity-70 text-end">{resena.length}/300</p>
          </form>
        </Modal>
      </div>
    );
  }

  const fetchPrestamos = async () => {
    if (role !== "admin") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/prestados/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        console.log("Prestamos:", result.prestados);
        setData(result.prestados);
      } catch (err) {
        console.error("Error cargando prestamos:", err);
      }
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/prestados`,
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
        throw new Error("Error al obtener los prestamos");
      }

      const result = await response.json();
      console.log("Prestamos:", result.prestados);
      setData(result.prestados);
    } catch (err) {
      setLoading(false);
      console.error("Error cargando prestamos:", err);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Libro",
      dataIndex: "id_libro",
      key: "id_libro",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Fecha Prestamo",
      dataIndex: "fecha_prestamo",
      key: "fecha_prestamo",
      render: (data) => {
        return <span>{moment(data).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      title: "Fecha Devolucion",
      dataIndex: "fecha_devolucion",
      key: "fecha_devolucion",
      render: (data) => {
        return (
          <span>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY HH:mm")}</span>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "devuelto",
      key: "devuelto",
      render: (data) => {
        return (
          <span className={data ? "text-green-500" : "text-red-500"}>
            {data ? "Devuelto" : "Prestado"}
          </span>
        );
      },
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "action",
      render: (data) => {
        return (
          <div className="flex gap-3">
            <CreateReview id={data.id_libro} />
            <ArrowLeft
              onClick={handleBack(data.id)}
              size={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
    <LoanContext.Provider value={{ data }}>
      <section>
        <h1>Prestamos de Libros</h1>
        <Table dataSource={data} loading={loading} columns={columns}></Table>
      </section>
    </LoanContext.Provider>
  );
}
export default Prestamos;
