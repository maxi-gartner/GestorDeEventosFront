import { useNavigate } from "react-router-dom";
import authQueries from "../../services/authQueries";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import alert from "../../services/alerts/loading";

export default function RegisterEvent({
  setModalEditUser,
  setConteinerModals,
  userToEdit,
  setUsers,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    authQueries.getUserByEmail(userToEdit).then((data) => {
      setUser(data.response);
    });
  }, [userToEdit]);

  const handleRegister = async (event) => {
    alert("Updating user...");
    event.preventDefault();

    const email = event.target.email.value;
    const resetPassword = event.target.resetPassword.value;
    const repeatResetPassword = event.target.repeatResetPassword.value;
    const role = event.target.role.value;

    if (resetPassword && repeatResetPassword !== resetPassword) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
      return;
    }

    // Creamos un objeto vacío para ir llenando con los campos que el usuario quiera actualizar
    let body = {};

    if (email) {
      body.email = email;
    }

    if (resetPassword) {
      body.resetPassword = resetPassword;
    }

    if (role) {
      body.role = role;
    }

    if (Object.keys(body).length === 0) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No fields to update",
      });
      return;
    }

    try {
      const response = await authQueries.adminUpdateUser(body, user.data.email);
      if (response.success === true) {
        setUsers(response.response);
        Swal.close();
        Swal.fire({
          icon: "success",
          title: response.message,
          text: "User successfully updated.",
          timer: 1500,
          willClose: () => {
            navigate("/adminPanel");
            setModalEditUser(false);
            setConteinerModals(false);
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

  return (
    <div className="py-2 sm:py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-[#312e31] shadow-md flex-col flex h-full items-center justify-center sm:px-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-transparent hover:bg-gray-200 p-1 rounded-full"
            onClick={() => {
              setModalEditUser(false), setConteinerModals(false);
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
                    Register User
                  </h1>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="email">
                      Email:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder={user.data?.email}
                    />
                  </div>

                  {/* Reset Password */}
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="resetPassword"
                    >
                      Reset Password:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="resetPassword"
                      type="password"
                      name="resetPassword"
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Repeat Reset Password */}
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="repeatResetPassword"
                    >
                      Repeat Reset Password:
                    </label>
                    <input
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="repeatResetPassword"
                      type="password"
                      name="repeatResetPassword"
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-sm font-medium" htmlFor="role">
                      Role: <br></br>Current role: {user.data?.role}
                    </label>
                    <select
                      className="block w-full border bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 p-2.5 text-sm rounded-lg text-black"
                      id="role"
                      name="role"
                    >
                      <option value="">Select a role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="Organizer">Organizer</option>
                    </select>
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
