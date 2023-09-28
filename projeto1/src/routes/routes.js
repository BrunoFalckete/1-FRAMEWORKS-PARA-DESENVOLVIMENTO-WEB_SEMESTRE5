import { createBrowserRouter } from "react-router-dom";
import Album from "../pages/Album";
import Products from "../pages/Products";
import {Home} from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/albums",
    element: <Album />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export { router };
