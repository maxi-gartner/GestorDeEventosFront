//import { useState } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import authQueries from "../services/authQueries";
import eventQueries from "../services/eventQueries";

const UserControlPanel = () => {
  const userEmail = useSelector((state) => state.user.userData.email) || "";

  const [user, setUser] = useState({});

  useEffect(() => {
    if (userEmail) {
      authQueries.getUserByEmail(userEmail).then((data) => {
        setUser(data.response);
      });
    }
  }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías los cambios al servidor
    Swal.fire({
      title: "User updated",
      text: "The changes have been saved successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      data: {
        ...prevUser.data,
        [name]: value,
      },
    }));
  };

  function handleUnsubscribe(eventId) {
    eventQueries
      .unsubscribe(eventId)
      .then((data) => {
        console.log("data", data.data.response.data);
        if (data.data.success === false) {
          Swal.fire({
            title: "Error",
            text: data.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        Swal.fire({
          title: "Success",
          text: "You have been unsubscribed from this event.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setUser(data.data.response);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  return (
    <div className="container mx-auto p-6">
      {/* Sección de perfil */}
      <div className="shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Perfil de usuario</h2>
        <div className="flex items-center mb-6">
          {user.data && user.data.photo ? (
            <img
              src={user.data.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://photosly.net/wp-content/uploads/2024/02/cute-dp-girl-boy9.jpg")
              }
            />
          ) : (
            <img
              src="https://photosly.net/wp-content/uploads/2024/02/cute-dp-girl-boy9.jpg"
              alt="Profile placeholder"
              className="w-24 h-24 rounded-full mr-4 object-cover"
            />
          )}
          <div>
            <p className="text-xl font-semibold">{user.data?.name || ""}</p>
            <p className="text-gray-500">{user.data?.email || ""}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={user.data?.name || ""}
              onChange={handleInputChange} // Agregar onChange
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.data?.email || ""}
              onChange={handleInputChange} // Agregar onChange
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save changes
          </button>
        </form>
      </div>

      {/* Sección de eventos */}
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Events you&apos;re enrolled in
        </h2>
        {user.data && user.data.events && user.data.events.length > 0 ? (
          <ul>
            {user.data.events.map((event) => (
              <li
                key={event._id}
                className="flex justify-between items-center mb-4 p-4 border-b border-gray-200"
              >
                <div>
                  <p className="text-lg font-semibold">{event.name}</p>
                  <p className="text-gray-500">{event.date}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleUnsubscribe(event._id)}
                >
                  Unsubscribe
                </button>
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

export default UserControlPanel;
