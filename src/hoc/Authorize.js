import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const Authorize = () => {
    const userData = useSelector(state => state.loginReducer);
    const [userRole, setUserRole] = useState(false)
    useEffect(() => {
        fetch(`http://localhost:8000/auth/checkAdmin`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userData?.user?.accessToken
            }
          }).then(res => res.json())
          .then(result => {
            console.log(result.message);
            if (result.message === 'Success') {
              setUserRole(true)
            }
          })
    }, [userData, setUserRole])
    return (
        <>
            {!!userRole && <Outlet />}
        </>
        )
}
 
export default Authorize;