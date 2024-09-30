import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventQueries from "../services/eventQueries";
import placesQueries from "../services/placesQueries";

const dataBox = (events) => {
  let attendees = 0;
  let occupancy = 0;
  let rating = 0;
  let ratingCount = 0;

  events.forEach((event) => {
    attendees += event.attendees.length;
    occupancy += event.place.ocupancy;

    if (event.rating.totalRatings > 0) {
      rating += event.rating.totalRatings;
      ratingCount++;
    }
  });

  console.log("rating", rating);
  const averageRating = rating / ratingCount;

  return {
    placesAvailable: occupancy - attendees,
    rating: averageRating,
  };
};

export default function Index() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    eventQueries.getAllEvents().then(setEvents);
    placesQueries.getAllPlaces().then(setPlaces);
  }, []);
  /*   console.log("events", events);
  console.log("places", places);
  console.log("dataBox1", dataBox(events)); */

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-screen justify-center">
        <div className="flex w-full justify-center h-full relative max-w-7xl">
          <img
            src="/Images/home.jpeg"
            alt="Descripción de la imagen"
            className="object-cover w-full max-w-7xl h-full max-h-96"
          />
          <button
            className="absolute bottom-2 sm:bottom-8 left-4 xl:left-32 flex sm:inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2"
            onClick={() => navigate("/events")}
          >
            See Available Events
          </button>
        </div>

        {/* Contenido a la derecha */}
      </div>

      <div className="flex w-full max-w-7xl justify-between my-5 min-h-32 flex-wrap font-medium">
        <div className="p-4 rounded-lg text-center w-[24%] flex justify-center items-center bg-black shadow-lg shadow-black flex-col">
          <h4>Places available</h4>
          <p>{dataBox(events).placesAvailable}</p>
        </div>
        <div className="p-4 rounded-lg text-center w-[24%] flex justify-center items-center bg-black shadow-lg shadow-black flex-col">
          <p>Events available</p>
          <p>{events.length}</p>
        </div>
        <div className="p-4 rounded-lg text-center w-[24%] flex justify-center items-center bg-black shadow-lg shadow-black flex-col">
          <h4>Locations with events</h4>
          <p>{places.length}</p>
        </div>
        <div className="p-4 rounded-lg text-center w-[24%] flex justify-center items-center bg-black shadow-lg shadow-black flex-col">
          <h4>Average Rating</h4>
          <p>{dataBox(events).rating}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <h2 className="text-lg font-semibold mb-2">Upcoming events:</h2>
        <ul className="list-disc list-inside">
          {events.map((event) => (
            <li key={event.name}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
