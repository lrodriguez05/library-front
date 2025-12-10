import {
  LayoutDashboard,
  Users,
  BarChart3,
  Book,
  School,
  Menu,
} from "lucide-react";
import MenuLink from "../home_components/menu_link";
import { Drawer } from "antd";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Usuarios", path: "/user", icon: Users },
  { label: "Prestamos", path: "/prestamos", icon: BarChart3 },
  { label: "Libros", path: "/libros", icon: Book },
  { label: "Sedes", path: "/sedes", icon: School },
];

function Aside() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed top-1/2 left-0 p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Menu size={20} />
      </button>

      <aside
        className={`hidden md:block overflow-y-auto border-r border-slate-300 p-5`}
      >
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

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <MenuLink
                to={item.path}
                Icon={item.icon}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}

export default Aside;
