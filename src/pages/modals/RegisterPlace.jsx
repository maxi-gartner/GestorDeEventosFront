import { useNavigate } from "react-router-dom";
import placesQueries from "../../services/placesQueries";
import Swal from "sweetalert2";

export default function RegisterPlace({
  setModalRegisterPlace,
  setConteinerModals,
}) {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const address = event.target.address.value;
    const photo = event.target.photo.value;
    const ocupancy = event.target.ocupancy.value;

    if (!name || !address || !photo || !ocupancy) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
      return;
    }

    try {
      const body = { name, address, photo, ocupancy };
      const response = await placesQueries.createPlace(body);
      if (response.success === true) {
        Swal.fire({
          icon: "success",
          title: response.message,
          text: "Place successfully created.",
          timer: 1500,
          willClose: () => {
            navigate("/adminPanel");
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An unexpected error occurred",
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
              setModalRegisterPlace(false), setConteinerModals(false);
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
                    Register Place
                  </h1>

                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      Place Name:
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
                    <label className="text-sm font-medium" htmlFor="address">
                      Address:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="address"
                      type="text"
                      name="address"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="photo">
                      Photo URL:
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

                  <div>
                    <label className="text-sm font-medium" htmlFor="ocupancy">
                      Occupancy:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="ocupancy"
                      type="number"
                      name="ocupancy"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg mt-6"
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-2">
                        Register Place
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
