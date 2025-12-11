import { useState } from "react";
import { changePassword } from "../../services/user_services";

function AccountSettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        alert("Las nuevas contraseñas no coinciden");
        return;
      }
      const userId = localStorage.getItem("userId");
      changePassword(userId, password, newPassword);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <div>
      <h1>AccountSettings</h1>
      <div className="w-full bg-white rounded-lg shadow max-w-md">
        Cambiar contrasena
        <form className="space-y-4 mt-6" onSubmit={handleChangePassword}>
          <label className="text-lg mb-2">Contrasena actual</label>
          <input
            className="border p-3 rounded-lg"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label className="text-lg mb-2">Nueva contrasena</label>
          <input
            className="border p-3 rounded-lg"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <label className="text-lg mb-2">Confirmar nueva contrasena</label>
          <input
            className="border p-3 rounded-lg"
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <br />
          <button
            className="bg-blue-500 w-full p-3 rounded-lg text-white mt-2 hover:bg-blue-600"
            type="submit"
          >
            Actualizar contrasena
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;
