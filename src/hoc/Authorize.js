import { Outlet, Navigate } from "react-router-dom";
const Authorize = () => {
  const isAdmin = localStorage.getItem("isAdmin");
    return isAdmin === "true" ? <Outlet /> : <Navigate to="/" />
}
 
export default Authorize;