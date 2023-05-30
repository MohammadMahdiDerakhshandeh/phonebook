import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LayoutPanel from "./Layout";
import { ConfigProvider } from "antd";
import AddUser from "./AddUser";
import Contacts from "./Contacts";
import EditUser from "./EditUser";
import fa_IR from "antd/locale/fa_IR";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AuthContextProvider from "./authContextProvider";
import NotFound from "./NotFound";
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Navigate to={"/add-user"} replace={true} />,
    },
    {
      path:"*",
      element:<NotFound/>
    },
    {
      path: "",
      element: <LayoutPanel />,
      errorElement: <Navigate to={"/login"} replace={true} />,
      children: [
        {
          path: "add-user",
          element: (
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          ),
        },
        {
          path: "contacts",
          element: (
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          ),
        },
        {
          path: "edit-user/:id",
          element: <EditUser />,
        },
        
      ],
    },
  ]);
  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ConfigProvider>
  );
}

export default App;
