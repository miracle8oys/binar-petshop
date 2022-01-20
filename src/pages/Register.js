import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth, signInWithGoogle } from "../config/firebase";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const auth = getAuth();

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
                    photoURL: "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
                    displayName
                })
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            setErrMsg(err?.message);
        }
    }

    const handleLoginGoogle = () => {
        signInWithGoogle();
    }
    return ( 
        <div className="grid justify-center h-[100vh] py-10 bg-orange-50">
            <div className="h-fit w-[70vw] md:w-[30vw]">
                <h1 className="text-center text-2xl font-bold">Register</h1>
                {errMsg && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg}</h1>}
                <form onSubmit={handleSubmit} className="grid my-12 gap-14 md:gap-10">
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md" type="email" placeholder="Email..." />
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12 rounded-md" type="password" placeholder="Password..." />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 h-12 rounded-md" type="password" placeholder="Confirm Password..." />
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-3 self-center w-28 rounded-md font-bold">Submit</button>
                    </div>
                </form>
            </div>
                <div className="flex justify-center h-fit">
                    <button onClick={handleLoginGoogle} className="bg-blue-300 py-3 px-2 font-bold rounded-md">Sign In With Google</button>
                </div>
        </div>
     );
}
 
export default Register;