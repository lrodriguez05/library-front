import { useState, useEffect } from "react";
import { useParams } from "react-router";
import moment from "moment";

function Details() {
  const { id } = useParams();
  const [dataBook, setDataBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/libros/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setDataBook(data.libro);
        if (response.ok) {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/lib/resenas/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setReviews(data.resenas);
        if (response.ok) {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookDetails();
    fetchReviews();
  }, [id]);

  function ReviewRender() {
    return (
      <div>
        {reviews?.length === 0 ? (
          <p>No hay resenas para este libro aun</p>
        ) : (
          reviews.map((review) => (
            <div className="py-4 flex items-center gap-3" key={review.id}>
              <img className="w-12 h-12 rounded-full" src={review.avatar}></img>
              <div className="font-bold bg-gray-200 p-2 rounded">
                <div className="flex justify-between">
                  <p>Usuario: {review.username}</p>
                  <p>{review.editado ? "Editado" : ""}</p>
                </div>
                <p className="py-2">{review.comentario}</p>
                <div className="flex justify-between">
                  <p>Calificacion {review.calificacion}/10</p>
                  <p>
                    {moment(review.fecha).local().format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
        <img
          className="col-span-1 row-span-4 max-h-96 w-full"
          src={dataBook?.imagen}
          alt="Imagen del libro"
        />
        <p>Titulo del libro {dataBook?.titulo}</p>
        <p>Autor {dataBook?.autor}</p>
        <p>Cantidad {dataBook?.cantidad}</p>
        <p>Sede {dataBook?.sede}</p>

        <p>Edicion {dataBook?.edicion}</p>
        <p>Año de Publicacion {dataBook?.anio_publicacion}</p>
      </section>
      <p>Detalles {dataBook?.detalles}</p>
      <hr></hr>
      <section className="p-4">
        <ReviewRender />
      </section>
    </>
  );
}

export default Details;
