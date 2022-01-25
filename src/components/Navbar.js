import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoPet from '../assets/LogoPet.png'
import {BsCart3} from "react-icons/bs"
import {AiFillWechat} from "react-icons/ai"
import {AiOutlineLogout} from "react-icons/ai"
import { Transition } from '@tailwindui/react';

const NavbarLayout = ({user}) =>{
    const [navbarToggle, setNavbarToggle] = React.useState(false);
    return(
        <div className='bg-orange-50 md:font-display md:text-yellow-800 border-b-[1.5px]'>
            <div className="md:container mx-auto md:h-16 hidden md:block">
                <div className='flex justify-between'>
                    <div className='flex md:gap-8'>
                        <div className='flex justify-center md:ml-8'>
                           <NavLink to='/'> <img src={LogoPet} alt='Petshop Logo' className='w-10 md:w-16'/> </NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/catalog" className='font-semibold hover:text-orange-700'>Product</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/adopt" className='font-semibold hover:text-orange-700'>Pet Adoption</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>Helps</NavLink>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <NavLink to="/" className='font-semibold hover:text-orange-700'>About</NavLink>
                        </div>
                    </div>

                    <div className='flex px-10 gap-8 items-center'>
                        <div className={user ? 'hidden' : 'flex justify-center py-5 gap-8'}>
                            <NavLink to="/login" className='font-medium hover:font-bold'>Login</NavLink>
                        </div>
                        {
                            user && 
                            <img className='rounded-full w-12 h-12' src={user?.photoURL} alt="navbar-profile" referrerPolicy="no-referrer" />
                        }
                        <div className={user ? 'flex justify-center py-5 gap-8' : 'hidden'}>
                            <NavLink to='/' className='text-xl'><BsCart3 /></NavLink>
                        </div>
                    
                        <div className= {user ? 'flex justify-center py-4 gap-8' : ' hidden'}>
                            <button className='text-3xl'><AiFillWechat /></button>
                            <NavLink to="/settings" className='text-3xl'><AiOutlineLogout /></NavLink>
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

            <Transition
                    show={navbarToggle}
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity delay-700"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
            <div className={(navbarToggle ? "absolute flex bg-orange-50 border-b-[1.4px] w-full" : "hidden")}>
                
                <ul className='ml-8 my-2 text-stone-900 md:hidden font-medium'>
                    <li className='py-1  hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2'>
                        <NavLink to="/" className='hover:font-bold '>Product</NavLink>
                    </li>
                    <li className='py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2'>
                        <NavLink to="/" className='hover:font-bold'>Pet Adoption</NavLink>
                    </li>
                    <li className='py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2'>
                        <NavLink to="/" className='hover:font-bold'>Helps</NavLink>
                    </li>
                    <li className='hover:bg-gray-200 rounded-md  font-sans hover:py-2 pt-1 mb-5 px-2'>
                        <NavLink to="/" className='hover:font-bold'>About</NavLink>
                    </li >
                    <li className={user ? "hidden" : 'flex justify-center mx-6 p-2 bg-gray-200 mb-4 rounded-full'}>
                        <NavLink to="/login" className='font-bold w-48 text-center'>Login</NavLink>
                    </li>
                    <li className={user ? 'py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2' : "hidden"}>
                        {/* <button className='font-bold w-48'><FaUserAlt /></button> */}
                        {user && 
                            <img className='rounded-full w-12' src={user?.photoURL} alt="navbar-profile" referrerPolicy="no-referrer" />
                        }
                    </li>
                    <li className={user ? 'py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2' : "hidden"}>
                        <button className='font-bold w-48'><BsCart3 /></button>
                    </li>
                    <li className={user ? 'py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2' : "hidden"}>
                        <button className='font-bold w-48'><AiFillWechat /></button>
                    </li>
                    <li className={user ? 'py-1 hover:bg-gray-200 rounded-md  font-sans hover:py-2 px-2' : "hidden"}>
                        <NavLink to="/settings" className='font-bold w-48'><AiOutlineLogout /></NavLink>
                    </li>
    
                </ul>
                
            </div>

            </Transition>
        </div>
    )
}

export default NavbarLayout;