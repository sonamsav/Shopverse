import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./pages/Navbar";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Products from "./pages/Product";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import AdminSales from "./pages/admin/AdminSales";
import AddProducts from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminUsers from "./pages/admin/AdminUsers";
import ShowUserOrder from "./pages/admin/ShowUserOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleProducts from "./pages/SingleProducts";
import UserInfo from "./pages/admin/UserInfo";
import AddressForm from "./pages/AddressForm";
import OrderSuccess from "./pages/OrderSuccess";
import DashboardHome from "./pages/DashobardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home /> <Footer />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUp />{" "}
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />{" "}
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <>
        <ProtectedRoute>
          <Navbar /> <Profile />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Navbar /> <SingleProducts />
        {/* <Footer /> */}
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar /> <Products />
        <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ProtectedRoute>
          <Navbar /> <Cart />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  {
    path: "/address",
    element: (
      <>
        <ProtectedRoute>
          <Navbar /> <AddressForm />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/address",
    element: (
      <>
        <ProtectedRoute>
          <Navbar /> <OrderSuccess />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ProtectedRoute adminOnly={true}>
          <Dashboard />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
    index: true,
    element: <DashboardHome />,
  },
      {
        path: "dash-home",
        element: <DashboardHome />,
      },
      {
        path: "add-product",
        element: <AddProducts />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "orders",
        element: <AdminOrder />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:id",
        element: <UserInfo />,
      },
      {
        path: "users/orders/:id",
        element: <ShowUserOrder />,
      },
    ],
  },
 
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
