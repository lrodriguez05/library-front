import { Edit, EllipsisVertical, Trash } from "lucide-react";
import moment from "moment/min/moment-with-locales";
moment.locale("es");
import { useState, useEffect } from "react";
import EditReview from "./edit_review";
import { Rate, Dropdown } from "antd";
import { deleteReviewById } from "../../../services/review_services";

function ReviewRender({ reviews, fetchData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const optionMenu = (reviewId) => {
    return [
      {
        key: "1",
        label: "Editar Reseña",
        icon: <Edit size={16} />,
        onClick: () => handleEditClick(reviewId),
      },
      {
        key: "2",
        label: "Eliminar Reseña",
        icon: <Trash size={16} />,
        danger: true,
        onClick: () => handleDeleteClick(reviewId),
      },
    ];
  };

  const handleDeleteClick = (reviewId) => {
    const confirmed = confirm("¿Seguro que deseas eliminar esta reseña?");
    if (!confirmed) return;
    const deleteReview = async () => {
      try {
        await deleteReviewById(reviewId);
        await fetchData();
        alert("Reseña eliminada con exito");
      } catch (error) {
        console.error(error);
      }
    };
    deleteReview();
  };

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
              className="mt-4 w-10 h-10 rounded-full"
              src={review.avatar}
              alt="avatar"
            ></img>
            <div className="flex flex-col gap-2 font-bold bg-white p-5 rounded-2xl shadow-md md:max-w-6/12 max-w-full">
              <div className="flex justify-between gap-7 items-center">
                <p>{review.username}</p>
                <div className="flex gap-3 items-center">
                  <p className="opacity-80 text-md">
                    {moment(review.fecha).local().fromNow()}
                  </p>
                  {review.username === localStorage.getItem("username") && (
                    <Dropdown
                      menu={{ items: optionMenu(review.id) }}
                      trigger={["click"]}
                    >
                      <EllipsisVertical size={16} className="cursor-pointer" />
                    </Dropdown>
                  )}
                </div>
              </div>
              <p className="mt-2 p-2 min-h-24 border border-gray-200 text-gray-700 rounded-lg bg-gray-50 leading-relaxed font-semibold">
                {review.comentario}
              </p>
              <div className="flex justify-between gap-3 items-center pt-2">
                <Rate disabled allowHalf value={review.calificacion / 2} />
                <p className="text-sm opacity-60">
                  {review.editado ? "(editado)" : ""}
                </p>
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
