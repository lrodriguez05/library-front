import { Routes, Route } from "react-router";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";

import User from "./components/test/user";
import Reports from "./components/test/reports";
import Dashboard from "./components/test/dashboard";
import Libros from "./components/home_components/libro";
import Sedes from "./components/home_components/sede";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="reports" element={<Reports />} />
        <Route path="libros" element={<Libros />} />
        <Route path="sedes" element={<Sedes />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>Pagina no encontrada</div>} />
    </Routes>
  );
}

export default App;
