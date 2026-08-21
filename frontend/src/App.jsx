import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Home from "./pages/Home";
import Properties  from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/properties",
    element: <Properties />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
