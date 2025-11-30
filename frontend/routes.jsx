import Root from "./src/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "./src/Pages/Home";
import Login from "./src/Pages/Login";
import Signup from "./src/Pages/Signup";
import Account from "./src/Pages/dashboard/Account";
import Profile from "./src/Pages/Dashboard/Profile";
import DashboardLayout from "./src/Pages/dashboard/DashboardLayout";
import Communities from "./src/Pages/dashboard/Communities";
import Community from "./src/Pages/Dashboard/Community";
import Tournaments from "./src/Pages/dashboard/Tournaments";
import Tournament from "./src/Pages/dashboard/Tournament";
import { Protected } from "./src/contexts/AuthContext";
import Dashboard from "./src/Pages/admin/Dashboard";
import Adminlayout from "./src/Pages/admin/_layout";
import Platforms from "./src/Pages/admin/Platforms";
import Games from "./src/Pages/admin/Games";
import Users from "./src/Pages/admin/Users";
import AdminCommunities from "./src/Pages/admin/Communities";
import AdminTournaments from "./src/Pages/admin/Tournaments";
import Products from "./src/Pages/admin/Products";
import Orders from "./src/Pages/admin/Orders";
import OrderDetails from "./src/Pages/admin/OrderDetails";
import UserDetails from "./src/Pages/admin/UserDetails";
import AddProduct from "./src/Pages/admin/AddProduct";
import ProductDetails from "./src/Pages/dashboard/ProductDetails";
import Success from "./src/Pages/dashboard/Success";
import Failure from "./src/Pages/dashboard/Failure";
import ForgetPassword from "./src/Pages/ForgetPassword";
import ResetPassword from "./src/Pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      {
        element: <Account />,
        path: "/account",
        index: true,
      },
      {
        path: "/tournaments",
        element: <Tournaments />,
      },
      {
        path: "/communities",
        element: <Communities />,
      },
      {
        path: "/community/:id",
        element: <Community />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/tournament/:id",
        element: <Tournament />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "failure",
        element: <Failure />,
      },
    ],
  },
]);
export default router;
