import { Link, Outlet } from "react-router";

function Libro() {
  return (
    <div className="flex flex-col gap-2">
      <h2>Hola desde libros</h2>
      <Link
        to={"listaLibros"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Refrescar libros
      </Link>
      <Link
        to={"crearLibro"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Añadir Libro
      </Link>
      <Link
        to={"editarLibro"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Editar Libro
      </Link>
      <Outlet />
    </div>
  );
}

export default Libro;
