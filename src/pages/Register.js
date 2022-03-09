import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import {FcGoogle} from "react-icons/fc";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { signInWithGoogle } from "../config/firebase";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setErrMsg("Password and Confirmation does not match");
                return false;
            }

            if (password.length < 6) {
                setErrMsg("Password length atleast 6 character");
                return false;
            }
            const displayName = email.split('@')[0];

            createUserWithEmailAndPassword(
                auth,
                email,
                password,
            ).then(() => {
                setErrMsg("Register Success");
                updateProfile(auth.currentUser, {
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/binar-petshop.appspot.com/o/profile%2Fblank-profil.png?alt=media&token=12c0feb0-13cd-4db5-bdc4-faef678c7603",
                    displayName
                }).then(() => {
                    navigate('/');
                })
            }).catch(err => {
                setErrMsg(err.message);
            })
        } catch (err) {
            setErrMsg(err?.message);
        }
    }

    const handleLoginGoogle = () => {
        signInWithGoogle();
        navigate("/");
    }
    return ( 
        <>
        <NavbarLayout />
        <div className="sm:grid justify-center py-5 bg-orange-50">
            <div className="h-fit w-full sm:w-[70vw] md:w-[40vw] border border-slate-400 px-3 sm:px-5 py-8 shadow-2xl my-8">
                <h1 className="text-center text-2xl font-bold">REGISTER</h1>
                {errMsg && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg}</h1>}
                <form onSubmit={handleSubmit} className="grid my-12 gap-3 md:gap-3">
                    <label className="text-gray-700 ml-2">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="email" placeholder="Email..." required/>
                    <label className="text-gray-700 ml-2">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="password" placeholder="Password..." required/>
                    <label className="text-gray-700 ml-2">Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="password" placeholder="Confirm Password..." required/>
                    <div className="flex justify-center mt-7">
                        <button type="submit" className="btn bg-orange-200 py-2 self-center w-full sm:w-28 rounded-md font-bold border border-slate-400 hover:bg-orange-400">Submit</button>
                    </div>
                </form>
                <div className="flex mt-9">
                    <span className=" flex-auto border-b-2 border-slate-300 w-auto self-center"></span>
                    <span className="mx-3">OR SIGN IN WITH</span>
                    <span className=" flex-auto border-b-2 border-slate-300 w-auto self-center"></span>
                </div>
                <div className="flex justify-center h-fit mt-6">
                    <button onClick={handleLoginGoogle} className="text-5xl"><FcGoogle/></button>
                </div>
            </div>
        </div>
        <FooterLayout />
        </>
     );
}
 
export default Register;