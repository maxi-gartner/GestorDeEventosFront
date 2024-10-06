//import { useState } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authQueries from "../services/authQueries";
import placesQueries from "../services/placesQueries";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const userEmail = useSelector((state) => state.user.userData.email) || "";
  const events = useSelector((state) => state.events.eventsData);

  const [users, setUsers] = useState({});
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (userEmail) {
      placesQueries.getAllPlaces().then((data) => {
        setPlaces(data);
      });
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      authQueries.getAllUsers().then((data) => {
        setUsers(data.response);
      });
    }
  }, [userEmail]);

  const handleEdit = (eventId) => {
    // Lógica para editar el evento
    console.log(`Edit event with ID: ${eventId}`);
    // Podrías abrir un modal o redirigir a una página de edición
  };

  const handleDelete = (eventId) => {
    // Lógica para eliminar el evento
    console.log(`Delete event with ID: ${eventId}`);
    // Aquí puedes hacer la llamada a la API para eliminar el evento
  };
  const capitalizeWords = (str) => {
    if (!str) return ""; // Manejo de cadena vacía o undefined
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="container mx-auto p-6">
      {/* Sección de perfil */}
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Users management</h2>
        <button
          className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
          onClick={() => handleDelete(event._id)}
        >
          Register a new user
        </button>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user.data.email}
                className="flex justify-between items-center mb-4 p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  {user.data.photo && (
                    <img
                      src={user.data.photo}
                      alt={user.data.name}
                      className="w-16 h-16 rounded-md mr-4 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold">{`${capitalizeWords(
                      user.data.name
                    )}  ${capitalizeWords(user.data.lastname)}`}</p>
                    <p className="text-gray-400">Role: {user.data.role}</p>
                    <p className="text-gray-400">Role: {user.data.email}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
                    onClick={() => handleEdit(user.email)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You are not enrolled in any events.</p>
        )}
      </div>

      {/* Sección de eventos */}
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Event management</h2>
        <Link
          className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
          to="/registerEvent"
        >
          Register a new event
        </Link>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center mb-4 p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  {event.photo && (
                    <img
                      src={event.photo}
                      alt={event.name}
                      className="w-16 h-16 rounded-md mr-4 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold">{event.name}</p>
                    <p className="text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
                    onClick={() => handleEdit(event._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You are not enrolled in any events.</p>
        )}
      </div>

      {/* Sección de eventos */}
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Places management</h2>
        <button
          className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
          onClick={() => handleDelete(event._id)}
        >
          Register a new places
        </button>
        {places.length > 0 ? (
          <ul>
            {places.map((place) => (
              <li
                key={place.data.id}
                className="flex justify-between items-center mb-4 p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  {place.photo && (
                    <img
                      src={place.data.photo}
                      alt={place.data.name}
                      className="w-16 h-16 rounded-md mr-4 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold">{place.data.name}</p>
                    <p className="text-gray-400">
                      Created:{" "}
                      {new Date(place.data.createdAt).toLocaleDateString()}{" "}
                      <span className="text-gray-200">|</span> Last modified:{" "}
                      {new Date(place.data.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
                    onClick={() => handleEdit(place.data.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(place.data.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You are not enrolled in any events.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
