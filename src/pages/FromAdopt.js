import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const FormAdopt = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setErrMsg("Password and Confirmation do not match");
                return false;
            }

            if (password.length < 6) {
                setErrMsg("Password length atleast 6 character");
                return false;
            }

            createUserWithEmailAndPassword(
                auth,
                email,
                password,
                phone
            ).then(() => {
                setErrMsg("Register Success");
            })
        } catch (err) {
            setErrMsg(err?.message);
        }
    }
    return ( 
        <div className="grid justify-center items-center h-[50vh] mt-12">
            <div className="h-fit w-[70vw] md:w-[30vw]">
                <h1 className="text-center">Register Page</h1>
                {errMsg && <h1>{errMsg}</h1>}
                <form onSubmit={handleSubmit} className="grid my-12 gap-14">
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12" type="email" placeholder="Email..." />
                    <input onChange={(e) => setPhone(e.target.value)} className="border-2 h-12" type="number" placeholder="Phone..." />
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12" type="password" placeholder="Password..." />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 h-12" type="password" placeholder="Confirm Password..." />
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default FormAdopt;