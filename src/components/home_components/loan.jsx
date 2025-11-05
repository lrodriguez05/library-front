import { Table } from "antd";
import { createContext, useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../AuthContext";
import { EyeClosed } from "lucide-react";

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
          <span className={data ? "text-red-500" : "text-green-500"}>
            {data ? "Disponible" : "Prestado"}
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
          console.log(data),
          (
            <div>
              <EyeClosed onClick={handleBack(data.id)} />
            </div>
          )
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
