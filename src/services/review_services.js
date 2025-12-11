export const getReviewsByBookId = async (id) => {
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

export const getReviewsByUser = async (userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/resenas/usuario/${userId}`,
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
