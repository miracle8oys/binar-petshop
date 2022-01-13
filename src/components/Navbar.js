import React from 'react';
import { Link } from 'react-router-dom';
import LogoPet from '../assets/LogoPet.png'
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
                            <Link to="/" className='font-semibold hover:text-orange-700'>Product</Link>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <Link to="/" className='font-semibold hover:text-orange-700'>Pet Adoption</Link>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <Link to="/" className='font-semibold hover:text-orange-700'>Helps</Link>
                        </div>
                        <div className='flex justify-center py-5 md:text-base'>
                            <Link to="/" className='font-semibold hover:text-orange-700'>About</Link>
                        </div>
                    </div>

                    <div className='flex px-10 gap-10'>
                        <div className='flex justify-center py-5'>
                                <button to="/" className='font-medium hover:font-bold '>Login</button>
                            </div>
                            <div className='flex justify-center py-5'>
                                <button to="/" className='font-medium hover:font-bold'>Register</button>
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

            <div className={(navbarToggle ? "flex transform relative transition-all duration-1000 ease-in-out" : "hidden")}>
                <ul className='mx-8 my-2 text-sm text-stone-900 md:hidden'>
                    <li className='py-1'>
                        <Link to="/" className='hover:font-bold font-sans'>Product</Link>
                    </li>
                    <li className='py-1'>
                        <Link to="/" className='hover:font-bold'>Pet Adoption</Link>
                    </li>
                    <li className='py-1'>
                        <Link to="/" className='hover:font-bold'>Helps</Link>
                    </li>
                    <li className='pt-1 mb-3'>
                        <Link to="/" className='hover:font-bold'>About</Link>
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