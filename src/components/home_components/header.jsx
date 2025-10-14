import { Book, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Dropdown } from "antd";
import { useNavigate } from "react-router";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      disabled: true,
      label: (
        <p>
          Logeado actualmente como el usuario {localStorage.getItem("name")}{" "}
          {localStorage.getItem("lastName")}
        </p>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Mi Cuenta 2
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Mi Cuenta 3
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: "Log Out",
      icon: <LogOut size={16} />,
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <header className="col-span-full sticky top-0 z-50 bg-blue-100 shadow">
      <nav className="flex px-5 py-3 justify-between">
        <a className="flex items-center gap-3 text-2xl font-bold">
          <Book size={20} />
          BiblioGest
        </a>
        <ul className="flex gap-4 items-center">
          <li>Libros</li>
          <li>Sedes</li>

          <li>
            <Dropdown menu={{ items }}>
              <div className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition">
                <a onClick={(e) => e.preventDefault()}>
                  <UserRound size={26} />
                </a>
              </div>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
