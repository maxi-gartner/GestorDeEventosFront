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
      <div className="flex flex-col sm:flex-row w-full justify-center">
        <div className="flex w-full justify-center h-full relative max-w-7xl">
          <img
            src="/Images/home.jpeg"
            alt="Descripción de la imagen"
            className="object-cover w-full max-w-7xl h-full max-h-96"
          />
          <button className="absolute bottom-2 sm:bottom-8 left-4 xl:left-32 flex sm:inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2">
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
