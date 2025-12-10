import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewRender from "./review_render";
import DetailsRender from "./details_render";
import { getBookById } from "../../../services/book_services";
import { getReviewsByBookId } from "../../../services/review_services";

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
      <section className="p-6 bg-white shadow-md rounded-lg">
        <DetailsRender dataBook={dataBook} />
      </section>

      <hr></hr>
      <section className="p-4">
        <ReviewRender reviews={reviews} />
      </section>
    </>
  );
}

export default Details;
