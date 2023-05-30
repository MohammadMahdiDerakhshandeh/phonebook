import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authCtx } from "./authContext";

function PrivateRoute({ children }) {
  const {token} = useContext(authCtx)
  const userInfo = localStorage.getItem("token")
  if (!userInfo && !token) {
    return <Navigate to="/login" replace={false} />;
  }
  return children;
}

export default PrivateRoute;
