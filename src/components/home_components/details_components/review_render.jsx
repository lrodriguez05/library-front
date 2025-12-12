import { Edit } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import EditReview from "./edit_review";
import { Rate } from "antd";

function ReviewRender({ reviews, fetchData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const handleEditClick = (reviewId) => {
    setReviewToEdit(reviewId);
    setIsModalOpen(true);
  };

  return (
    <div>
      {reviews?.length === 0 ? (
        <p>No hay reseñas para este libro aún</p>
      ) : (
        reviews.map((review) => (
          <div className="py-4 flex items-center gap-3" key={review.id}>
            <img
              className="w-12 h-12 rounded-full"
              src={review.avatar}
              alt="avatar"
            ></img>
            <div className="font-bold bg-gray-200 p-2 rounded max-w-6/12">
              <div className="flex justify-between">
                <p>Usuario: {review.username}</p>
                <div className="flex gap-3">
                  <p>{review.editado ? "Editado" : ""}</p>
                  {review.username === localStorage.getItem("username") && (
                    <Edit
                      size={20}
                      onClick={() => handleEditClick(review.id)}
                    />
                  )}
                </div>
              </div>
              <p className="py-2">{review.comentario}</p>
              <div className="flex justify-between gap-5 items-center">
                <Rate disabled allowHalf value={review.calificacion / 2} />
                <p>{moment(review.fecha).local().format("DD/MM/YYYY HH:mm")}</p>
              </div>
            </div>
          </div>
        ))
      )}

      {isModalOpen && reviewToEdit ? (
        <EditReview
          id={reviewToEdit}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          fetchData={fetchData}
        />
      ) : null}
    </div>
  );
}

export default ReviewRender;
