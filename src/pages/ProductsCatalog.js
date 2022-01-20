import NavbarLayout from '../components/Navbar'
import FooterLayout from "../components/Footer";
import ListCategories from '../components/ListCategories'
import {ListProducts, BestSellerProducts} from '../components/ListProducts'
import { useState, useEffect } from 'react';

const ProductsCatalog = () =>{

    const [DropdownToggle, setDropDown] = useState(false);
    const perPage = 10;
    const [count, setCount] = useState(1)
   
    return (
        <div className='h-screen w-full mx-auto'>
            <NavbarLayout/>
                <div className='md:mx-8 mx-4 mt-8 grid md:grid-cols-12 items-center'>
                    <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='py-2 px-6 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 hover:text-orange-800 focus:text-orange-800 active:text-orange-800 rounded-md md:text-base text-sm border'>Kategori</button>
                        <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60" : "hidden")}>
                            <ul className="text-gray-800 m-2 md:pb-1">
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair</button></li>
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair</button></li>
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair</button></li>
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair</button></li>
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair</button></li>
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md'>Minuman Cair Sedapppp</button></li>
                            </ul>
                    
                        </div>
                    </div>
                    <div className='col-start-2 col-end-12 md:ml-10'>
                        <div className='flex ml-4'>
                            <input className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-full py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="text" name="search"/>
                            <button className="flex items-center justify-center px-4 border-l md:-ml-14 -ml-10 hover:bg-gray-100 rounded-full ">
                                <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className={(DropdownToggle ? 'hidden': 'container' )}>
                    <div className='md:mx-8 mt-5  mx-4 bg-gray-50 rounded-md px-3 pt-4 border'>
                        <h5 className="font-medium md:text-lg font-display">Products Category</h5>
                        <ListCategories/>
                    </div>
                </div>
                
                <div className='container my-10 z-0'>
                    <div className='md:mx-8 mx-4 px-3'>
                        <h5 className="font-medium md:text-lg font-display my-4">Best Seller</h5>
                        <BestSellerProducts/>
                    </div>
                </div>

                <div className= 'container mb-5 z-0'>
                    <div className='md:mx-8 mx-4 px-3'>
                        <h5 className="font-medium md:text-lg font-display my-4">Products</h5>
                        <ListProducts/>
                    </div>

                    <div className='flex justify-center items-center my-5'>
                        <button type='button' name='load' className='text-sm md:text-base md:p-3 p-2 w-20 font-medium rounded-md bg-slate-200'>More</button>
                    </div>
                </div>

                <FooterLayout/>

        </div>
    )
}

export default ProductsCatalog;