import { useState, useLayoutEffect, useEffect } from "react";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import {BiEdit} from 'react-icons/bi';
import {FiTrash2} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminProduct = ({user}) =>{
    const [product, setProduct] = useState([]);
    const [DropdownToggle, setDropDown] = useState(false);
    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    let i = 1;
    const userData = useSelector(state => state.loginReducer);
    // console.log(userData.user?.accessToken);

    useLayoutEffect(() => {
        if(userData.user?.accessToken){
            fetch(`${base_url}/admin/v1/products?title=${keyword}&tags=${currentTags}`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result.data)
                setProduct(result.data)
            });
        }
        console.log(product.products)
    }, [keyword, currentTags, base_url, userData])

    useEffect(() => {
        fetch(`${base_url}/admin/v1/tags`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                }
            })
            .then(res => res.json())
            .then(result => {
                setTags(result.data)
            });
        
    }, [base_url])

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const handleTagClick = (name) =>{
        if(currentTags === name){
            setCurrentTags('')
        }else{
            setCurrentTags(name)
        } 
    }

    // console.log(product.products)
    // product.products.map((item) => (
    //     console.log(item.product_id.id)
    // ))

    return (
        <div className="h-screen w-full flex flex-col">
            <NavbarLayout user={user}/>
            <div className="flex-grow my-4 md:mx-20 mx-4">
                <p className="font-bold md:text-2xl text-lg text-center pt-2 mb-6 ">Data Produk</p>
                <div className='mt-6 grid md:grid-flow-cols items-center mb-4'>
                    <section>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2  hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 hover:text-orange-800 focus:text-orange-800 active:text-orange-800 rounded-md md:text-base text-sm border'>Kategori</button>
                        <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                            <ul className="text-gray-800 m-2 md:pb-1">
                            {tags.map(item =>(
                                <li key={item.id}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleTagClick(item.name)}>{item.name}</button></li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <div className='col-start-2 col-end-5'>
                        <div className='col-end-12'>
                            <div className='flex'>
                                <input onChange={handleChange} className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-full py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="search" name="search"/>
                                <button className="flex items-center justify-center px-4 border-l -ml-10 hover:bg-gray-100 rounded-full ">
                                    <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-start-10 col-start-1 col-end-12 mt-3">
                        <button type="button" onClick={() => navigate('/admin/product/add')} className="bg-green-200 p-3 hover:bg-green-300 rounded-lg font-bold text-sm">New Product</button>
                    </div>
                </div>
                <table className="table-auto border-collapse border border-gray-200 min-w-full shadow-md">
                    <thead className="bg-orange-50">
                        <tr className="border-b-[1px]">
                            <th className="py-4 text-center">No.</th>
                            <th className="py-4 text-center">Nama Produk</th>
                            <th className="py-4 text-center">Gambar</th>
                            <th className="py-4 text-center">Harga</th>
                            <th className="py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.products?.length !== 0 && product.products?.map((item) => 
                        <tr key={item.product_id?.id} className="border border-collapse">
                            <td className="text-center">{i++}.</td>
                            <td className="text-center font-semibold">{item.product_id?.name}</td>
                            <td className="flex justify-center py-4">
                                <img src={item.product_id?.img} alt={item.product_id?.name} className="w-24 h-28"/>
                            </td>
                            <td className="text-center">Rp. {item.product_id?.price}</td>
                            <td>
                                <div className="flex justify-center mb-2">
                                    <button type="button" name="update" className="py-2 font-bold w-32  bg-yellow-100 hover:bg-yellow-200 rounded-lg inline-flex items-center justify-center text-sm"><BiEdit className="mr-3"/>Update</button>
                                </div>
                                <div className="flex justify-center">
                                    <button type="button" name="update" className="py-2 font-bold w-32  bg-red-100 hover:bg-red-200 rounded-lg inline-flex items-center justify-center text-sm"><FiTrash2 className="mr-3"/>Delete</button>
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <FooterLayout/>
        </div>
    )
}

export default AdminProduct;