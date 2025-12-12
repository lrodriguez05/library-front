import { Edit } from "lucide-react";
import moment from "moment/min/moment-with-locales";
moment.locale("es");
import { useState, useEffect } from "react";
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
          <div className="py-4 flex items-start gap-3" key={review.id}>
            <img
              className="w-10 h-10 rounded-full"
              src={review.avatar}
              alt="avatar"
            ></img>
            <div className="font-bold bg-white py-1 px-3 rounded-lg shadow-md max-w-6/12">
              <div className="flex justify-between gap-7 items-center">
                <p>{review.username}</p>
                <div className="flex gap-3">
                  <p>{moment(review.fecha).local().fromNow()}</p>
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
                <p>{review.editado ? "(editado)" : ""}</p>
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
