import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoPet from '../assets/LogoPet.png'
import {FaUserAlt} from "react-icons/fa"
import {BsCart3} from "react-icons/bs"
import {AiFillWechat} from "react-icons/ai"

const NavbarLayout = () =>{
    const [navbarToggle, setNavbarToggle] = React.useState(false);
    
    return(
        <div className='bg-orange-50 md:font-display md:text-yellow-800 border-b-[1.5px]'>
            <div className="md:container mx-auto md:h-16 hidden md:block">
                <div className='flex justify-between'>
                    <div className='flex md:gap-8'>
                        <div className='flex justify-center md:ml-8'>
                            <img src={LogoPet} alt='Petshop Logo' className='w-10 md:w-16'/>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>Product</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>Pet Adoption</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>Helps</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>About</NavLink>
                        </div>
                    </div>

                    <div className='flex px-10 gap-8'>
                        <div className='flex justify-center py-5'>
                            <button to="/" className='font-medium hover:font-bold '>Login</button>
                            <button className='text-xl hidden'><FaUserAlt /></button>
                        </div>
                        <div className='flex justify-center py-5'>
                            <button to="/" className='font-medium hover:font-bold'>Register</button>
                            <button className='text-xl hidden'><BsCart3 /></button>
                        </div>
                    
                        <div className='flex justify-center py-4 hidden'>
                            <button className='text-3xl'><AiFillWechat /></button>
                        </div>
                       
                    </div>
                </div>
            </div>


            <div className="md:hidden flex justify-between mx-6">
                <img src={LogoPet} alt='Petshop Logo' className='w-16'/>
               
                <button className="outline-none hover:bg-orange-50" type='button' onClick={()=> setNavbarToggle(!navbarToggle)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className={(navbarToggle ? "flex" : "hidden")}>
                <ul className='mx-8 my-2 text-sm text-stone-900 md:hidden'>
                    <li className='py-1'>
                        <NavLink to="/" className='hover:font-bold font-sans'>Product</NavLink>
                    </li>
                    <li className='py-1'>
                        <NavLink to="/" className='hover:font-bold'>Pet Adoption</NavLink>
                    </li>
                    <li className='py-1'>
                        <NavLink to="/" className='hover:font-bold'>Helps</NavLink>
                    </li>
                    <li className='pt-1 mb-3'>
                        <NavLink to="/" className='hover:font-bold'>About</NavLink>
                    </li >
                    <li className='flex justify-center mx-6 p-2 hover:bg-gray-100 bg-gray-200  rounded-full'>
                        <button to="/" className='font-bold w-48'>Login</button>
                    </li>
                    {/* <li className='flex justify-center mx-6 p-2 bg-slate-200 rounded-full'>
                        <button to="/" className='font-bold'>Register</button>
                    </li> */}
                </ul>
                
            </div>
        </div>
    )
}

export default NavbarLayout;