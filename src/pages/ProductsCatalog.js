import NavbarLayout from '../components/Navbar'
import FooterLayout from "../components/Footer";
import {AiOutlineSearch} from 'react-icons/ai'
import ListCategories from '../components/ListCategories'
import {ListProducts, BestSellerProducts} from '../components/ListProducts'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ProductsCatalog = () =>{

    const [DropdownToggle, setDropDown] = useState(false);
    return (
        <div className='h-screen w-full mx-auto'>
            <NavbarLayout/>
            <div>
                <div className='md:mx-8 mx-4 mt-8  grid md:grid-cols-12 items-center'>
                    <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='py-2 px-6 hover:bg-gray-100 focus:bg-gray-200 hover:text-orange-800 focus:text-orange-800 rounded-md md:text-base text-sm'>Kategori</button>
                    </div>
                    <div className='col-start-2 col-end-12 ml-10'>
                        <label className="relative block">
                            <span className="absolute inset-y-1 left-0 py-2 pl-2">
                                <span className='text-slate-400'><AiOutlineSearch/></span>
                            </span>
                            <input className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-full py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="text" name="search"/>
                        </label>
                    </div>
                </div>
                <div className={(DropdownToggle ? 'flex shadow w-max mt-1 rounded-md h-fit md:mx-8 border-t-[1px]' : 'hidden')}>
                        <ul className="text-gray-800 m-2">
                            <li className='hover:text-sky-800 hover:bg-gray-100 pb-1 text-xs md:text-base'><button type='button' className='py-1 px-2 rounded-md'>Minuman Cair</button></li>
                        </ul>
                    
                </div>
                
            </div>
                

                <div className={(DropdownToggle ? 'hidden': 'container' )}>
                    <div className='md:mx-8 mt-5  mx-4 bg-gray-50 rounded-md px-3 pt-4 border'>
                        <h5 className="font-medium md:text-lg font-display">Products Category</h5>
                        <ListCategories/>
                    </div>
                </div>
                
                <div className='container my-10'>
                    <div className='md:mx-8 mx-4 px-3'>
                        <h5 className="font-medium md:text-lg font-display my-4">Best Seller</h5>
                        <BestSellerProducts/>
                    </div>
                </div>

                <div className= 'container mb-5'>
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