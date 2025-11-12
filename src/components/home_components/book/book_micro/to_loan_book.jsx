import { useState, useContext } from "react";
import { Modal } from "antd";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../auth_components/AuthContext";
import { BookContext } from "../book_components/book_list";

export function ToLoan({ id, title }) {
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
