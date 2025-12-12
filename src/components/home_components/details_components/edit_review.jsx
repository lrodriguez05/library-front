import { Modal, Rate } from "antd";
import { useState, useEffect } from "react";
import { getReviewById } from "../../../services/review_services";
import { useNavigate } from "react-router";

function EditReview({ id, open, setOpen, fetchData }) {
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState("0");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      const data = await getReviewById(id);
      setReview(data.comentario);
      setRating(data.calificacion);
      setLoading(false);
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/resenas/editar/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comentario: review,
          calificacion: String(rating),
        }),
      }
    );
    if (response.ok) {
      setLoading(false);
      setOpen(false);
      fetchData();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      cancelText="Cancelar"
      okText="Guardar"
      onOk={() => {
        handleSubmit();
      }}
      confirmLoading={loading}
    >
      {review ? (
        <div>
          <form>
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2">Comentario</label>
              <textarea
                className="border p-3 rounded-lg"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col mb-4 text-center">
              <label className="text-lg mb-2">Calificación</label>
              <Rate
                allowHalf
                value={rating / 2}
                onChange={(value) => setRating(value * 2)}
              />
            </div>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Modal>
  );
}

export default EditReview;
