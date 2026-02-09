import { Table } from "antd";
import { createContext } from "react";
import { useAuth } from "../../auth_components/AuthContext";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { useFetchLibros } from "../../../hooks/useLibros";
import { columnsGenerator } from "../book_micro/columns";

export const BookContext = createContext();

function BookList() {
  const { role } = useAuth();

  const columns = columnsGenerator(role);

  const { books, loading, fetchBooks } = useFetchLibros();

  return (
    <BookContext.Provider value={{ fetchLibros: fetchBooks, data: books }}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Listado de Libros</h2>
          <Link
            to={"crearLibro"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Añadir Libro
          </Link>
        </div>
        <section>
          <Table dataSource={books} columns={columns} loading={loading}></Table>
        </section>
      </div>
      <Outlet />
    </BookContext.Provider>
  );
}

export default BookList;
