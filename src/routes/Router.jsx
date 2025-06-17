import { createBrowserRouter, } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import login from "../pages/Login/login";
import AllFoods from "../pages/AllFoods/AllFoods";
import Gallery from "../pages/Gallery/Gallery";
import Register from "../pages/Register/Register";
import SinglePage from "../pages/SinglePage/SinglePage";
// import axiosInstance from "../hooks/axiosInstance";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
// import Cart from "../pages/Cart/Cart";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    // errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'allfood',
        Component: AllFoods
      },
      {
        path: 'Gallery',
        Component: Gallery
      },
      {
        path: 'foods/:id',
        element:<SinglePage></SinglePage>,
        

      },
      {
        path: 'cart',
        element:<PrivateRoute><Cart></Cart></PrivateRoute>
      }
    ]
  },
]);

export default router;