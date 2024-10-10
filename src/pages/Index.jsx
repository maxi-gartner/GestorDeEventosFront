import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placesQueries from "../services/placesQueries";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const averageRating = ratingCount > 0 ? rating / ratingCount : 0;

  return {
    placesAvailable: occupancy - attendees,
    rating: averageRating,
  };
};

export default function Index() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [places, setPlaces] = useState([]);
  const data = useSelector((state) => state.events.eventsData);

  useEffect(() => {
    if (JSON.stringify(data) !== "{}") {
      setEvents(data);
    }
  }, [data]);
  useEffect(() => {
    placesQueries.getAllPlaces().then(setPlaces);
  }, []);

  let now = new Date();
  let upcomingEvents = events.filter((event) => new Date(event.date) > now);
  let sortedPastEvents = upcomingEvents.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  let nearbyEvents = sortedPastEvents.slice(0, 2);

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
          <p>{dataBox(events).rating.toFixed(2)}</p>
        </div>
      </div>
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl mb-2 w-full text-center font-bold lg:text-3xl Sketchnote">
          The nearest{" "}
          <span className="text-xl font-extrabold text-yellow-500 lg:text-3xl">
            events
          </span>
        </h2>
        <div className="flex justify-evenly w-full max-w-7xl flex-wrap">
          {nearbyEvents.length > 0 ? (
            nearbyEvents.map((event, index) => (
              <Link
                to={`/event/${event.id}`}
                key={index}
                className="mb-4 flex flex-col gap-1 py-2 sm:w-2xl justify-center items-center"
              >
                <h2 className="text-lg font-semibold mb-2 w-full text-center">
                  {event.name}
                  <span className="text-lg font-semibold mb-2 w-full text-center">
                    {" "}
                    ({new Date(event.date).toLocaleDateString()})
                  </span>
                </h2>
                <img
                  src={event.photo}
                  alt={event.name}
                  className="w-[35rem] h-[200px] object-cover sm:h-60 shadow-lg shadow-black mb-2"
                  onError={(e) =>
                    (e.target.src =
                      "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                  }
                />
                <p>{event.description}</p>
                <p>
                  <strong>Minimum Age:</strong> {event.minimumAge}
                </p>
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
