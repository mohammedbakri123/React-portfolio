import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./core/ui/Home.jsx";
import Error from "./core/ui/Error.jsx";

import Cart from "./features/cart/Cart.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder.jsx";
import Order, { loader as orderLoader } from "./features/order/Order.jsx";
import AppLayout from "./core/ui/AppLayout.jsx";

import { action as setPriorityAction } from "./features/order/SetPriority.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <h1>Page not found</h1>,
      },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: "/order/:orderid",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: setPriorityAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
