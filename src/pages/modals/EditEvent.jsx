import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import eventQueries from "../../services/eventQueries";

export default function RegisterEvent({
  setModalEditEvent,
  setConteinerModals,
  eventToEdit,
  setEvents,
}) {
  const navigate = useNavigate();
  const [eventToUpdate, setEvent] = useState({});
  useEffect(() => {
    eventQueries.getEventById(eventToEdit).then((data) => {
      setEvent(data);
    });
  }, [eventToEdit]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const date = event.target.date.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const description = event.target.description.value;
    const minimumAge = event.target.minimumAge.value;

    // Creamos un objeto vacío para ir llenando con los campos que el usuario quiera actualizar
    let body = {};

    if (date) {
      body.date = date;
    }

    if (name) {
      body.name = name;
    }

    if (photo) {
      body.photo = photo;
    }

    if (description) {
      body.description = description;
    }

    if (minimumAge) {
      body.minimumAge = minimumAge;
    }
    if (Object.keys(body).length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No fields to update",
      });
      return;
    }

    try {
      const response = await eventQueries.organizerUpdateUser(
        body,
        eventToUpdate.id
      );
      if (response.success === true) {
        const response = await eventQueries.getAllEvents();
        setEvents(response);
        Swal.fire({
          icon: "success",
          title: response.message,
          text: "User successfully updated.",
          timer: 1500,
          willClose: () => {
            navigate("/adminPanel");
            setModalEditEvent(false);
            setConteinerModals(false);
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-transparent hover:bg-gray-200 p-1 rounded-full"
            onClick={() => {
              setModalEditEvent(false), setConteinerModals(false);
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
                onSubmit={handleUpdate}
              >
                <div className="bloque1">
                  <h1 className="mb-4 text-2xl font-bold w-full text-center">
                    Update Event
                  </h1>

                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      Name:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={eventToUpdate.name}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="date">
                      Date:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="date"
                      type="date"
                      name="date"
                      autoComplete="off"
                      placeholder={eventToUpdate.date}
                    />
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="photo">
                      Photo URL:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="photo"
                      type="text"
                      name="photo"
                      autoComplete="off"
                      placeholder="Enter photo URL"
                    />
                  </div>

                  {/* Description */}
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
                      autoComplete="off"
                      placeholder={eventToUpdate.description}
                    />
                  </div>

                  {/* Minimum Age */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="minimumAge">
                      Minimum Age:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="minimumAge"
                      type="number"
                      name="minimumAge"
                      autoComplete="off"
                      placeholder={eventToUpdate.minimumAge}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg mt-6"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-2">
                        Update User
                      </span>
                    </button>
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
