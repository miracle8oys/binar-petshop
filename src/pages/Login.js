import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/login', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
    }
    return ( 
        <div className="grid justify-center items-center h-[50vh]">
            <div className="h-fit w-[70vw] md:w-[30vw]">
            <h1 className="text-center">Login Page</h1>
            <form onSubmit={handleSubmit} className="grid mt-12 gap-14">
                <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12" type="email" placeholder="Email..." />
                <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12" type="password" placeholder="Password..." />
            </form>
            </div>
        </div>
     );
}
 
export default Login;