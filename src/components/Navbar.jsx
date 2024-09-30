import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "SignIn", href: "/signin", current: false },
  { name: "EventS", href: "/events", current: false },
  { name: "AboutUs", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "LogOut", href: "/", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#312e31] fixed w-screen h-[10vh] z-50 top-0">
      <div className="mx-auto h-full max-w-7xl px-2 sm:px-6 lg:px-2 ">
        <div className="relative flex h-full items-center justify-evenly ">
          <h2 className="text-3xl font-bold w-full text-center sm:text-start sm:text-5xl Sketchnote">
            Event
            <span className="text-4xl font-extrabold text-yellow-500 shadow-lg transform hover:scale-110 transition-transform duration-300">
              Hub
            </span>
          </h2>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
          <div className="hidden sm:flex">
            <div className="flex space-x-2">
              {navigation.map((item) =>
                item.name === "LogOut" ? (
                  <Link
                    key={item.name}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-lg sm:text-lg font-medium max-h-[5vh] flex items-center"
                    )}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-lg sm:text-lg font-medium max-h-[5vh] flex items-center"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} navigation={navigation} />
    </nav>
  );
}
