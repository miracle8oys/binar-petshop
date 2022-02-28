import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/newlogo.png'
import {BsCart3} from "react-icons/bs"
import {AiFillWechat} from "react-icons/ai"
import {AiOutlineLogout} from "react-icons/ai"
import { Transition } from '@tailwindui/react';
import { useSelector } from 'react-redux';
import {GiHamburgerMenu} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import '../assets/style.css'

const NavbarLayout = () =>{
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [DropdownToggle, setDropDown] = useState(false)
    const userData = useSelector(state => state.loginReducer.user);
    console.log(userData?.accessToken);
    return(
        <>
            <nav className="bg-orange-300 bg-opacity-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
                    <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* <!-- Mobile menu button--> */}
                                <button onClick={() =>setDropDown(!DropdownToggle)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-orange-800 hover:bg-orange-100 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <GiHamburgerMenu/>
                                </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center my-auto p-1 rounded-full ring-orange-300 ring-2">
                                <img className="block lg:hidden h-8 w-auto" src={Logo} alt="Workflow"/>
                                <img className="hidden lg:block h-8 w-auto" src={Logo} alt="Logo"/>
                            </div>
                            <div className="hidden sm:block sm:ml-6 my-auto">
                                <div className="flex space-x-4">
                                    <NavLink to={'/'}  className="bg-orange-100 text-orange-800 px-3 py-2 rounded-md text-sm font-bold" aria-current="page">Home</NavLink>

                                    <NavLink to={'/catalog'} className="hover:bg-orange-100 text-orange-800 px-3 py-2 rounded-md text-sm font-bold">Products</NavLink>

                                    <NavLink to={'/adopt'} className="text-orange-800 hover:bg-orange-100 px-3 py-2 rounded-md text-sm font-bold">Pet Adoptions</NavLink>

                                    <NavLink to={'/help'} className="text-orange-800  hover:bg-orange-100 px-3 py-2 rounded-md text-sm font-bold">Help</NavLink>

                                    <NavLink to={'/about'} className="text-orange-800 hover:bg-orange-100 px-3 py-2 rounded-md text-sm font-bold">About Us</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" className="p-1 rounded-full text-orange-800 hover:text-orange-800 hover:bg-orange-100">
                                <span className="sr-only">Chat</span>
                                <NavLink to="/chat" className='text-4xl'><AiFillWechat /></NavLink>
                            </button>

                            {/* <!-- Profile dropdown --> */}
                            <div className={(!!userData?.accessToken ? 'ml-3 relative' : "hidden")}>
                                <div>
                                    <button onClick={() =>setNavbarToggle(!navbarToggle)} type="button" className="bg-orange-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <img className='rounded-full w-8 h-8' src={userData?.photoURL} alt="profile" referrerPolicy="no-referrer" />
                                    </button>
                                </div>

                                <Transition
                                    show={navbarToggle}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">

                                    <div className={(navbarToggle ? "origin-top-right absolute right-0 mt-3 md:mt-2 w-48 rounded-md shadow-lg py-1 bg-orange-50 ring-1 ring-black ring-opacity-5 focus:outline-none  z-30" : 'hidden')} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                         {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                        <NavLink to={'/profile'} className="block px-4 py-2 text-sm text-stone-500 flex hover:bg-gray-50 hover:text-orange-700 " role="menuitem" tabIndex="-1" id="user-menu-item-0"><CgProfile className='mr-2 text-xl'/>My Profile</NavLink>
                                        <NavLink to={'/cart'} className="block px-4 py-2 text-sm text-stone-500 flex hover:bg-gray-50 hover:text-orange-700 border-b-2" role="menuitem" tabIndex="-1" id="user-menu-item-1"><BsCart3 className='mr-2 text-xl' />Cart</NavLink>
                                        <NavLink to={'/logout'} className="block px-4 py-2 text-sm text-stone-500 flex hover:bg-gray-50 hover:text-orange-700" role="menuitem" tabIndex="-1" id="user-menu-item-2"><AiOutlineLogout className='mr-2 text-xl'/>Sign out</NavLink>
                                    </div>
                                </Transition>
                            </div>
                            
                            <div className={(!!userData?.accessToken ? 'hidden' : "ml-3 relative")}>
                                <NavLink to={'/login'} className="text-white hover:bg-orange-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                <Transition
                    show={DropdownToggle}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                        <div className={(DropdownToggle ? 'block absolute w-full bg-orange-200  z-20' : "hidden")} id="mobile-menu">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-white hover:bg-gray-700 hover:text-white" --> */}
                                <NavLink to={'/'} className="bg-orange-100 text-orange-800 block px-3 py-2 rounded-md text-base font-bold" aria-current="page">Home</NavLink>

                                <NavLink to={'/catalog'} className="hover:bg-orange-100 text-orange-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Products</NavLink>

                                <NavLink to={'/adoption'} className="hover:bg-orange-100 text-orange-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Pet Adoptions</NavLink>

                                <NavLink to={'/help'} className="hover:bg-orange-100 text-orange-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Help</NavLink>
                                
                                <NavLink to={'/about'} className="hover:bg-orange-100 text-orange-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold">About Us</NavLink>
                            </div>
                        </div>
                </Transition>
            </nav>
        </>   
    )
}

export default NavbarLayout;