import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
const PrivatePages = () => {
  const { token } = useSelector((state: any) => state.auth);
  return <div>{!token ? <Navigate to="/auth/login/login" replace={true} />:   <Outlet />}</div>;
};

export default PrivatePages;
