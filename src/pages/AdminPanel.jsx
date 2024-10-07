//import { useState } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authQueries from "../services/authQueries";
import placesQueries from "../services/placesQueries";
import RegisterEvent from "./RegisterEvent";
import RegisterPlace from "./RegisterPlace";
import SingUp from "./SignUp";

const AdminPanel = () => {
  const userEmail = useSelector((state) => state.user.userData.email) || "";
  const role = useSelector((state) => state.user.userData.role) || "";
  const events = useSelector((state) => state.events.eventsData);

  const [users, setUsers] = useState({});
  const [places, setPlaces] = useState([]);
  const [conteinerModals, setConteinerModals] = useState(false);
  const [modalRegisterUser, setModalRegisterUser] = useState(false);
  const [modalRegisterPlace, setModalRegisterPlace] = useState(false);
  const [modalRegisterEvent, setModalRegisterEvent] = useState(false);

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

  const capitalizeWords = (str) => {
    if (!str) return ""; // Manejo de cadena vacía o undefined
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="container mx-auto p-6 relative">
      {/* modales */}
      {conteinerModals ? (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          {modalRegisterEvent ? (
            <div>
              <RegisterEvent
                setModalRegisterEvent={setModalRegisterEvent}
                setConteinerModals={setConteinerModals}
              />
            </div>
          ) : null}

          {modalRegisterPlace ? (
            <div>
              <RegisterPlace
                setModalRegisterPlace={setModalRegisterPlace}
                setConteinerModals={setConteinerModals}
              />
            </div>
          ) : null}

          {modalRegisterUser ? (
            <div>
              <SingUp
                setModalRegisterUser={setModalRegisterUser}
                setConteinerModals={setConteinerModals}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <></>
      )}
      {/* fin modales */}
      {/* Sección de perfil */}
      {role === "admin" && (
        <div className="shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Users management</h2>
          <button
            className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={() => {
              setModalRegisterUser(!modalRegisterUser),
                setConteinerModals(!conteinerModals);
            }}
          >
            Register a new user
          </button>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li
                  key={user.data.email}
                  className="flex justify-between items-center mb-4 p-4 border-b border-gray-200 flex-col sm:flex-row gap-3"
                >
                  <div className="flex items-center">
                    {user.data.photo && (
                      <img
                        src={user.data.photo}
                        alt={user.data.name}
                        className="w-16 h-16 rounded-md mr-4 object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                        }
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
                  <div className="flex justify-between gap-6">
                    <button
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleEdit(user.email)} */
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleDelete(user.email)} */
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
      )}

      {/* Sección de eventos */}
      {role === "organizer" && (
        <div className="shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Event management</h2>
          <button
            className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={() => {
              setConteinerModals(!conteinerModals);
              setModalRegisterEvent(!modalRegisterEvent);
            }}
          >
            Register a new event
          </button>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center mb-4 p-4 border-b border-gray-200 flex-col sm:flex-row gap-3"
                >
                  <div className="flex items-center">
                    {event.photo && (
                      <img
                        src={event.photo}
                        alt={event.name}
                        className="w-16 h-16 rounded-md mr-4 object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                        }
                      />
                    )}
                    <div>
                      <p className="text-lg font-semibold">{event.name}</p>
                      <p className="text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between gap-6">
                    <button
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleEdit(user.email)} */
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleDelete(user.email)} */
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
      )}

      {/* Sección de places */}
      {role === "admin" && (
        <div className="shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Places management</h2>
          <button
            className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={() => {
              setConteinerModals(!conteinerModals);
              setModalRegisterPlace(!modalRegisterPlace);
            }}
          >
            Register a new places
          </button>
          {places.length > 0 ? (
            <ul>
              {places.map((place) => (
                <li
                  key={place.data.id}
                  className="flex justify-between items-center mb-4 p-4 border-b border-gray-200 flex-col sm:flex-row gap-3"
                >
                  <div className="flex items-center">
                    {place.data.photo && (
                      <img
                        src={place.data.photo}
                        alt={place.data.name}
                        className="w-16 h-16 rounded-md mr-4 object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg")
                        }
                      />
                    )}
                    <div>
                      <p className="text-lg font-semibold">
                        {place.data.name}
                        {", "}
                        {place.data.address}
                      </p>
                      <p className="text-gray-400">
                        Created:{" "}
                        {new Date(place.data.createdAt).toLocaleDateString()}{" "}
                        <span className="text-gray-200">|</span> Last modified:{" "}
                        {new Date(place.data.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between gap-6">
                    <button
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleEdit(user.email)} */
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out w-24"
                      /* onClick={() => handleDelete(user.email)} */
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
      )}
    </div>
  );
};

export default AdminPanel;
