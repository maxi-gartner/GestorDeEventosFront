import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { savedUserLogin, logout } from "../redux/actions/userAction";
import authQueries from "../services/authQueries.js";
import { useSelector } from "react-redux";
import eventQueries from "../services/eventQueries.js";
import { savedEvents } from "../redux/actions/eventsAction";

const token = localStorage.getItem("token");

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const events = useSelector((state) => state.events.eventsData);

  //CAPTUDADOR AUTOMATICO DE USUARIOS
  if (token && JSON.stringify(user) === "{}") {
    authQueries
      .loginWithToken()
      .then((data) => {
        dispatch(savedUserLogin(data.response));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //CAPTUDADOR AUTOMATICO DE EVENTOS
  if (JSON.stringify(events) === "{}") {
    eventQueries
      .getAllEvents()
      .then((data) => {
        dispatch(savedEvents(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //actualizar usuario
  useEffect(() => {
    if (JSON.stringify(user) !== "{}") {
      setViewUser(true);
    }
  }, [user]);

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "EventS", href: "/events", current: false },
    { name: "About Us", href: "/about", current: false },
    { name: "Contact", href: "/contact", current: false },
  ];

  if (!token) {
    navigation.push({ name: "SignIn", href: "/signin", current: false });
  }
  //funciones
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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

  return (
    <nav className="bg-[#312e31] fixed w-screen h-[10vh] z-50 top-0">
      <div className="mx-auto h-full max-w-7xl px-2 sm:px-6 lg:px-2 ">
        <div className="relative flex h-full items-center justify-evenly ">
          <Link
            className="text-3xl font-bold w-full text-center lg:text-start lg:text-5xl Sketchnote"
            to="/"
          >
            Event
            <span className="text-4xl font-extrabold text-yellow-500 shadow-lg transform hover:scale-110 transition-transform duration-300">
              Hub
            </span>
          </Link>
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden lg:flex">
            <div className="flex space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-lg sm:text-lg font-medium max-h-[5vh] flex items-center whitespace-nowrap"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {viewUser ? (
                <div className="relative">
                  {/* desplegable usuario */}
                  <section className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md py-2 text-lg sm:text-lg font-medium max-h-[5vh] flex items-center">
                    <button
                      onClick={toggleDropdown}
                      className="w-auto px-4s py-2 flex items-center whitespace-nowrap"
                    >
                      {/* nombre de usuario */}
                      {user.leght !== 0 ? (
                        `${capitalizeWords(user.name)}  ${capitalizeWords(
                          user.lastname
                        )}`
                      ) : (
                        <></>
                      )}
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </section>
                  {isOpen && (
                    <div className="absolute right-0 rounded-md bg-[#312e31] text-gray-300 text-lg sm:text-lg font-medium">
                      <Link
                        to={`/userControlPanel`}
                        className="block px-9 py-2 hover:bg-gray-700 hover:text-white rounded-md  whitespace-nowrap"
                        role="menuitem"
                      >
                        User profile
                      </Link>
                      <Link
                        key="logout"
                        to="/"
                        className="block px-9 py-2 hover:bg-gray-700 hover:text-white rounded-md"
                        onClick={() => {
                          localStorage.clear();
                          dispatch(logout());
                          navigate("/");
                        }}
                      >
                        LogOut
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} navigation={navigation} />
    </nav>
  );
}
