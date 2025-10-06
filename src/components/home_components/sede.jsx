import { Table } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre de la sede",
    dataIndex: "nombre",
    key: "nombre",
  },
];

function Sede() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSedes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/sedes`,
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
        throw new Error("Error al obtener las sedes");
      }

      const result = await response.json();
      console.log("Sedes:", result.sedes);
      setData(result.sedes);
    } catch (err) {
      setLoading(false);
      console.error("Error cargando las sedes:", err);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);
  return (
    <div>
      <h1>Hola desde sedes</h1>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
}

export default Sede;
