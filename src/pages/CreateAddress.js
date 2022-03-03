import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAddress = () => {
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [province, setProvince] = useState({});
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState("");
    const [address, setAddress] = useState("");
    // const [province_code, setProvince_code] = useState("");
    // const [city_code, setCity_code] = useState("");
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [cityCheck, setCityCheck] = useState(false);

    useEffect(()=> {
        fetch(`${base_url}/province`)
        .then(res => res.json())
        .then(response => {
            setProvinceList(response.rajaongkir.results)
        }).catch(err => {
            console.log(err);
        })
    }, [base_url])

    useEffect(()=> {
        fetch(`${base_url}/city?province=${province.province_id}`)
        .then(res => res.json())
        .then(response => {
            setCityList(response.rajaongkir.results)
        }).catch(err => {
            console.log(err);
        })
    }, [base_url, province])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userToken) {
            return false
        }

        if(!(!!city.city_id)){
            setCityCheck(true)
            return false
        }
        setCityCheck(false)
        
        fetch(`${base_url}/v1/user/address`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({
                name,
                phone,
                province: province.province,
                city: city.city_name,
                postal_code,
                address,
                province_code: province.province_id,
                city_code: city.city_id
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
        <div>
            <NavbarLayout />
            <div className="flex justify-center bg-orange-50">
                <div className="w-[70vw] md:w-[50vw] border border-slate-400 my-12 px-5 pt-4 shadow-2xl">
                    <div className="flex justify-center mt-3">
                        <h1 className="text-2xl font-semibold">ADD ADDRESS</h1>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-12 gap-3 md:gap-3">
                    {
                        !!cityCheck ? <p className="text-red-600">Province and city fields are mandatory</p> : ""
                    }
                        <label className="text-gray-700 ml-2">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="text" placeholder="Name..." required/>
                        <label className="text-gray-700 ml-2">Phone Number</label>
                        <input onChange={(e) => setPhone(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="text" pattern="[0-9]+" placeholder="Phone..." required/>
                        <label className="text-gray-700 ml-2">Province</label>
                        <select onChange={(e)=>setProvince(JSON.parse(e.target.value))} className="border-2 h-12 rounded-md pl-2" required>
                            <option key="-1" value={JSON.stringify({})}>-</option>
                            {provinceList.map(item => (<option key={item.province_id} value={JSON.stringify(item)}>{item.province}</option>))}
                        </select>
                        <label className="text-gray-700 ml-2">City</label>
                        <select onChange={(e)=>setCity(JSON.parse(e.target.value))} className="border-2 h-12 rounded-md pl-2" required>
                            <option key="-1" value={JSON.stringify({})}>-</option>
                            {cityList.map(item => (<option key={item.city_id} value={JSON.stringify(item)}>{item.city_name}</option>))}
                        </select>
                        <label className="text-gray-700 ml-2">Postal Code</label>
                        <input onChange={(e) => setPostal_code(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="text" pattern="[0-9]+" placeholder="Postal Code..." required/>
                        <label className="text-gray-700 ml-2">Address</label>
                        <input onChange={(e) => setAddress(e.target.value)} className="border-2 h-12 rounded-md pl-2" type="text" placeholder="Address..." required/>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="btn bg-slate-200 py-3 self-center w-28 rounded-md font-bold border border-slate-400 hover:bg-orange-400">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterLayout/>
        </div>
     );
}
 
export default CreateAddress;