export const getReviewsByBookId = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/resenas/libro/${id}`,
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

export const getReviewById = async (id) => {
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
    if (!response.ok) throw new Error("Error al obtener la reseña");
    const data = await response.json();
    return data.resena;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editReviewById = async (id, rating, comment) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/resenas/editar/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          calificacion: rating,
          comentario: comment,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Error al editar la reseña");
    }
  } catch (error) {
    console.error("Error al editar la reseña:", error);
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

export const deleteReviewById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/resenas/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar la reseña");
    }
  } catch (error) {
    console.error("Error al eliminar la reseña:", error);
  }
};
