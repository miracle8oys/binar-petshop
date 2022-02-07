import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Authorize = () => {
    const userData = useSelector(state => state.loginReducer);
    const [userRole, setUserRole] = useState(false);
    useEffect(() => {
        if (!!userData.user?.accessToken) {
            fetch(`http://localhost:8000/auth/checkAdmin`, {
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