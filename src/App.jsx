import { Routes, Route, Outlet } from "react-router";
import Home from "./components/home_components/home";
import Login from "./components/auth_components/login";
import Register from "./components/auth_components/register";

import User from "./components/user_components/user";
import Dashboard from "./components/home_components/dashboard";
import CrearLibro from "./components/book/book_components/create_book";
import CrearSede from "./components/home_components/create_sede";
import Sedes from "./components/sede/sede";
import ListaLibros from "./components/book/book_components/book_list";
import EditBook from "./components/book/book_components/edit_book";
import Prestamos from "./components/loan/loan";
import Details from "./components/book/details_components/details";
import AccountSettings from "./components/user_components/account_settings";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="prestamos" element={<Prestamos />} />

        <Route path="libros" element={<Outlet />}>
          <Route path="detalles/:id" element={<Details />} />
          <Route path="" element={<ListaLibros />}>
            <Route path="editarLibro/:id" element={<EditBook />} />
            <Route index path="crearLibro" element={<CrearLibro />} />
          </Route>
        </Route>
        <Route path="account" element={<Outlet />}>
          <Route path="settings" element={<AccountSettings />} />
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
