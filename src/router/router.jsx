import { createBrowserRouter } from "react-router-dom";
import Main from "../App.jsx";
import Layouts from "../layouts/Main.jsx";
import SignUp from "../pages/SignUp.jsx";
import SignIn from "../pages/SignIn.jsx";
import Events from "../pages/Events.jsx";
import DetailsEvent from "../pages/DetailsEvent.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Contact from "../pages/Contact.jsx";
import UserControlPanel from "../pages/UserControlPanel.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/events", element: <Events /> },
      { path: "/event/:id", element: <DetailsEvent /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/userControlPanel", element: <UserControlPanel /> },
      { path: "/adminPanel", element: <AdminPanel /> },
    ],
  },
]);
export default router;
