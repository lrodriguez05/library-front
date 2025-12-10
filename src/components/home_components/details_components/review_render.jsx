import moment from "moment";

function ReviewRender({ reviews }) {
  return (
    <div>
      {reviews?.length === 0 ? (
        <p>No hay resenas para este libro aun</p>
      ) : (
        reviews.map((review) => (
          <div className="py-4 flex items-center gap-3" key={review.id}>
            <img className="w-12 h-12 rounded-full" src={review.avatar}></img>
            <div className="font-bold bg-gray-200 p-2 rounded max-w-6/12">
              <div className="flex justify-between">
                <p>Usuario: {review.username}</p>
                <p>{review.editado ? "Editado" : ""}</p>
              </div>
              <p className="py-2">{review.comentario}</p>
              <div className="flex justify-between gap-5">
                <p>Calificacion {review.calificacion}/10</p>
                <p>{moment(review.fecha).local().format("DD/MM/YYYY HH:mm")}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewRender;
