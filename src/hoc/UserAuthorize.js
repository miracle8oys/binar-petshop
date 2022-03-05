import { Outlet, Navigate } from "react-router-dom";
const UserAuthorize = () => {
    const isLogin = localStorage.getItem("isLogin");
    return isLogin === "true" ? <Outlet /> : <Navigate to="/" />
}
 
export default UserAuthorize;