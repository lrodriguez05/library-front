import { NavLink } from "react-router";

function MenuLink({ to, Icon, label }) {
  const linkClasses =
    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700";
  const activeClasses = "bg-blue-200 text-blue-900 font-semibold";

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `${linkClasses} ${isActive ? activeClasses : ""}`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export default MenuLink;
