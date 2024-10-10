//import { useState } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authQueries from "../services/authQueries";
import eventQueries from "../services/eventQueries";
import { useDispatch } from "react-redux";
import { savedUserLogin } from "../redux/actions/userAction";
import alert from "../services/alerts/swalAlert";

const UserControlPanel = () => {
  const dispatch = useDispatch();
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

    authQueries.updateUser(user.data).then((data) => {
      if (data.data.success === false) {
        alert.error(data.data.message);
        return;
      }
      alert.success("Profile updated successfully.", () => {
        setUser(data.data.response);
        dispatch(savedUserLogin(data.data.response));
      });
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      //prev trae el ultimo estado del x en  [x, y] = useState({x: 1, y: 2})
      ...prevUser, //ago una copia del estado
      data: {
        ...prevUser.data,
        [name]: value, //aca busco la kay y le remplazo el valor
      },
    }));
  };

  function handleUnsubscribe(eventId) {
    eventQueries
      .unsubscribe(eventId)
      .then((data) => {
        if (data.data.success === false) {
          alert.error(data.data.message);
          return;
        }
        alert.success("You have been unsubscribed from this event.");
        setUser(data.data.response);
      })
      .catch((error) => {
        alert.error("Error unsubscribing from this event.");
        console.log("error", error.response.data.message);
      });
  }
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
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
            <p className="text-xl font-semibold">
              {user.data ? (
                `${capitalizeWords(user.data.name)}  ${capitalizeWords(
                  user.data.lastname
                )}`
              ) : (
                <></>
              )}
            </p>
            <p className="text-gray-500">{user.data?.email || ""}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={user.data?.name || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={user.data?.lastname || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={user.data?.email || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
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
                    <p className="text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
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
