import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export const PrivateRoutes = ({ component: Component }) => {
  const currentUser = useAuthContext();
  return (
    <>
        { currentUser.login ? (
            <>
              <Component/>
            </>):(
            <>
              {/* изменить на 404 или достпу запрщен! редиректит на  / */}
              {/* <Navigate to="/" replace /> */}
            </>)
        }
    </>
  )  
};
