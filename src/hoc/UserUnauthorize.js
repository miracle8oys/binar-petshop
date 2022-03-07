import { Outlet, Navigate } from "react-router-dom";
const UserUnauthorize = () => {
    const isLogin = localStorage.getItem("isLogin");
    return isLogin === "true" ? <Navigate to="/" /> : <Outlet />
}
 
export default UserUnauthorize;