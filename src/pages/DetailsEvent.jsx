import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventQueries from "../services/eventQueries";
import Swal from "sweetalert2";

export default function DetailsEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventQueries.getEvent(id).then(setEvent);
  }, [id]);

  async function registerToEvent(id) {
    try {
      const response = await eventQueries.registerToEvent(id);
      console.log("response", response);
      if (response.data.success === true) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "Confirm",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "Confirm",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "Error registering for event",
        icon: "error",
        confirmButtonText: "Confirm",
      });
    }
  }

  if (!event) {
    return <p>Cargando evento...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-center">{event.name}</h1>
        <button
          onClick={() => registerToEvent(event.id)}
          className="text-black bg-yellow-500 hover:bg-yellow-700 hover:text-white font-bold py-2 px-4 rounded-3xl mt-4 relative group transform transition-transform duration-200"
        >
          <span className="flex items-center justify-between w-full">
            <span>Register for the event</span>
            <i className="fas fa-hand-pointer fa-lg transform group-hover:scale-125 text-white ml-4 -rotate-45"></i>
          </span>
        </button>
      </div>

      {/* Event Photo */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <img
          src={event.photo}
          alt={event.name}
          className="w-full sm:w-1/2 max-h-96 object-cover rounded-lg"
        />
        <div className="sm:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
          <p className="mb-2">
            <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}{" "}
            {new Date(event.date).toLocaleTimeString()}
          </p>
          <p className="mb-2">
            <strong>Minimum Age:</strong> {event.minimumAge} years
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {event.description}
          </p>
        </div>
      </div>

      {/* Place Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Event Location</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={event.place.photo}
            alt={event.place.name}
            className="w-full sm:w-1/2 max-h-96 object-cover rounded-lg"
          />
          <div className="sm:w-1/2">
            <p className="mb-2">
              <strong>Name:</strong> {event.place.name}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {event.place.address}
            </p>
            <p className="mb-2">
              <strong>Capacity:</strong> {event.place.ocupancy} people
            </p>
          </div>
        </div>
      </div>

      {/* Event Metadata */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional information</h2>
        <p>
          <strong>Organizer:</strong> {event.organizer.name}
        </p>
        <p>
          <strong>Qualification:</strong>{" "}
          {event.rating.totalRatings > 0
            ? `${event.rating.totalRatings} estrellas`
            : "Sin calificaciones"}
        </p>
        <p>
          <strong>Comments:</strong>{" "}
          {event.comments.length > 0
            ? `${event.comments.length} comentarios`
            : "Sin comentarios"}
        </p>
      </div>
    </div>
  );
}
