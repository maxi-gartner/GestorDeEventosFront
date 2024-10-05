import { useState } from "react";
import Swal from "sweetalert2";

const UserControlPanel = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

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

  return (
    <div className="container mx-auto p-6">
      {/* Sección de perfil */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Perfil de usuario</h2>
        <div className="flex items-center mb-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={user.name}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Guardar cambios
          </button>
        </form>
      </div>

      {/* Sección de eventos */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Eventos inscritos</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center mb-4 p-4 border-b border-gray-200"
              >
                <div>
                  <p className="text-lg font-semibold">{event.name}</p>
                  <p className="text-gray-500">{event.date}</p>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  Desinscribirse
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No estás inscrito en ningún evento.</p>
        )}
      </div>
    </div>
  );
};

export default UserControlPanel;
