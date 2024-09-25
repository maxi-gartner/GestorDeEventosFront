import "./App.css";

function App() {
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Eventos Increíbles</div>
          <nav className="space-x-4">
            <a href="#" className="hover:text-yellow-500">
              Home
            </a>
            <a href="#" className="hover:text-yellow-500">
              Eventos
            </a>
            <a href="#" className="hover:text-yellow-500">
              Entradas
            </a>
            <a href="#" className="hover:text-yellow-500">
              Nosotros
            </a>
            <a href="#" className="hover:text-yellow-500">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/*     <!-- Hero Section --> */}
      <section
        className="bg-cover bg-center h-96"
        style="background-image: url('https://example.com/event-banner.jpg')"
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Descubrí Eventos Increíbles
            </h1>
            <a
              href="#"
              className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400"
            >
              Comprar Entradas
            </a>
          </div>
        </div>
      </section>

      {/*     <!-- Featured Events Section --> */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            Eventos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/*                 <!-- Event Card 1 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://example.com/event1.jpg"
                alt="Evento 1"
                className="w-full h-48 object-cover"
              ></img>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Concierto Rock en Vivo
                </h3>
                <p className="text-gray-600 mb-4">
                  Fecha: 25 de Noviembre | Lugar: Estadio Central
                </p>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                >
                  Comprar Entrada
                </a>
              </div>
            </div>

            {/*                 <!-- Event Card 2 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://example.com/event2.jpg"
                alt="Evento 2"
                className="w-full h-48 object-cover"
              ></img>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Festival de Comida Internacional
                </h3>
                <p className="text-gray-600 mb-4">
                  Fecha: 5 de Diciembre | Lugar: Plaza Principal
                </p>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                >
                  Comprar Entrada
                </a>
              </div>
            </div>

            {/*                 <!-- Event Card 3 --> */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://example.com/event3.jpg"
                alt="Evento 3"
                className="w-full h-48 object-cover"
              ></img>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Teatro al Aire Libre
                </h3>
                <p className="text-gray-600 mb-4">
                  Fecha: 12 de Diciembre | Lugar: Parque Central
                </p>
                <a
                  href="#"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                >
                  Comprar Entrada
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2024 Eventos Increíbles. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
