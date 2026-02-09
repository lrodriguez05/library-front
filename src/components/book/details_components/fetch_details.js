const fetchBookDetails = async (id) => {
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
    if (!response.ok)
      throw new Error("Error al obtener los detalles del libro");
    const data = await response.json();
    return data.libro;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const fetchReviews = async (id) => {
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
    if (!response.ok) throw new Error("Error al obtener reseñas");
    const data = await response.json();
    return data.resenas;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchBookDetails, fetchReviews };
