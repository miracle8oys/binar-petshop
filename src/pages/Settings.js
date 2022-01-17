const Settings = ({handleLogout}) => {
    return ( 
        <div className="flex w-screen justify-center my-32">
            <button onClick={handleLogout}>Logout</button>
        </div>
     );
}
 
export default Settings;