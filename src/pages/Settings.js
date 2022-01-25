import { useNavigate } from "react-router-dom";

const Settings = ({handleLogout}) => {

    const navigate = useNavigate();
    const Logout = () => {
        handleLogout();
        navigate("/");
    }

    return ( 
        <div className="flex w-screen justify-center my-32">
            <button className="bg-red-500 px-2 py-2" onClick={Logout}>Logout</button>
        </div>
     );
}
 
export default Settings;