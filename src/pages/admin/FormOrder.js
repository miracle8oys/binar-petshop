import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"


const FormOrder = () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    let i = 1;
    const {id} = useParams()
    const navigate = useNavigate();
    const userData = useSelector(state => state.loginReducer);
    const [errMsg, setErrMsg] = useState({});
    const statusList = [
        "PENDING",
        "PROCESS",
        "DELIVERY",
        "DELIVERED",
        "CANCEL",
        "FINISH",
    ];
    // const [selectStatus, setSelectStatus] = useState("")

    const [shipping_costs, setShipping_cost] = useState(0);
    const [grand_total, setGrand_total] = useState(0);
    const [grand_weight, setGrand_weight] = useState(0);
    const [resi, setResi] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch(`${base_url}/admin/v1/order/${id}`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setShipping_cost(result.data.shipping_costs)
            setGrand_total(result.data.grand_total)
            setGrand_weight(result.data.grand_weight)
            setResi(result.data.resi)
            setStatus(result.data.status)
            setCreatedAt(result.data.createdAt)
            setName(result.data.address.name)
            setPhone(result.data.address.phone)
            setProvince(result.data.address.province)
            setCity(result.data.address.city)
            setPostal_code(result.data.address.postal_code)
            setAddress(result.data.address.address)
            setProducts(result.data.order_product)
        })
    }, [base_url, userData, id])

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            resi: resi,
            status: status
        }

        fetch(`${base_url}/admin/v1/order/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken 
            },
            body: JSON.stringify(body)
        })
        .then(() => {
            navigate("/admin/orders")
        }).catch(err => {
            console.log(err);
            setErrMsg(err);
        })
        
    }
    return (
        <div>
            <NavbarLayout/>
            <div className="md:flex bg-orange-50">
                <SidebarLayout />
                <div className="grid justify-center h-max min-h-screen w-full py-10">
                    <div className="h-fit w-full md:w-[70vw] border border-slate-400 px-3 md:px-5 pt-4 shadow-2xl">
                        <h1 className="text-center text-2xl font-semibold">ORDER DETAILS</h1>
                        {Object.keys(errMsg).length !== 0 && <h1 className="bg-slate-200 mt-3 mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg.message}</h1>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-8 gap-3 md:gap-3">
                            <label className="text-gray-700 ml-2">Resi</label>
                            <input onChange={(e) => setResi(e.target.value)} value={resi} className="border border-slate-400 h-12 rounded-md pl-2" placeholder="Resi..."/>
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
                            <label className="text-gray-700 ml-2">Shipping Cost</label>
                            <input value={shipping_costs} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Grand Weight</label>
                            <input value={grand_weight} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Grand Total</label>
                            <input value={grand_total} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            <label className="text-gray-700 ml-2">Status</label>
                            <select onChange={(e) =>{setStatus(e.target.value)}} value={status} className="border border-slate-400 h-12 rounded-md">
                                {statusList.map((stat, index) => (<option key={index} value={stat}>{stat}</option>))}
                            </select>
                            <label className="text-gray-700 ml-2">Created At</label>
                            <input value={createdAt} className="border border-slate-400 h-12 rounded-md pl-2" readOnly disabled/>
                            
                            <label className="text-gray-700 ml-2">Product List</label>
                            <div className="overflow-x-auto">
                                <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md text-sm lg:text-base">
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
                                        {products?.length !== 0 && products?.map((item, index) => 
                                        <tr key={index} className="">
                                            <td className="text-center px-2">{i++}.</td>
                                            <td className="text-center px-2 font-semibold">{item.product.name}</td>
                                            <td className="flex justify-center py-4 w-24 sm:w-auto">
                                                <img src={item.product.img} alt={item.product.name} className="w-24 h-28"/>
                                            </td>
                                            <td className="text-center px-2">{item.product.weight}</td>
                                            <td className="text-center px-2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.product.price)}</td>
                                            <td className="text-center px-2">{item.qty}</td>
                                            <td className="text-center px-2">{item.sub_weight}</td>
                                            <td className="text-center px-2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.sub_total)}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="btn bg-orange-200 py-3 self-center w-full md:w-40 rounded-md font-bold border border-slate-400 hover:bg-orange-300">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default FormOrder;