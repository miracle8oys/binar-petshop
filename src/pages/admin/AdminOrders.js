import { useState,useEffect } from "react";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"
import {BiEdit} from 'react-icons/bi';
import {FiTrash2} from 'react-icons/fi';
import {IoIosArrowDropdown} from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminOrders = () =>{
    const [count, setCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [DropdownToggle, setDropDown] = useState(false);
    const status = [
        "CONFIRMATION",
        "PROCESS",
        "CANCEL",
        "FINISH",
    ];
    // const [selectStatus, setSelectStatus] = useState({})
    const [currentStatus, setCurrentStatus] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const [changes, setChanges] = useState(0);
    // const [statusChanges, setStatusChanges] = useState(0);
    const base_url = process.env.REACT_APP_BASE_URL;
    let i = 1;
    const userData = useSelector(state => state.loginReducer);
    // console.log(userData.user?.accessToken);

    useEffect(() => {
        fetch(`${base_url}/admin/v1/order?name=${keyword}&status=${currentStatus}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result.data)
            setOrders(result.data.orders)
            setCount(result.data.count)
        });
    }, [keyword, userData, currentStatus, base_url, changes])

    const statusChange = (selectStatus) => {
        fetch(`http://localhost:8000/admin/v1/order/${selectStatus.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userData.user?.accessToken
            },
            body: JSON.stringify({
                resi: selectStatus.resi,
                status: selectStatus.status
            })
        }).then(res => res.json())
        .then(response => {
            setChanges(current => current + 1)
            // console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const handleStatusClick = (name) =>{
        if(currentStatus === name){
            setCurrentStatus('')
        }else{
            setCurrentStatus(name)
        } 
    }
    const handleClickAll = () =>{
        setCurrentStatus('');
    }

    const handleDelete = (id) => {

        fetch(`${base_url}/admin/v1/order/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        }).then(() =>{
            setChanges(current => current + 1)
        })

    }

    return (
        <div className="h-screen w-full flex flex-col">
            <NavbarLayout/>
            <div className="flex bg-orange-50">
                <SidebarLayout/>
                <div className="flex-grow my-4 mx-3 min-h-screen py-5">
                    <p className="font-bold md:text-2xl text-lg text-center pt-2 mb-6 ">Order Data</p>
                    <div className='mt-6 flex justify-between items-center mb-4'>
                        <section>
                            <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-300  rounded-md md:text-base font-bold text-sm border border-slate-400'>Category <IoIosArrowDropdown className="inline"/></button>
                            <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                <ul className="text-gray-800 m-2 md:pb-1">
                                    <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleClickAll()}>All Category</button></li>
                                    {status.map((item, index)=>(
                                        <li key={index}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleStatusClick(item)}>{item}</button></li>
                                        ))}
                                </ul>
                            </div>
                        </section>
                        <div className='basis-1/2'>
                            <div className='col-end-12'>
                                <div className='flex'>
                                    <input onChange={handleChange} className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-400 rounded-full py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="search" name="search"/>
                                    <button className="flex items-center justify-center px-4 border-l -ml-14 hover:bg-gray-100 rounded-full ">
                                        <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="basis-24">
                            {/* <button type="button" onClick={() => navigate('/admin/order/add')} className="bg-orange-200 p-3 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400">New Order</button> */}
                        </div>
                    </div>
                    <p className="font-bold mb-4">Total Data : {count}</p>
                    <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md">
                        <thead className="bg-orange-50">
                            <tr className="">
                                <th className="py-4 text-center">No.</th>
                                <th className="py-4 text-center">Name</th>
                                <th className="py-4 text-center">Weight</th>
                                <th className="py-4 text-center">Shipping Cost</th>
                                <th className="py-4 text-center">Total</th>
                                <th className="py-4 text-center">Delivery</th>
                                <th className="py-4 text-center">Resi</th>
                                <th className="py-4 text-center">Status</th>
                                <th className="py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-400">
                            {orders?.map((item) => { 
                            return (
                            <tr key={item.id} className="">
                                <td className="text-center">{i++}.</td>
                                <td className="text-center font-semibold">{item.address?.name}</td>
                                <td className="text-center">{item.grand_weight}</td>
                                <td className="text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.shipping_costs)}</td>
                                <td className="text-center">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.grand_total)}</td>
                                <td className="text-center">{item.address.address}</td>
                                <td className="text-center">{item.resi}</td>
                                <td className="text-center">
                                    <select onChange={(e) =>{statusChange(JSON.parse(e.target.value))}} value={JSON.stringify({id: item.id, status: item.status})} className="border border-slate-400 h-8 rounded-md ">
                                        {status.map((stat, index) => (<option key={index} value={JSON.stringify({id: item.id, status: stat})}>{stat}</option>))}
                                    </select>
                                </td>
                                <td>
                                    <div className="flex justify-center mb-2">
                                        <button onClick={() => navigate(`/admin/order/update/${item.id}`)} type="button" name="update" className="py-2 font-bold w-32 bg-yellow-200 hover:bg-yellow-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300"><BiEdit className="mr-3"/>Update</button>
                                    </div>
                                    <div className="flex justify-center">
                                        <button onClick={() => handleDelete(item.id)} name="delete" className="py-2 font-bold w-32  bg-red-200 hover:bg-red-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300" type="button"><FiTrash2 className="mr-3"/>Delete</button>
                                    </div>
                                </td>
                            </tr>)}
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default AdminOrders;