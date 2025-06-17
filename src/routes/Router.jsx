import { createBrowserRouter, } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import login from "../pages/Login/login";
import AllFoods from "../pages/AllFoods/AllFoods";
import Gallery from "../pages/Gallery/Gallery";
import Register from "../pages/Register/Register";
import SinglePage from "../pages/SinglePage/SinglePage";
import axiosInstance from "../hooks/axiosInstance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
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
        loader: ({ params }) => axiosInstance.get(`/foods/${params.id}`)

      }
    ]
  },
]);

export default router;