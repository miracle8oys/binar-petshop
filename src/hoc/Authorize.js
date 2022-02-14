import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Authorize = () => {
    const userData = useSelector(state => state.loginReducer);
    const [userRole, setUserRole] = useState(false);
    const base_url = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        if (!!userData.user?.accessToken) {
            fetch(`${base_url}/auth/checkAdmin`, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': userData?.user?.accessToken
                }
              }).then(res => res.json())
              .then(result => {
                if (result.message === 'Success') {
                  setUserRole(true);
                }
              })
        }
    }, [userData, setUserRole])
    return (
        <>
            {!userRole && 
              <h1 className="text-center mt-52">Access Not Allowed</h1>
            }
            {userRole && <Outlet />}
        </>
        )
}
 
export default Authorize;