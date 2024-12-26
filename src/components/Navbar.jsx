import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const menuItems = [
    { name: "Top Up", path: "/topup" },
    { name: "Transactions", path: "/Transaction" },
    { name: "Akun", path: "/akun" },
  ];
  return (
    <nav className="flex bg-white text-black shadow-md w-full justify-between items-center px-8 sm:px-16 py-4 ">
      <NavLink to="/" className="w-1/2 flex items-center gap-2">
        <img src={logo} className="w-8 h-8" alt="Logo" />
        <h1 className="font-bold">SIMS PPOB</h1>
      </NavLink>

      <div className="w-1/2 flex gap-5 items-center justify-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "font-bold " : "text-gray-700 "
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
