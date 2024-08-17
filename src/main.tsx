import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import { ErrorPage } from "./components/NotFound.tsx";
import Products from "./features/products/Products.tsx";
import YourCart from "./features/yourCart/YourCart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "product/:productId",
    element: <Products />,
  },
  {
    path: "your-cart",
    element: <YourCart />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
