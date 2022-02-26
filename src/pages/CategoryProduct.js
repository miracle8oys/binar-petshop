import NavbarLayout from '../components/Navbar'
import FooterLayout from "../components/Footer";
import {ListProducts} from '../components/ListProducts'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from '@tailwindui/react';
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {IoIosArrowDropdown} from 'react-icons/io'

const CategoryProduct = ({user}) =>{

    const [DropdownToggle, setDropDown] = useState(false);
    const [product, setProduct] = useState([]);
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const {name} = useParams(); 
    const [page, setPage] = useState(1);
    const limit = 10;   
    const navigate = useNavigate();
    const [endIndex, setEndIndex] = useState(0);
    // const [count, setCount] = useState(0);
    const base_url = process.env.REACT_APP_BASE_URL;
    const userData = useSelector(state => state.loginReducer);
    
    
    // useEffect(() => {
    //     fetch(`${base_url}/products?title=${keyword}&tags=${name}`, 
    //     {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'Application/JSON'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(result => {
    //         console.log(result.data)
    //         setProduct(result.data)
    //     });
    // }, [name, keyword, base_url])
    useEffect(() => {
        fetch(`${base_url}/products?title=${keyword}&tags=${name}&limit=${limit}&page=${page}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result.data.products)
            setProduct(result.data.products)
            setEndIndex(result.endIndex);
        });
    }, [base_url, userData, page, keyword,name]);

    useEffect(() => {
        fetch(`${base_url}/tags`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            setTags(result.data)
        });
    }, [base_url]);

    const handleTagClick = (name)=>{
        setPage(1);
        if(name === " "){
            navigate(`/catalog`)
        }else{
            navigate(`/products/tags=${name}`)
        }
       
    }
    const handleClickAll = () =>{
        navigate(`/catalog`)
    }

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const capitalizeLetter = (tags) => {
        let word = tags.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    // const newEndIndex = () =>{
    //     console.log(count);
    //     if(count >= 5){
    //         endIndex =1
    //     }else{
    //         endIndex = endIndex+1
    //     }

    // }
    console.log(page)
    console.log(endIndex)

 
  
    return (
        <div className='flex flex-col min-h-screen w-full '>
            <NavbarLayout user={user}/>
            <div className='flex container lg:min-w-full px-8  my-5 gap-4 '>
                        <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='shadow items-center gap-2 py-2 px-4 font-semibold hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 hover:text-orange-800 focus:text-orange-800 active:text-orange-800 rounded-md md:text-base text-sm border flex'> Kategori <IoIosArrowDropdown/></button>
                            <Transition
                                show={DropdownToggle}
                                enter="transition-opacity duration-700"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                            <div className={(DropdownToggle ? "absolute translate-y-1 shadow px-2 w-max  md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                <ul className="text-gray-800 m-2 md:pb-1">
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button onClick={() => handleClickAll() } type='button' className='py-2 px-2 rounded-md'>All Product</button></li>
                                    {tags.map(item => (
                                        <li key={item.id} className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button onClick={() => handleTagClick(item.name)} type='button' className='py-2 px-2 rounded-md'>{capitalizeLetter(item.name)}</button></li>
                                    ))}
                                   
                                </ul>
                            </div>
                            </Transition>
                            </div>
                     
                            <div className='flex w-full shadow'>
                                <input onChange={handleChange} className="w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="text" name="search"/>
                                <button className="flex items-center justify-center md:-ml-12 -ml-8 ">
                                    <BsSearch/>
                                </button>
                            </div>
                      
                    </div>
                    {product?.length === 0 && 
                        <h5 className="font-bold text-xl px-8 font-display py-20 text-center">Produk Tidak Ditemukan</h5> 
                    }
                    <div className= 'w-full lg:min-w-full mb-5 flex flex-wrap flex-grow'>
                        {product?.length !== 0 &&  <h5 className="font-bold md:text-xl font-display mt-4 mb-6 px-8">Products</h5>}
                        <div className='mx-auto'>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
                                { product?.length !== 0 && product?.map((item, i) => (
                                    <div key={i} className="lg:w-56 md:48  w-36 shadow-lg border-solid border rounded-xl mb-4">
                                        <Link to={`/product/${item.product_id?.id}`} >
                                            <ListProducts key={i} prod={item}/>
                                        </Link>
                                    </div>
                                ))}
                                </div>
                        </div>
                            
                    </div>
                        

                    <div className="flex gap-5 justify-center mb-6">
                        {page > 1 && 
                            <button onClick={() => setPage(current => current - 1)} type="button" className="bg-sky-50 hover:bg-sky-100 hover:font-medium border border-1 rounded-md p-2 shadow">Previous Page</button>
                        }
                        {
                        endIndex > 0 &&
                            <button onClick={() => setPage(current => current + 1)} type="button" className="bg-sky-50 hover:bg-sky-100 hover:font-medium border border-1 rounded-md p-2 shadow">Next Page</button>
                        }
                    </div>

                <FooterLayout/>
            
        </div>
    )
}

export default CategoryProduct;