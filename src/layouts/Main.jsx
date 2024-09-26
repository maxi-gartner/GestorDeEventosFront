import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Main(props) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-[90vh] mt-[10vh]">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
