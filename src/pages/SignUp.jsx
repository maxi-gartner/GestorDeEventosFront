import { useNavigate, Link } from "react-router-dom";
import authQueries from "../services/authQueries";
import Swal from "sweetalert2";
import { useState } from "react";
import alert from "../services/alerts/swalAlert";

export default function SignUp({ setModalRegisterUser, setConteinerModals }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    alert.loading("Signing up...");

    const { name, lastname, email, password, confirmPassword, age, genre } =
      event.target;

    if (
      !name.value ||
      !lastname.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value ||
      !age.value ||
      !genre.value
    ) {
      alert.error("All fields are required");
      setIsSubmitting(false);
      Swal.close();
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert.error("Passwords do not match");
      setIsSubmitting(false);
      Swal.close();
      return;
    }

    try {
      const body = {
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        age: age.value,
        genre: genre.value,
        role: "user",
      };
      const response = await authQueries.signup(body);
      if (response.success) {
        Swal.close();
        alert.success(response.message, () => {
          navigate("/signin");
        });
      } else {
        Swal.close();
        alert.error(response.data.message);
      }
    } catch (error) {
      Swal.close();
      alert.error("Error signing up");
      console.log("error", error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4 relative">
          {setModalRegisterUser && (
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-transparent hover:bg-gray-200 p-1 rounded-full"
              onClick={() => {
                setModalRegisterUser(false);
                setConteinerModals(false);
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
          )}
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4 sm:flex-row sm:gap-8"
                onSubmit={handleRegister}
              >
                <div className="bloque1">
                  <h1 className="mb-4 text-2xl font-bold w-full text-center">
                    Register
                  </h1>

                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      Name:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="name"
                      type="text"
                      name="name"
                      required
                      autoComplete="given-name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="lastname">
                      Last Name:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="lastname"
                      type="text"
                      name="lastname"
                      required
                      autoComplete="family-name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="email">
                      Email:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="password">
                      Password:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="password"
                      type="password"
                      name="password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="confirmPassword"
                    >
                      Repeat Password:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      required
                      autoComplete="new-password"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="age">
                      Age:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="age"
                      type="number"
                      name="age"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="genre">
                      Genre:
                    </label>
                    <select
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="genre"
                      name="genre"
                      required
                    >
                      <option value="" disabled>
                        Select your genre
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting} // Deshabilitar botón durante el envío
                      className={`border transition-colors focus:ring-2 p-0.5 ${
                        isSubmitting
                          ? "cursor-not-allowed"
                          : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
                      } text-white rounded-lg mt-6`}
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                        {isSubmitting ? "Registering..." : "Register"}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="bloque2 flex flex-col gap-6">
                  <h1 className="mb-4 text-2xl font-bold w-full text-center">
                    Register with Google <br /> or Facebook
                  </h1>
                  <button
                    type="button"
                    className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                        enableBackground="new 0 0 48 48"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                      Sign in with Google
                    </span>
                  </button>
                  <button
                    type="button"
                    className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                      </svg>
                      Sign in with Facebook
                    </span>
                  </button>
                </div>
              </form>
              <div className="min-w-[270px]">
                <div className="mt-4 text-center">
                  Already have an account?{" "}
                  <Link
                    className="text-blue-500 underline hover:text-blue-600"
                    to="/signin"
                  >
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
