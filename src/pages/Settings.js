const Settings = ({handleLogout}) => {
    return ( 
        <div className="flex w-screen justify-center my-32">
            <button className="bg-red-500 px-2 py-2" onClick={handleLogout}>Logout</button>
        </div>
     );
}
 
export default Settings;