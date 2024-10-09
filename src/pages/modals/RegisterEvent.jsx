import { useNavigate } from "react-router-dom";
import eventQueries from "../../services/eventQueries";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import placesQueries from "../../services/placesQueries";
import alert from "../../services/alerts/loading";

export default function RegisterEvent({
  setModalRegisterEvent,
  setConteinerModals,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  const handleRegister = async (event) => {
    alert("Registering event");
    event.preventDefault();

    const place = event.target.place.value;
    const date = event.target.date.value;
    const name = event.target.name.value;
    const description = event.target.description.value;
    const minimumAge = event.target.minimumAge.value;
    const photo = event.target.photo.value;

    if (!place || !date || !name || !description || !minimumAge || !photo) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
      return;
    }

    try {
      const body = { place, date, name, description, minimumAge, photo };
      const response = await eventQueries.createEvent(body);
      if (response.success === true) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: response.message,
          text: "Event successfully created.",
          timer: 1500,
          willClose: () => {
            navigate("/events");
          },
        });
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    placesQueries.getAllPlaces().then((data) => {
      setPlaces(data);
    });
  }, [user]);

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-transparent hover:bg-gray-200 p-1 rounded-full"
            onClick={() => {
              setModalRegisterEvent(false), setConteinerModals(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8"
                onSubmit={handleRegister}
              >
                <div className="bloque1">
                  <h1 className="mb-4 text-2xl font-bold w-full text-center">
                    Register Event
                  </h1>

                  <div>
                    <label className="text-sm font-medium" htmlFor="place">
                      Place ID:
                    </label>
                    <select
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="place"
                      name="place"
                      required
                    >
                      <option value="">Select a place</option>
                      {places.map((place) => (
                        <option key={place.data.id} value={place.data.id}>
                          {place.data.name}
                          {", "} {place.data.address}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="date">
                      Date:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="date"
                      type="date"
                      name="date"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      Event Name:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="name"
                      type="text"
                      name="name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="description"
                    >
                      Description:
                    </label>
                    <textarea
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="description"
                      name="description"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="minimumAge">
                      Minimum Age:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="minimumAge"
                      type="number"
                      name="minimumAge"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="organizer">
                      Photo:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="photo"
                      type="text"
                      name="photo"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg mt-6"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-2">
                        Register Event
                      </span>
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Link
                      to="/events"
                      className="text-sky-600 hover:underline text-sm"
                    >
                      Back to Events
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
