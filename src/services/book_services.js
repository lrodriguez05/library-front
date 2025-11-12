const getAllBooks = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lib/libros`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los libros");
    }

    const data = await response.json();

    return data.libros;
  } catch (error) {
    console.error("Error cargando libros:", error);
    throw error;
  }
};

const getBookById = async (id) => {
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

const deleteBookById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/lib/libros/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el libro");
    }
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
  }
};

export { getBookById, getAllBooks, deleteBookById };
