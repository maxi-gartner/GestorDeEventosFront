import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Main() {
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
