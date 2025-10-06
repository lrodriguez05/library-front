import { LayoutDashboard, Users, BarChart3, Book, School } from "lucide-react";
import MenuLink from "../home_components/menu_link";

const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Usuarios", path: "/user", icon: Users },
  { label: "Reportes", path: "/reports", icon: BarChart3 },
  { label: "Libros", path: "/libros", icon: Book },
  { label: "Sedes", path: "/sedes", icon: School },
];

function Aside() {
  return (
    <aside className="hidden md:block overflow-y-auto border-r border-slate-300 p-5">
      <div className="sticky top-0 p-3 rounded-md">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <MenuLink to={item.path} Icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
