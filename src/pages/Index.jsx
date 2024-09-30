import { useEffect, useState } from "react";

export default function Index() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/event")
      .then((res) => res.json())
      .then((data) => setEvents(data.response))
      .catch((err) => console.log(err));
  }, []);
  console.log("events", events);

  return (
    <div>
      <div className="flex flex-col sm:flex-row w-full">
        {/* Imagen que ocupa la mitad en móvil */}
        <div className="flex-1 h-full relative">
          <img
            src="/Images/home.jpeg" // Cambia esta URL por la imagen que desees
            alt="Descripción de la imagen"
            className="object-cover w-full h-full"
          />
          <button className="bg-[#312e31] text-white px-4 py-2 rounded-md absolute bottom-8 left-4 shadow-sm shadow-black/60 hover:bg-slate-700">
            See Available Events
          </button>
        </div>

        {/* Contenido a la derecha */}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <h2 className="text-lg font-semibold mb-2">Upcoming events:</h2>
        <ul className="list-disc list-inside">
          {events.map((event) => (
            <li key={event.data.name}>
              {event.data.name} -{" "}
              {new Date(event.data.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
