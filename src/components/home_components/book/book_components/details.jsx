import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewRender from "../../details_components/review_render";
import { getBookById } from "../../../../services/book_services";
import { getReviewsByBookId } from "../../../../services/review_services";

function Details() {
  const { id } = useParams();
  const [dataBook, setDataBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [libro, resenas] = await Promise.all([
          getBookById(id),
          getReviewsByBookId(id),
        ]);
        setDataBook(libro);
        setReviews(resenas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

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
        <ReviewRender reviews={reviews} />
      </section>
    </>
  );
}

export default Details;
