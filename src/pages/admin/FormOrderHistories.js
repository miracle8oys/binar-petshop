import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"


const FormOrderHistories = () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    let i = 1;
    const {id} = useParams()
    const userData = useSelector(state => state.loginReducer);
    const [grand_total, setGrand_total] = useState(0);
    const [grand_weight, setGrand_weight] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch(`${base_url}/admin/v1/histories/${id}`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setName(result.data.user_name)
            setPhone(result.data.user_phone)
            setProvince(result.data.user_province)
            setCity(result.data.user_city)
            setPostal_code(result.data.user_postal_code)
            setAddress(result.data.user_address)
            setGrand_weight(result.data.grand_weight)
            setGrand_total(result.data.grand_total)
            setCreatedAt(result.data.createdAt)
            setProducts(result.data.products)
        })
    }, [base_url, userData, id])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <NavbarLayout/>
            <div className="flex bg-orange-50">
                <SidebarLayout />
                <div className="grid justify-center h-max min-h-screen w-full py-10">
                    <div className="h-fit w-[70vw] md:w-[70vw] border border-slate-400 px-5 pt-4 shadow-2xl">
                        <h1 className="text-center text-2xl font-semibold">ORDER DETAILS</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-8 gap-3 md:gap-3">
                            <label className="text-gray-700 ml-2">Name</label>
                            <input value={name} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Phone</label>
                            <input value={phone} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Province</label>
                            <input value={province} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">City</label>
                            <input value={city} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Postal Code</label>
                            <input value={postal_code} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Address</label>
                            <input value={address} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Grand Weight</label>
                            <input value={grand_weight} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Grand Total</label>
                            <input value={grand_total} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Created At</label>
                            <input value={createdAt} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            
                            <label className="text-gray-700 ml-2">Product List</label>
                            <div>
                                <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md">
                                    <thead className="bg-orange-50">
                                        <tr className="">
                                            <th className="py-4 text-center">No.</th>
                                            <th className="py-4 text-center">Name</th>
                                            <th className="py-4 text-center">Image</th>
                                            <th className="py-4 text-center">Weight</th>
                                            <th className="py-4 text-center">Price</th>
                                            <th className="py-4 text-center">Quantity</th>
                                            <th className="py-4 text-center">Sub Weight</th>
                                            <th className="py-4 text-center">Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-400">
                                        {products?.length !== 0 && products?.map((item) => 
                                        <tr key={item.id} className="">
                                            <td className="text-center">{i++}.</td>
                                            <td className="text-center font-semibold">{item.product_name}</td>
                                            <td className="flex justify-center py-4">
                                                <img src={item.product_img} alt={item.product_name} className="w-24 h-28"/>
                                            </td>
                                            <td className="text-center">{item.product_weight}</td>
                                            <td className="text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.product_price)}</td>
                                            <td className="text-center">{item.qty}</td>
                                            <td className="text-center">{item.sub_weight}</td>
                                            <td className="text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.sub_total)}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default FormOrderHistories;