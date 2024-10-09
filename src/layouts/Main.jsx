import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import eventQueries from "../services/eventQueries.js";
import { savedEvents } from "../redux/actions/eventsAction";
import { savedUserLogin } from "../redux/actions/userAction";
import authQueries from "../services/authQueries.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Main() {
  const dispatch = useDispatch();
  //CAPTUDADOR AUTOMATICO DE USUARIOS
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      authQueries
        .loginWithToken(token)
        .then((data) => {
          dispatch(savedUserLogin(data.response));
        })
        .catch((err) => {
          console.log("Error durante el login:", err);
        });
    }
  });

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
  });

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
