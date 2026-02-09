import { useNavigate } from "react-router";
import { Edit } from "lucide-react";

export function ToEdit({ id }) {
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
