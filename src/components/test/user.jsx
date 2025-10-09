import { Table } from "antd";
import { Trash } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: (data) => {
      return <Delete userId={data.id} key={data.id} />;
    },
  },
];

function Delete({ userId }) {
  const { fetchUsers, data } = useContext(UserContext);
  const { role } = useAuth();

  const handleDeleteUser = () => {
    if (role !== "admin") {
      alert("No tienes permisos para eliminar usuarios");
      return;
    }

    const userToDelete = data.find((user) => user.id === userId);

    if (userToDelete && userToDelete.role === "admin") {
      alert("No se puede eliminar a otro administrador");
      return;
    }

    if (data.length === 1) {
      alert("No se puede eliminar el último usuario");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div onClick={handleDeleteUser}>
      <Trash size={20} />
    </div>
  );
}

const UserContext = createContext();

function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const result = await response.json();
      console.log("Usuarios:", result.users);
      setData(result.users);
    } catch (err) {
      setLoading(false);
      console.error("Error cargando usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ fetchUsers, data }}>
      <div>
        <h1>Hola desde users</h1>
        <Table dataSource={data} columns={columns} loading={loading} />
      </div>
    </UserContext.Provider>
  );
}

export default User;
