import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./screens/Product/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import ForgetPassword from "./screens/Auth/ForgetPassword";
import UpdatePassword from "./screens/Auth/UpdatePassword";
import MyAccount from "./screens/MyAccount";
import Product from "./screens/Product/Product";
import SellProduct from "./screens/Product/SellProduct";
import UpdateProduct from "./screens/Product/UpdateProduct";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
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
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/verify-token/:id",
          element: <UpdatePassword />,
        },
        {
          path: "/myaccount",
          element: <MyAccount />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/sell-product",
          element: <SellProduct />,
        },
        {
          path: "/update-product/:id",
          element: <UpdateProduct />,
        },
      ],
    },
  ]);

  return (
    <main className="flex justify-center">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
