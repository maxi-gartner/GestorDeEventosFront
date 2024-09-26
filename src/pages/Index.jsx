const upcomingEvents = [
  { name: "Evento 1", date: "2024-09-30" },
  { name: "Evento 2", date: "2024-10-05" },
  { name: "Evento 3", date: "2024-10-10" },
];
export default function Index() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row w-full">
        {/* Imagen que ocupa la mitad en móvil */}
        <div className="flex-1 h-full relative">
          <img
            src="https://via.placeholder.com/300" // Cambia esta URL por la imagen que desees
            alt="Descripción de la imagen"
            className="object-cover w-full h-full"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute bottom-8 left-4">
            See Available Events
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
    </div>
  );
}
