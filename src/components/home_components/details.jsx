import { useState, useEffect } from "react";
import { useParams } from "react-router";

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
        {reviews.map((review) => (
          <div className="p-4" key={review.id}>
            <div className="font-bold bg-gray-200 p-2 rounded">
              <p>Usuario: {review.username}</p>
              <p>{review.comentario}</p>
              <p>Calificacion {review.calificacion}/10</p>
            </div>
          </div>
        ))}
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
        <p>Sede {dataBook?.id_sede}</p>

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
