import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import {FcGoogle} from "react-icons/fc";
import { useState } from "react";
import { signInWithGoogle, auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            email,
            password
        ).then(res => {
            console.log(res);
            navigate("/")
        }).catch(err => {
            setErr(err.message);
        })
    }

    const handleLoginGoogle = () => {
        signInWithGoogle();
        navigate("/");
    }

    return ( 
        <>
        <NavbarLayout />
        <div className="sm:grid justify-center py-5 bg-orange-50">
            <div className="h-fit w-full sm:w-[70vw] md:w-[40vw] border border-slate-400 px-3 sm:px-5 shadow-2xl my-8">
            <h1 className="text-center my-12 font-bold text-2xl">LOGIN</h1>
                {err &&
                    <div className="text-center bg-slate-200 py-2 rounded-md">
                        <h1>{err}</h1>
                    </div>
                }
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <label className="text-gray-700 ml-2">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="email" placeholder="Email..." required/>
                    <label className="text-gray-700 ml-2">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="password" placeholder="Password..." required/>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="btn bg-orange-200 py-2 font-bold w-full sm:w-32 rounded-md border border-slate-400 hover:bg-orange-400">Login</button>
                    </div>
                </form>
                <p className="text-center mt-8 text-blue-400 hover:text-blue-900">
                    <a href="/register">doesn,t have any account?</a>
                </p>
                <p className="text-center mt-5 text-blue-400 hover:text-blue-900">
                    <a href="/reset-password">Forgot Password?</a>
                </p>
                <div className="flex mt-9">
                    <span className=" flex-auto border-b-2 border-slate-300 w-auto self-center"></span>
                    <span className="mx-3">OR SIGN IN WITH</span>
                    <span className=" flex-auto border-b-2 border-slate-300 w-auto self-center"></span>
                </div>
                <div className="flex justify-center">
                    <button onClick={handleLoginGoogle} className="my-7 rounded-md text-5xl"><FcGoogle/></button>
                </div>
            </div>
        </div>
        <FooterLayout />
        </>
     );
}
 
export default Login;