import { useNavigate } from "react-router-dom";
import authQueries from "../services/authQueries";
import { Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const age = event.target.age.value;
    const genre = event.target.genre.value;
    const role = event.target.role.value;

    console.log(
      "object",
      name,
      lastname,
      email,
      password,
      age,
      genre,
      confirmPassword
    );

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const body = { name, lastname, email, password, age, genre, role };

    const data = await authQueries.signup(body);
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem("user", JSON.stringify(data.response.data));
    localStorage.setItem("token", JSON.stringify(data.response.token));
    localStorage.setItem("AdminOrOrganizerExpiration", expirationTime);
    navigate("/");
  };

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4"
                onSubmit={handleRegister}
              >
                <h1 className="mb-4 text-2xl font-bold w-full text-center">
                  Sign Up
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
                    type="Password"
                    name="confirmPassword"
                    required
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
                    <option value="" disabled selected>
                      Select your genre
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="role">
                    Role:
                  </label>
                  <select
                    className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                    id="role"
                    name="role"
                    required
                  >
                    <option value="" disabled selected>
                      Select your role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="organizer">Organizer</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg"
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
                      Register
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
