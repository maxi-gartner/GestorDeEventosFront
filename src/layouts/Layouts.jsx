import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import eventQueries from "../services/eventQueries.js";
import { savedEvents } from "../redux/actions/eventsAction.js";
import { savedUserLogin } from "../redux/actions/userAction.js";
import authQueries from "../services/authQueries.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import alert from "../services/alerts/loading.js";

export default function Layouts() {
  const dispatch = useDispatch();

  //CAPTUDADOR AUTOMATICO DE EVENTOS
  useEffect(() => {
    eventQueries
      .getAllEvents()
      .then((data) => {
        dispatch(savedEvents(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //CAPTUDADOR AUTOMATICO DE USUARIOS
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      alert("Loading data...");
      try {
        authQueries
          .loginWithToken(token)
          .then((data) => {
            dispatch(savedUserLogin(data.response));
            Swal.close();
          })
          .catch((err) => {
            console.log("Error durante el login:", err);
            Swal.close();
            Swal.fire({
              title: "Error",
              text: "Hubo un problema durante el inicio de sesión.",
              icon: "error",
            });
          });
      } catch (error) {
        console.log("Error en el token:", error);
        Swal.close();
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-[90vh] mt-[10vh] max-w-7xl items-center mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
