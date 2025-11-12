import { useContext } from "react";
import { Trash } from "lucide-react";
import { useAuth } from "../../../auth_components/AuthContext";
import { deleteBookById } from "../../../../services/book_services";
import { BookContext } from "../book_components/book_list";

export function Delete({ id }) {
  const { fetchLibros } = useContext(BookContext);
  const { role } = useAuth();

  const handleDeleteBook = async () => {
    if (role !== "admin") {
      alert("No tienes permisos para eliminar libros");
      return;
    }
    const confirmed = confirm("¿Seguro que deseas eliminar este libro?");
    if (!confirmed) return;
    try {
      await deleteBookById(id);
      await fetchLibros();
      alert("Libro eliminado con exito");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={handleDeleteBook}>
      <Trash size={20} />
    </div>
  );
}
