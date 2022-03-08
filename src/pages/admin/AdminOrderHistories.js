import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"
import {BiEdit} from 'react-icons/bi';
import {FiTrash2} from 'react-icons/fi';


const AdminOrderHistories = () => {
    const base_url = process.env.REACT_APP_BASE_URL;
    let i = 1;
    const navigate = useNavigate();
    const userData = useSelector(state => state.loginReducer);
    const [count, setCount] = useState(0);
    const [changes, setChanges] = useState(0);
    // const [keyword, setKeyword] = useState('');
    const [orderHistories, setOrderHistories] = useState([])
    const [startDate, setStartDate] = useState(new Date().toString())
    const [endDate, setEndDate] = useState(new Date().toString())

    useEffect(() => {
        fetch(`${base_url}/admin/v1/histories`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setOrderHistories(result.data.orderHistory)
            setCount(result.data.count)
        })
    }, [base_url, userData, changes])

    // const handleChange = (e) =>{
    //     setKeyword(e.target.value)
    // };

    const handleDelete = (id) => {

        fetch(`${base_url}/admin/v1/histories/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        }).then(() =>{
            setChanges(current => current + 1)
        })
    }

    const handleFilter = () => {
        fetch(`${base_url}/admin/v1/histories?startDate=${startDate}&endDate=${endDate}`, {
            method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setOrderHistories(result.data.orderHistory)
            setCount(result.data.count)
        })
        // console.log(new Date().toLocaleDateString())
        // console.log(endDate)
        // setChanges(current => current + 1)
    }

    const handleDeleteByDate = () => {
        fetch(`${base_url}/admin/v1/histories?startDate=${startDate}&endDate=${endDate}`,{
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
            <div className="md:flex bg-orange-50">
                <SidebarLayout/>
                <div className="flex-grow my-4 md:mx-20 mx-4 min-h-screen py-5">
                    <p className="font-bold md:text-2xl text-lg text-center pt-2 mb-6 ">Order History Data</p>
                    {/* <div className='mt-6 md:flex justify-between items-center mb-4'>
                        <section className="basis-24">
                            <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-300  rounded-md md:text-base font-bold text-sm border border-slate-400'>Category</button>
                            <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                <ul className="text-gray-800 m-2 md:pb-1">
                                    <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleClickAll()}>All Product</button></li>
                                    {tags.map(item =>(
                                        <li key={item.id}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleTagClick(item.name)}>{item.name}</button></li>
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
                        <div className="basis-28">
                            <button type="button" onClick={() => navigate('/admin/supplies/add')} className="bg-orange-200 p-3 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400">New Supply</button>
                        </div>
                    </div> */}
                    <div className="mb-4 mt-8 grid sm:block font-bold">
                        <span>Filter Between:</span>
                        <input type="date" onChange={(e)=> setStartDate(e.target.value)}  className="border border-slate-400 bg-orange-50 p-1 sm:mx-2 rounded-lg"/> 
                        <span>And</span>
                        <input type="date" onChange={(e)=> setEndDate(e.target.value)} className="border border-slate-400 bg-orange-50 p-1 sm:ml-2 rounded-lg"/>
                        <button onClick={() => handleFilter()} className="bg-orange-200 p-2 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400 sm:ml-2 my-4 sm:my-0">Filter</button>
                        <button onClick={() => handleDeleteByDate()} className="bg-orange-200 p-2 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400 sm:ml-2">Delete By Date</button>
                    </div>
                    <p className="font-bold mb-4">Total Data : {count}</p>
                    <div className="overflow-x-auto">
                        <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md text-sm lg:text-base">
                            <thead className="bg-orange-50">
                                <tr className="">
                                    <th className="py-4 text-center">No.</th>
                                    <th className="py-4 text-center">Name</th>
                                    <th className="py-4 text-center">Weight</th>
                                    <th className="py-4 text-center">Total</th>
                                    <th className="py-4 text-center">Delivery</th>
                                    <th className="py-4 text-center">Created At</th>
                                    <th className="py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-400">
                                {orderHistories?.length !== 0 && orderHistories?.map((item) => 
                                <tr key={item?.id} className="">
                                    <td className="text-center px-2">{i++}.</td>
                                    <td className="text-center px-2 font-semibold">{item?.user_name}</td>
                                    <td className="text-center px-2 font-semibold">{item?.grand_weight}</td>
                                    <td className="text-center px-2 font-semibold">{item?.grand_total}</td>
                                    <td className="text-center px-2 font-semibold">{item?.user_address}</td>
                                    <td className="text-center px-2">{new Date(item?.createdAt).toLocaleString(['ban', 'id'])}</td>
                                    <td className="py-3 px-2">
                                        <div className="flex justify-center mb-2">
                                            <button onClick={() => navigate(`/admin/histories/${item?.id}`)} type="button" name="update" className="py-2 font-bold w-32 bg-yellow-200 hover:bg-yellow-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300"><BiEdit className="mr-3"/>Show</button>
                                        </div>
                                        <div className="flex justify-center">
                                            <button onClick={() => handleDelete(item?.id)} name="delete" className="py-2 font-bold w-32  bg-red-200 hover:bg-red-400 rounded-lg inline-flex items-center justify-center text-sm border border-slate-300" type="button"><FiTrash2 className="mr-3"/>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default AdminOrderHistories;