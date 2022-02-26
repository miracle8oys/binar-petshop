import NavbarLayout from '../components/Navbar'
import FooterLayout from "../components/Footer";
import {ListProducts, BestSellerProducts} from '../components/ListProducts'
import { useState, useEffect } from 'react';
import { Transition } from '@tailwindui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {BsSearch} from 'react-icons/bs'
import {AiFillTags} from 'react-icons/ai'
import {IoIosArrowDropdown} from 'react-icons/io'


const ProductsCatalog = ({user}) =>{

    const [DropdownToggle, setDropDown] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;
    // const [limit, setLimit] = useState(1);
    const [product, setProduct] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [best_seller, setBestSeller] = useState(0);
    const [bestProduct, setBestProduct] = useState([]);
    const [endIndex, setEndIndex] = useState(0);
    const userData = useSelector(state => state.loginReducer);
    const base_url = process.env.REACT_APP_BASE_URL;
    
    
    useEffect(() => {
        fetch(`${base_url}/products?title=${keyword}&tags=${currentTags}&limit=${limit}&page=${page}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            setProduct(result.data.products)
            setEndIndex(result.endIndex);

        });
    }, [base_url, userData, page, keyword, currentTags]);

    useEffect(() => {
        fetch(`${base_url}/products?title=${keyword}&tags=${currentTags}&best=${best_seller}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            setBestSeller(1)
            setBestProduct(result.data.products);
        });
    }, [base_url, userData, best_seller, keyword, currentTags]);



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
    }, [base_url])

    const handleTagClick = (name) =>{
        setPage(1);
        if(currentTags === name){
            setCurrentTags('')
        }else{
            setCurrentTags(name)
        } 
        console.log(name)
    }
    const handleClickAll = () =>{
        setPage(1);
        setCurrentTags('')
    }

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const capitalizeLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    console.log(page)
    console.log(endIndex)
  
    return (
        <>
            <div className='flex flex-col min-h-screen w-full bg-orange-100 bg-opacity-25 '>
                <NavbarLayout user={user} />
                    <div className='flex container lg:min-w-full px-8  my-5 gap-4 '>
                        <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='shadow items-center gap-2 py-2 px-4 font-semibold hover:bg-orange-50 active:bg-orange-50 focus:bg-orange-50 rounded-md md:text-base text-sm border flex bg-white'> Kategori <IoIosArrowDropdown/></button>
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
                                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1 '><button onClick={() => handleClickAll() } type='button' className='py-2 px-2 rounded-md'>All Product</button></li>
                                    {tags.map(item => (
                                        <li key={item.id} className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1 '><button onClick={() => handleTagClick(item.name)} type='button' className='py-2 px-2 rounded-md'>{capitalizeLetter(item.name)}</button></li>
                                    ))}
                                   
                                </ul>
                            </div>
                            </Transition>
                            </div>
                     
                            <div className='flex w-full shadow'>
                                <input onChange={handleChange} className="w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search product..." type="text" name="search"/>
                                <button className="flex items-center justify-center md:-ml-12 -ml-8  ">
                                    <BsSearch/>
                                </button>
                            </div>
                      
                    </div>
                    
                    <div className={(DropdownToggle ? 'hidden ': 'container lg:min-w-full px-8 mt-5' )}>
                    <Transition
                        show={!DropdownToggle}
                        enter="transition-opacity duration-700"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                            <div>
                                <div className="flex inline font-sans md:gap-6 gap-2 overflow-x-auto scrollbar ">
                                {tags.map(item => (
                                <button key={item.id} onClick={() => handleTagClick(item.name)} className="bg-white shadow text-sm md:text-base flex justify-center py-2  px-3 min-w-max rounded-full border-gray-300 text-slate-700 font-medium border-solid border">
                                    <span  className='rounded-full p-1 mr-2'><AiFillTags/></span>{capitalizeLetter(item.name)}
                                </button>
                                ))}
                                </div>
                            </div>
                        </Transition>
                    </div>

                    {bestProduct.length === 0 && 
                        <h5 className="font-bold text-xl px-8 font-display py-20 text-center">Produk Tidak Ditemukan</h5> 
                    }
                    
                    <div className='container min-w-full py-3 mb-2 flex flex-wrap flex-grow '>
                    {bestProduct.length!== 0  && <h5 className="font-bold md:text-xl font-display pt-4 mb-4 lg:px-8 px-4">Best Seller</h5>}
                        <div className='mx-auto'>
                            <div className={bestProduct.length !== 0 ? "w-max grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-10 bg-white rounded-2xl shadow-md p-4" : 'hidden'}>
                            { bestProduct.length !== 0 && bestProduct.slice(0,5).map((item, i) => (
                                <div key={i} className="lg:w-52 w-36 shadow-lg border-solid border rounded-xl bg-white">
                                    <Link to={`/product/${item.product_id?.id}`} >
                                        <BestSellerProducts  bp={item} />
                                    </Link>
                                </div>
                            ))}
                            </div>
                        </div>
                            
                        
                    </div>
                    
                    <div className= 'w-full lg:min-w-full mb-5 flex flex-wrap flex-grow'>
                        {product?.length !== 0  && <h5 className="font-bold md:text-xl font-display mt-4 mb-6 px-8">Products</h5>}
                        <div className='mx-auto'>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
                                { product?.length !== 0 && product?.map((item, i) => (
                                    <div key={i} className="lg:w-56 md:48  w-36 shadow-lg border-solid border rounded-xl mb-4 bg-white">
                                        <Link to={`/product/${item.product_id?.id}`} >
                                            <ListProducts key={i} prod={item}/>
                                        </Link>
                                    </div>
                                ))}
                                </div>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-center mb-6 ">
                        {page > 1 && 
                            <button onClick={() => setPage(current => current - 1)} type="button" className="border border-1 bg-slate-50 hover:bg-slate-100 rounded-md p-2 shadow">Previous Page</button>
                        }
                        {endIndex > 0 &&
                            <button onClick={() => setPage(current => current + 1)} type="button" className="bg-slate-50 hover:bg-slate-100 border border-1 rounded-md p-2 shadow">Next Page</button>
                        }
                    </div>

                   
                    <FooterLayout/>
            </div>
            
        </>
    )
}

export default ProductsCatalog;