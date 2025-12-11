export const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/changePassword/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Error al cambiar la contraseña");
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
  }
};
