import { createBrowserRouter } from "react-router-dom";
import Main from "../App.jsx";
import Layouts from "../layouts/Main.jsx";
import SignUp from "../pages/SignUp.jsx";
import SignIn from "../pages/SignIn.jsx";
import Events from "../pages/Events.jsx";
import DetailsEvent from "../pages/DetailsEvent.jsx";

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
    ],
  },
]);
export default router;
