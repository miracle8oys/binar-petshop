import NavbarLayout from '../components/Navbar'
import FooterLayout from "../components/Footer";
import {ListProducts} from '../components/ListProducts'
import { useState, useEffect } from 'react';
import { Transition } from '@tailwindui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = ({user}) =>{

    const [DropdownToggle, setDropDown] = useState(false);
    const [products, setProduct] = useState([]);
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const {name} = useParams();    
    const navigate = useNavigate();
    
    useEffect(() => {
        const base_url = process.env.REACT_APP_BASE_URL;
        fetch(`${base_url}/products?title=${keyword}&tags=${name}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            setProduct(result.data)
        }, []);
        fetch(`${base_url}/admin/v1/tags`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            setTags(result.data)
        }, []);
    }, [name, keyword])

    const handleClickCategory = (name)=>{
        if(name === " "){
            navigate(`/catalog`)
        }else{
            navigate(`/products/tags=${name}`)
        }
       
    }

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };
  
    return (
        <div className='h-screen w-full mx-auto'>
            <NavbarLayout user={user}/>
                <div className='md:mx-8 mx-4 mt-8 grid md:grid-cols-12 items-center'>
                    <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className=' py-2 px-6 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200 hover:text-orange-800 focus:text-orange-800 active:text-orange-800 rounded-md md:text-base text-sm border'>Kategori</button>
                        <Transition
                            show={DropdownToggle}
                            enter="transition-opacity duration-700"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                        <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                            <ul className="text-gray-800 m-2 md:pb-1">
                                {tags.map(item => (
                                    <li key={item.id} className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button onClick={() => handleClickCategory(item.name)} type='button' className='py-2 px-2 rounded-md'>{item.name}</button></li>
                                ))}
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button onClick={() => navigate('/catalog')} type='button' className='py-2 px-2 rounded-md'>All Product</button></li>
                            </ul>
                        </div>
                        </Transition>
                    </div>
                    <div className='col-start-2 col-end-12'>
                        <div className='col-start-2 col-end-12 md:ml-8'>
                            <div className='flex ml-4'>
                                <input onChange={handleChange} className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-full py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="search" name="search"/>
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
                </div>
                
                
                <div className= 'container mb-5 z-0 py-10'>
                    <div className='md:mx-8 mx-4 px-3'>
                        <h5 className="font-medium md:text-lg font-display my-4">Products</h5>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        { products.length !== 0 && products.map(item => (
                            <Link to={'/'} key={item.id}>
                                 <div  className="md:w-56 w-36 shadow border-solid border rounded bg-orange-50">
                                    <ListProducts prod={item}/>
                                </div> 
                            </Link>
                        ))}
                        </div>
                    </div>

                    {/* <div className='flex justify-center items-center my-5'>
                        <button type='button' name='load' className='text-sm md:text-base md:p-3 p-2 w-20 font-medium rounded-md bg-slate-200'>More</button>
                    </div> */}
                </div>

                <FooterLayout/>

        </div>
    )
}

export default CategoryProduct;