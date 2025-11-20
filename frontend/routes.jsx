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
import Tournaments from "./src/Pages/Dashboard/Tournaments";
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
import ProductDetails from "./src/Pages/admin/ProductDetails";

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
    ],
  },
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        path: "dashboard",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "platforms",
        element: <Platforms />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "communities",
        element: <AdminCommunities />,
      },
      {
        path: "tournaments",
        element: <AdminTournaments />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
    ],
  },
]);
export default router;
