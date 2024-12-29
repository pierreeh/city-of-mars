import { lazy, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import PrivateRoutes from "./components/routes/PrivateRoutes";

const Layout = lazy(() => import("@/components/Layout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Profile = lazy(() => import("@/pages/Profile"));

export default function Router() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
