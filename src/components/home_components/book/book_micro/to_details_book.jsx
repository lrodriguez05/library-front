import { useNavigate } from "react-router";
import { Info } from "lucide-react";

export function ToDetails({ id }) {
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
