import { Outlet, Navigate } from "react-router-dom";
const Authorize = () => {
  const isAdmin = localStorage.getItem("isAdmin");
    // const base_url = process.env.REACT_APP_BASE_URL;
    // useEffect(() => {
    //     if (!!userData.user?.accessToken) {
    //         fetch(`${base_url}/auth/checkAdmin`, {
    //             method: "GET",
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': userData?.user?.accessToken
    //             }
    //           }).then(res => res.json())
    //           .then(result => {
    //             if (result.message === 'Success') {
    //               setUserRole(true);
    //             }
    //           })
    //     }
    // }, [userData, setUserRole])
    return isAdmin === "true" ? <Outlet /> : <Navigate to="/" />
}
 
export default Authorize;