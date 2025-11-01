import { Routes, Route, Outlet } from "react-router";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

import User from "./components/test/user";
import Reports from "./components/test/reports";
import Dashboard from "./components/test/dashboard";
import CrearLibro from "./components/home_components/create_book";
import CrearSede from "./components/home_components/create_sede";
import Sedes from "./components/home_components/sede";
import ListaLibros from "./components/home_components/book_list";
import EditBook from "./components/home_components/edit_book";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="reports" element={<Reports />} />

        <Route path="libros" element={<Outlet />}>
          <Route path="" element={<ListaLibros />}>
            <Route path="editarLibro/:id" element={<EditBook />} />
            <Route index path="crearLibro" element={<CrearLibro />} />
          </Route>
        </Route>

        <Route path="sedes" element={<Sedes />} />

        <Route path="crearSede" element={<CrearSede />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>Pagina no encontrada</div>} />
    </Routes>
  );
}

export default App;
