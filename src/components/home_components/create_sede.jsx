import { useState } from "react";

function CreateSede() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lib/sedes/crearSede`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            nombre: name,
          }),
        }
      );
      if (response.ok) {
        setName("");
      }
    } catch (e) {
      console.error("Error al crear la sede:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-4 border p-6 rounded shadow-md bg-white"
        onSubmit={handleSubmit}
      >
        <label>Nombre de la Sede</label>
        <input
          required
          value={name}
          type="text"
          className="border p-3 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Sede"}
        </button>
      </form>
    </section>
  );
}

export default CreateSede;
