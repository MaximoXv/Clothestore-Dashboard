import { clx } from "../utils/clx";
import logo from "../assets/images/logo.png";
import texto from "../assets/images/texto.png";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
const ListItem = ({
  label,
  icon,
  liClassName = "",
  iconClassName = "",
  labelClassName = "",
  to,
}: {
  label: string;
  icon: string;
  liClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  to: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [navActive] = useState(isActive);

  return (
    <a
      href={to}
      className={clx(
        "flex items-center gap-3 rounded-md p-2",
        navActive
          ? "bg-gray-200 text-violet-400 font-bold text-md"
          : "text-gray-500 text-sm",
        liClassName
      )}
    >
      <i className={clx("fa-solid", icon, iconClassName)}></i>
      <span className={clx(labelClassName)}>{label}</span>
    </a>
  );
};

interface NavbarProps {
  navbarState: boolean;
  changeStateNavbar: () => void;
}

const Navbar = ({ navbarState, changeStateNavbar }: NavbarProps) => {
  return (
    <header
      className={clx(
        "w-1/5 min-h-screen bg-white p-4 max-lg:absolute max-lg:w-52 z-10 shadow-2xl transition-all duration-400 max-sm:w-full",
        navbarState ? "left-[0%]" : "left-[-100%]"
      )}
    >
      <aside className=" w-full flex">
        <ul className="w-full flex flex-col gap-1">
          <div
            className=" w-10 h-10 hover:bg-gray-300 hidden max-sm:flex items-center justify-center rounded-lg shadow-3xl transition-all cursor-pointer self-end"
            onClick={changeStateNavbar}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
          <Link to={"/"} className="flex p-4 gap-4 items-center w-full">
            <img className="max-w-1/5" src={logo} alt="clothestore-logo" />
            <img
              className="max-w-4/5 max-h-4/5"
              src={texto}
              alt="clothestore-texto"
            />
          </Link>
          <ListItem label="Dashboard" icon="fa-house" to="/" />
          <ListItem label="Clientes" icon="fa-users" to="/clientes" />
          <ListItem label="Productos" icon="fa-cart-shopping" to="/productos" />
          <ListItem label="Configuración" icon="fa-gear" to="/configuracion" />
        </ul>
      </aside>
    </header>
  );
};

export default Navbar;
