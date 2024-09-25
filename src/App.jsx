import { useState } from "react";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "SignUp", href: "#", current: false },
  { name: "SignIn", href: "#", current: false },
  { name: "EventS", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const upcomingEvents = [
  { name: "Evento 1", date: "2024-09-30" },
  { name: "Evento 2", date: "2024-10-05" },
  { name: "Evento 3", date: "2024-10-10" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 fixed w-screen h-[10vh] z-50 top-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className={`hidden sm:ml-6 sm:block`}>
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menú desplegable en móvil */}
        <div className={`${open ? "block" : "hidden"} sm:hidden bg-white`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-black",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex flex-col min-h-[90vh] mt-[10vh]">
        <div className="flex flex-col sm:flex-row w-full">
          {/* Imagen que ocupa la mitad en móvil */}
          <div className="flex-1 h-full relative">
            <img
              src="https://via.placeholder.com/300" // Cambia esta URL por la imagen que desees
              alt="Descripción de la imagen"
              className="object-cover w-full h-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute bottom-8 left-4">
              Ver Eventos Disponibles
            </button>
          </div>

          {/* Contenido a la derecha */}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <h2 className="text-lg font-semibold mb-2">Próximos Eventos:</h2>
          <ul className="list-disc list-inside">
            {upcomingEvents.map((event) => (
              <li key={event.name}>
                {event.name} - {event.date}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-semibold">Información</h5>
              <ul className="list-none mt-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Términos de Servicio
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-semibold">Contacto</h5>
              <p className="text-gray-400 mt-2">Email: info@example.com</p>
              <p className="text-gray-400">Teléfono: +54 9 11 1234-5678</p>
            </div>

            <div>
              <h5 className="text-lg font-semibold">Síguenos</h5>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.389-1.83.654-2.825.775 1.014-.609 1.794-1.574 2.163-2.724-.951.56-2.005.973-3.127 1.195-.895-.955-2.166-1.55-3.584-1.55-2.713 0-4.915 2.207-4.915 4.917 0 .386.043.761.127 1.124-4.083-.205-7.7-2.159-10.14-5.134-.423.727-.666 1.571-.666 2.477 0 1.71.87 3.215 2.188 4.091-.806-.025-1.564-.247-2.228-.616v.062c0 2.389 1.693 4.384 3.94 4.834-.412.111-.846.171-1.292.171-.316 0-.623-.031-.923-.088.624 1.953 2.433 3.375 4.577 3.415-1.676 1.313-3.785 2.095-6.069 2.095-.394 0-.785-.023-1.169-.067 2.17 1.392 4.768 2.206 7.548 2.206 9.056 0 14.007-7.494 14.007-13.973 0-.213-.004-.426-.012-.637.961-.695 1.796-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.673 0h-21.346c-.732 0-1.327.595-1.327 1.327v21.346c0 .732.595 1.327 1.327 1.327h21.346c.732 0 1.327-.595 1.327-1.327v-21.346c0-.732-.595-1.327-1.327-1.327zm-6.007 21.421h-3.804v-9.468c0-2.255-.045-5.153-3.143-5.153-3.148 0-3.624 2.457-3.624 5v9.622h-3.804v-19.001h3.645v2.590h.052c.506-.959 1.748-1.971 3.599-1.971 3.845 0 4.558 2.530 4.558 5.823v12.016zm-11.133-20.571a2.172 2.172 0 1 1 0-4.343 2.172 2.172 0 0 1 0 4.343z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.004c-5.524 0-10 4.476-10 10s4.476 10 10 10 10-4.476 10-10-4.476-10-10-10zm0 18c-4.419 0-8-3.581-8-8s3.581-8 8-8 8 3.581 8 8-3.581 8-8 8zm-2-12h4v4h-4v-4zm0 6h4v4h-4v-4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
