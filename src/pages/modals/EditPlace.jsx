import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import alert from "../../services/alerts/swalAlert";
import placesQueries from "../../services/placesQueries";

export default function EditPlace({
  setModalEditPlace,
  setConteinerModals,
  placeToEdit,
  setPlaces,
}) {
  const navigate = useNavigate();
  const [PlaceToEdit, setPlaceToEdit] = useState({});
  useEffect(() => {
    placesQueries.getPlace(placeToEdit).then((data) => {
      setPlaceToEdit(data);
    });
  }, []);

  const handleUpdate = async (place) => {
    alert.loading("Updating place...");
    place.preventDefault();

    const name = place.target.name.value;
    const photo = place.target.photo.value;
    const ocupancy = place.target.ocupancy.value;

    let body = {};

    if (name) {
      body.name = name;
    }

    if (photo) {
      body.photo = photo;
    }

    if (ocupancy) {
      body.minimumAge = ocupancy;
    }
    if (Object.keys(body).length === 0) {
      Swal.close();
      alert.error("No fields to update");
      return;
    }

    try {
      console.log("PlaceToEdit.id", PlaceToEdit);
      const response = await placesQueries.editPlace(PlaceToEdit.id, body);
      if (response.data.success === true) {
        setPlaces(response.allPlaces);

        Swal.close();
        alert.success(response.data.message, () => {
          setModalEditPlace(false),
            setConteinerModals(false),
            navigate("/adminPanel");
        });
      } else {
        Swal.close();
        alert.error(response.data.response.data.message);
      }
    } catch (err) {
      Swal.close();
      console.log(err);
    }
  };

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-transparent hover:bg-gray-200 p-1 rounded-full"
            onClick={() => {
              setModalEditPlace(false), setConteinerModals(false);
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
                    Update Place
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
                      placeholder={PlaceToEdit.name}
                    />
                  </div>

                  {/* address */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="address">
                      Address:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="address"
                      type="text"
                      name="address"
                      autoComplete="off"
                      placeholder={PlaceToEdit.address}
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

                  {/* Ocupancy */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="ocupancy">
                      Ocupancy:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="ocupancy"
                      type="number"
                      name="ocupancy"
                      autoComplete="off"
                      placeholder={PlaceToEdit.ocupancy}
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
