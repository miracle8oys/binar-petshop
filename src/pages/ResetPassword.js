import { useState } from "react";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigate("/")
        }).catch(err => {
            console.log(err.message);
        })
        
    }

    return ( 
        <>
        <NavbarLayout />
        <div className="grid justify-center h-[100vh] bg-orange-50">
            <div className="h-fit w-[70vw] md:w-[30vw]">
            <h1 className="text-center my-12 font-bold text-2xl">Reset Password</h1>
                <form onSubmit={handleSubmit} className="grid gap-14">
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md" type="email" placeholder="Email..." />
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-2 font-bold w-32 rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <FooterLayout />
        </>
     );
}
 
export default ResetPassword;