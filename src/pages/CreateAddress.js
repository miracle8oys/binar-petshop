import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateAddress = () => {
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState("");
    const [address, setAddress] = useState("");
    const [province_code, setProvince_code] = useState("");
    const [city_code, setCity_code] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/v1/user/address', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({
                name,
                phone,
                province,
                city,
                postal_code,
                address,
                province_code,
                city_code
            })
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            navigate(-1);
        }).catch(err => {
            console.log(err);
        })
    }
    return ( 
        <div className="flex justify-center">
            <div className="w-4/5 md:w-1/4">
                <div className="flex justify-center">
                    <h1>Address</h1>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-12 gap-12 md:gap-10">
                    <input onChange={(e) => setName(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="Name..." />
                    <input onChange={(e) => setPhone(e.target.value)} className="border-2 h-12 rounded-md" type="number" placeholder="Phone..." />
                    <input onChange={(e) => setProvince(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="Province..." />
                    <input onChange={(e) => setCity(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="City..." />
                    <input onChange={(e) => setPostal_code(e.target.value)} className="border-2 h-12 rounded-md" type="number" placeholder="Postal Code..." />
                    <input onChange={(e) => setAddress(e.target.value)} className="border-2 h-12 rounded-md" type="text" placeholder="Address..." />
                    <input onChange={(e) => setProvince_code(e.target.value)} className="border-2 h-12 rounded-md" type="number" placeholder="Province Code..." />
                    <input onChange={(e) => setCity_code(e.target.value)} className="border-2 h-12 rounded-md" type="number" placeholder="City Code..." />
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-3 self-center w-28 rounded-md font-bold">Submit</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default CreateAddress;