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
    const [errMsg, setErrMsg] = useState('')
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
  
            if(result.data.products.length === 0 ){
                setErrMsg({message: 'Product Not Found'})
            }else{
                setErrMsg('')
            }
           

        })        
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
            setTags(result.data.tags)
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
    // console.log(page)
    // console.log(endIndex)
  
    return (
        <>
            <div className='flex flex-col min-h-screen w-full bg-orange-100 bg-opacity-25 '>
                <NavbarLayout user={user} />
                    <div className='flex container flex-grow lg:min-w-full md:px-8 px-4  mb-5 mt-10 gap-4 '>
                        <div>
                        <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='shadow items-center gap-2 py-2 px-4 font-semibold hover:bg-orange-50 active:bg-orange-50 focus:bg-orange-50 rounded-md md:text-base text-sm border flex bg-white'> Category <IoIosArrowDropdown/></button>
                            <Transition
                                show={DropdownToggle}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
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
                                <input onChange={handleChange} className="w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-orange-100 focus:ring-orange-100 focus:ring-1 text-sm" placeholder="Search product..." type="text" name="search"/>
                                <button className="flex items-center justify-center md:-ml-12 -ml-8  ">
                                    <BsSearch/>
                                </button>
                            </div>
                      
                    </div>
                    
                    <div className={(DropdownToggle ? 'hidden ': 'container lg:min-w-full md:px-8 px-4 mt-5' )}>
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

                    {Object.keys(errMsg).length !== 0 &&
                        <h5 className="font-bold text-xl px-8 font-display py-20 text-center">{errMsg.message}</h5> 
                    }
                    
                    <div className={bestProduct.length!== 0 ? 'container min-w-full py-3 mb-2 flex-grow ': 'hidden'}>
                    <h5 className="font-bold md:text-2xl text-lg font-display pt-4 mb-4 px-8">Best Seller Products</h5>
                        <div className='w-max mx-auto'> 
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                            { bestProduct.length !== 0 && bestProduct.slice(0,5).map((item, i) => (
                                <div key={i} className="lg:w-56 w-40 shadow-lg border-solid border rounded-xl bg-white">
                                    <Link to={`/product/${item.product_id?.id}`} >
                                        <BestSellerProducts  bp={item} />
                                    </Link>
                                </div>
                            ))}
                            </div>
                        </div>
                            
                        
                    </div>
                    
                    <div className= {product.length!== 0 ? 'container min-w-full py-3 mb-5 flex-grow ': 'hidden'}>
                        <h5 className="font-bold md:text-2xl text-lg font-sans mt-4 mb-4 px-6">Products</h5>
                        <div className='w-max mx-auto'>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                                { product?.length !== 0 && product?.map((item, i) => (
                                    <div key={i} className="md:w-56 w-40 shadow-lg border-solid border rounded-xl mb-4 bg-orange-500 bg-opacity-75">
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
                            <button onClick={() => setPage(current => current - 1)} type="button" className="border border-1 bg-orange-300 hover:bg-orange-200 rounded-md p-2 shadow font-medium">Previous Page</button>
                        }
                        {endIndex > 0 &&
                            <button onClick={() => setPage(current => current + 1)} type="button" className="bg-orange-300 hover:bg-orange-200 border border-1 rounded-md p-2 shadow font-medium">Next Page</button>
                        }
                    </div>

                   
                    <FooterLayout/>
            </div>
            
        </>
    )
}

export default ProductsCatalog;