import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrMsg('password and confirm password not match');
            return false
        }

        fetch('http://localhost:8000/login', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password,
                phone
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
    }
    return ( 
        <div className="grid justify-center items-center h-[50vh] mt-12">
            <div className="h-fit w-[70vw] md:w-[30vw]">
                <h1 className="text-center">Register Page</h1>
                {errMsg && <h1>{errMsg}</h1>}
                <form onSubmit={handleSubmit} className="grid mt-12 gap-14">
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12" type="email" placeholder="Email..." />
                    <input onChange={(e) => setPhone(e.target.value)} className="border-2 h-12" type="number" placeholder="Phone..." />
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12" type="password" placeholder="Password..." />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="border-2 h-12" type="password" placeholder="Confirm Password..." />
                </form>
            </div>
        </div>
     );
}
 
export default Register;