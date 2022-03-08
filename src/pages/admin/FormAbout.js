import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"

const FormAbout = () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [changes, setChanges] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [maps, setMaps] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("");
    const [newProvince, setNewProvince] = useState({});
    const [newCity, setNewCity] = useState({});
    const [province_code, setProvince_code] = useState("");
    const [city_code, setCity_code] = useState("");
    const [postal_code, setPostal_code] = useState("");


    useEffect(()=> {
        try{
            fetch('http://localhost:8000/about', {
                method: "GET",
                    headers: {
                        'Content-Type': 'Application/JSON',
                        'authorization': userToken
                    }
            })
            .then(res => res.json())
            .then(result => {
                setName(result.data.name)
                setEmail(result.data.email)
                setPhone(result.data.phone)
                setDescription(result.data.description)
                setMaps(result.data.maps)
                setAddress(result.data.address)
                setProvince(result.data.province)
                setCity(result.data.city)
                setProvince_code(result.data.province_code)
                setCity_code(result.data.city_code)
                setPostal_code(result.data.postal_code)
            })

            fetch('http://localhost:8000/province')
            .then(res => res.json())
            .then(response => {
                setProvinceList(response.rajaongkir.results)
            })

        } catch(err) {
            console.log(err);
        }
        
    }, [base_url, userToken, changes])

    useEffect(()=> {
        fetch(`http://localhost:8000/city?province=${newProvince.province_id}`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userToken
                }
        })
        .then(res => res.json())
        .then(response => {
            setCityList(response.rajaongkir.results)
        }).catch(err => {
            console.log(err);
        })
    }, [base_url, userToken, newProvince])

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            name,
            phone,
            description,
            maps,
            address,
            province: province,
            city: city,
            postal_code,
            province_code: province_code,
            city_code: city_code
        }
        if(!!newCity.province){
            body = {
                name,
                email,
                phone,
                description,
                maps,
                address,
                province: newCity.province,
                city: newCity.city_name,
                postal_code,
                province_code: newCity.province_id,
                city_code: newCity.city_id
            }
        }

        fetch('http://localhost:8000/admin/v1/about', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(response => {
            alert("Updated Successfully")
            setChanges(current => current + 1)
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="h-screen w-full flex flex-col">
            <NavbarLayout/>
            <div className="md:flex bg-orange-50">
                <SidebarLayout/>
                <div className="w-full">
                    <p className="font-bold md:text-2xl text-lg text-center pt-2 mb-6 ">Form About</p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data"  className="flex-grow my-4 mx-3 md:ml-5 min-h-screen flex flex-col gap-3">
                        <label className="text-gray-700 ml-2">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" type="text" value={name} placeholder="Name..." />
                        <label className="text-gray-700 ml-2">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" type="text" value={email} placeholder="Email..." />
                        <label className="text-gray-700 ml-2">Phone</label>
                        <input onChange={(e) => setPhone(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" type="text" value={phone} pattern="[0-9]+" placeholder="Phone..." />
                        <label className="text-gray-700 ml-2">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" value={description} placeholder="Descriptions..."></textarea>
                        <label className="text-gray-700 ml-2">Maps (Embed)</label>
                        <textarea onChange={(e) => setMaps(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" value={maps} placeholder="Maps..."></textarea>
                        <label className="text-gray-700 ml-2 mt-3">Province</label>
                        <p className="pl-2">(Current Province: <span className="font-bold">{province}</span>)</p>
                        <select onChange={(e)=>setNewProvince(JSON.parse(e.target.value))} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" required>
                            <option key="-1" value={JSON.stringify({})} disabled hidden>-</option>
                            {provinceList.map(item =>(<option key={item.province_id} value={JSON.stringify(item)}>{item.province}</option>))}
                        </select>
                        <label className="text-gray-700 ml-2 mt-3">City</label>
                        <p className="pl-2">(Current City: <span className="font-bold">{city}</span>)</p>
                        <select onChange={(e)=>{
                            setPostal_code('')
                            setNewCity(JSON.parse(e.target.value))
                        }} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" required>
                            <option key="-1" value={JSON.stringify({})} disabled hidden>-</option>
                            {cityList.map(item => (<option key={item.city_id} value={JSON.stringify(item)}>{item.city_name}</option>))}
                        </select>
                        <label className="text-gray-700 ml-2">Address</label>
                        <input onChange={(e) => setAddress(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" type="text" value={address} placeholder="Address..." />
                        <label className="text-gray-700 ml-2">Postal Code</label>
                        <input onChange={(e) => setPostal_code(e.target.value)} className="border-2 h-12 rounded-md pl-2 lg:w-1/2" type="text" pattern="[0-9]+" value={postal_code} placeholder="Postal Code..." required/>
                        
                        <div className=" mt-4">
                            <button type="submit" className="btn bg-orange-200 py-3 self-center w-full lg:w-40 rounded-md font-bold border border-slate-400 hover:bg-orange-300">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default FormAbout