import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const capitalizeWords = (str) => {
  if (!str) return ""; // Manejo de cadena vacía o undefined
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function Sidebar({ open, setOpen, navigation, user }) {
  const token = localStorage.getItem("token") || "";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationSidebar = [
    ...navigation,
    token && {
      name: "User Panel",
      href: "/userControlPanel",
      current: location.pathname === "/userControlPanel",
    },
    user.role === "admin" && {
      name: "Admin Panel",
      href: "/adminPanel",
      current: location.pathname === "/adminPanel",
    },
    user.role === "organizer" && {
      name: "Organizer Panel",
      href: "/organizerPanel", // Corrige el enlace para el panel del organizador
      current: location.pathname === "/organizerPanel",
    },
  ].filter(Boolean); // Filtra valores falsy (null, undefined, false)

  return (
    <div
      className={`${open ? "block" : "hidden"} lg:hidden h-screen`}
      onClick={() => setOpen(!open)}
    >
      <div className="space-y-1 px-2 pb-3 pt-2 bg-[#312e31] sm:max-w-sm sm:rounded-none sm:rounded-br-lg sm:rounded-bl">
        {/* Sección de Usuario */}
        {user && (
          <div className="text-white mb-2">
            {user.name && (
              <h4 className="block rounded-md px-3 py-2 text-base font-medium border-b border-gray-700">
                {capitalizeWords(user.role)}
                {": "} {capitalizeWords(user.name)}{" "}
                {capitalizeWords(user.lastname)}
              </h4>
            )}
          </div>
        )}

        {/* Navegación */}
        {navigationSidebar.map((item) => (
          <Link
            key={item.name} // Esto está bien, asegúrate de que "item.name" sea único
            to={item.href}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
              item.current
                ? "font-extrabold text-yellow-500 shadow-md shadow-black/30 hover:bg-[#1c1d21]"
                : "text-white hover:bg-[#1c1d21] hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            {item.name}
          </Link>
        ))}

        <ul className="space-y-1">
          {!user.name && (
            <li>
              <Link
                key="signIn" // Cambié "singIn" a "signIn"
                to="/signin"
                className="block rounded-md px-3 py-2 text-base font-bold w-full text-center bg-blue-400 text-black"
              >
                Sign In
              </Link>
            </li>
          )}
          <li>
            <Link
              key="logout" // Esto está bien
              to="/"
              className="block rounded-md mt-7 px-3 py-2 text-base font-bold w-full text-center bg-red-400 text-black"
              onClick={() => {
                localStorage.clear();
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
