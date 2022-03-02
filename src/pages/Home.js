import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import ListPet from "../components/ListPet";
import HomePet from "../assets/home-pet.png"
import Check from "../assets/checkout.png"
import Tap from "../assets/smartphone.png"
import Pay from "../assets/mobile-payment.png"
import Deliver from "../assets/shipping.png"
import Line from "../assets/oneline-1.png"
import Adoption from "../assets/adopt-home.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {BiLinkExternal} from 'react-icons/bi'
import {HomeListProducts,TopProducts} from '../components/ListProducts'

const Home = ({user}) => {

    const [petList, setPetList] = useState([])
    // const [tags, setTags] = useState([])
    const navigate = useNavigate();
    const [best_seller, setBestSeller] = useState(0);
    const [bestProduct, setBestProduct] = useState([]);
    const [product, setProduct] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;
    

    useEffect(() => {
        fetch(`${base_url}/adopt`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/JSON"
            }})
        .then(res => res.json())
        .then(result => {
            setPetList(result.data.all_adopt)
        })
        // fetch(`${base_url}/tags`, 
        // {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'Application/JSON'
        //     }
        // })
        // .then(res => res.json())
        // .then(result => {
        //     setTags(result.data.tags)
        // });
    }, [base_url]);
    useEffect(() => {
        fetch(`${base_url}/products`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
            }
        })
        .then(res => res.json())
        .then(result => {
            setProduct(result.data.products)
        });
    }, [base_url]);
    useEffect(() => {
        fetch(`${base_url}/products?best=${best_seller}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
            }
        })
        .then(res => res.json())
        .then(result => {
            setBestSeller(1)
            setBestProduct(result.data.products);
        });
    }, [base_url,best_seller]);

    // const handleClickCategory = (name)=>{
    //     navigate(`/products/tags=${name}`)
    // }

    // const capitalizeLetter = (tags) => {
    //     let word = tags.toLowerCase().split(' ')
    //     for(let i = 0; i < word.length; i++){
    //         word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
    //     }
    //     return word.join(' ')
    // }
    return ( 
        <div className="min-h-screen w-full flex flex-col">
        <NavbarLayout user={user}/>
        <div className="flex flex-wrap flex-grow bg-orange-200 bg-opacity-25 rounded-b-lg">
            <div className="mx-auto">
                <div className="py-5 md:py-8 flex justify-center ">
                    <div className=" mx-6 my-auto  md:text-left">
                        <p className="md:text-5xl text-2xl font-semibold tracking-wide mb-2">Love and Care Animal</p>
                        <h1 className="md:text-4xl text-xl  font-medium tracking-normal">Make them healthy</h1>
                        <p className="text-gray-500 mt-4 md:w-96">Discover makes it easy to serve our feline firends healrty,
                                wholesome meals, keeping them healthy and for their lives</p>
                        <div className="md:mt-14 mt-8 flex justify-center md:justify-start">
                            <Link to={'/catalog'} className="rounded-full bg-orange-800  py-3 px-5 text-sm text-white shadow-lg hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 w-max md:text-base flex" type="submit" name="submit">Shop Now <BiLinkExternal className="mx-2 mt-1"/></Link>
                        </div>
                        
                    </div>
                    {/* <img src={HomePet} alt="Pet" className="hidden rounded-full -mt-2 md:block w-full object-cover"/>  */}
                    <div className="mx-auto my-auto">
                        <img src={HomePet} alt="Pet" className="hidden rounded-full bg-orange-500 bg-opacity-75 h-96 md:block w-full object-fit"/> 
                    </div>
                    
                    
                </div>
            </div>
        </div>
      
        {/* <div className="mx-auto md:mx-5 px-3 mt-6 p-2">
             <h5 className="font-bold md:text-lg font-display">Products Category </h5>
                <div className="flex inline font-mono my-5 md:gap-6 gap-2 overflow-x-auto scrollbar">
                {tags.map(tag => (
                    <button key={tag.id} onClick={() => handleClickCategory(tag.name)}  className="text-sm md:text-base flex justify-center py-2  px-3 min-w-max hover:bg-amber-100 active:bg-amber-100 focus:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50 mb-3">
                        {capitalizeLetter(tag.name)}
                    </button>
                ))}
                </div>
        </div> */}
        <div className="flex-grow w-full h-full mt-14 mb-8">
            <h3 className="md:text-2xl text-xl text-center mb-6 md:mb-10  lg:px-8 px-4 font-semibold text-gray-700">Easy and Ready To Help You</h3>
            <div className="flex justify-center ">
                <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4">
                    <div className="bg-orange-200 bg-opacity-25 rounded-lg h-64 md:w-56 w-40 shadow">
                        <div className="flex justify-center mb-6 mt-4">
                            <img src={Tap} alt="choose" className=" bg-white mt-4 rounded-lg border  p-2 w-16 h-16 block object-fit"/>
                        </div>
                        <div className="mt-4 text-center mx-6">
                            <p className="md:text-xl font-bold mb-3">Choose Product</p>
                            <p className="md:text-sm text-xs text-gray-400">You can choose product that you want to buy</p>
                        </div>
                       
                    </div>

                    <div className="bg-orange-200 bg-opacity-25 rounded-lg h-64 md:w-56 w-40  shadow">
                        <div className="flex justify-center mb-6 mt-4">
                            <img src={Check} alt="checkout" className=" bg-white mt-4 rounded-lg border  p-2 w-16 h-16 block object-fit"/>
                        </div>
                        <div className="mt-4 text-center mx-6">
                            <p className="md:text-xl font-bold mb-3">Checkout Product</p>
                            <p className="md:text-sm text-xs text-gray-400">Checkout after you done to choose product that you need</p>
                        </div>
                       
                    </div>

                    <div className="bg-orange-200 bg-opacity-25 rounded-lg h-64 md:w-56 w-40  shadow">
                        <div className="flex justify-center mb-6 mt-4">
                            <img src={Pay} alt="payment" className=" bg-white mt-4 rounded-lg border  p-2 w-16 h-16 block object-fit"/>
                        </div>
                        <div className="mt-4 text-center mx-6">
                            <p className="md:text-xl font-bold mb-3">Payment</p>
                            <p className="md:text-sm text-xs text-gray-400">Payment from everywhere in your phone. Easy and Helping.</p>
                        </div>
                       
                    </div>
                    
                    <div className="bg-orange-200 bg-opacity-25 rounded-lg h-64 md:w-56 w-40  shadow">
                        <div className="flex justify-center mb-6 mt-4">
                            <img src={Deliver} alt="shipping" className=" bg-white mt-4 rounded-lg border  p-2 w-16 h-16 block object-fit"/>
                        </div>
                        <div className="mt-4 text-center mx-6">
                            <p className="md:text-xl font-bold mb-3">Delivery</p>
                            <p className="md:text-sm text-xs text-gray-400">Very fast delivery ready to your home</p>
                        </div>
                       
                    </div>
                    
                    
                    
                </div>
                
            </div>
            <div className="flex justify-center">
                <img src={Line} alt="line-border" className="w-24 h-20"/>


            </div>
            
        </div>
     
        <div className="h-full flex-grow min-w-full bg-orange-200 bg-opacity-25 pb-10">
            {bestProduct.length!== 0  && <h3 className="md:text-3xl text-2xl text-center mb-4 mt-6 md:mb-8  lg:px-8 px-4 font-semibold">Our Top Sellers</h3>}
                <div className='flex justify-center'>
                    <div className= "grid grid-cols-2  md:grid-cols-3 gap-4 lg:gap-12  md:p-4">
                    { bestProduct.length !== 0 && bestProduct.slice(0,3).map((item, i) => (
                        <div key={i} className="md:w-60 h-full w-40 shadow-lg border-solid border rounded-xl bg-orange-500 bg-opacity-75">
                            <Link to={`/product/${item.product_id?.id}`} >
                                <TopProducts  tp={item} />
                            </Link>
                        </div>
                    ))}
                </div>
      
            </div> 
        </div>
        <div className="h-full flex-grow w-full md:my-8 my-4">
            <div className="md:flex justify-center items-center gap-12 flex-grow">
                <div className="mx-auto md:mx-0">
                    <img src={Adoption} alt="ilustration" className="w-full hidden md:block md:h-96 object-fit "/>
                </div>
                <div className="mx-6 my-auto md:mx-0">
                    <h4 className="font-semibold text-2xl tracking-wide mb-5">Do You Want To Adopt A Pet?</h4>
                    <p className="text-gray-700 md:w-96">We're have some homeless pet with any spesies that ready to get a love from their new owner. Please contact our admin and check our adoption catalog if you interested.</p>
                    <div className="flex justify-center items-center my-10 gap-10">
                        <button className="py-2 px-4 bg-orange-300 hover:bg-orange-200 rounded-md font-medium" onClick={() => navigate('/chat')}>Chat Admin</button>
                        <button className="py-2 px-4 bg-slate-300 hover:bg-slate-200 rounded-md font-medium" onClick={() => navigate('/adopt')}>Adopt Catalog</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-grow w-full h-full bg-slate-100 bg-opacity-75 rounded-md">
            <h3 className="md:text-2xl text-xl my-4 md:px-5 px-4 font-semibold">Some pet we have</h3>
            <div className="flex justify-center ">
                <div className="grid grid-cols-2 md:grid-cols-5 md:gap-6 gap-4  ">
                {petList.slice(0,5).map(item => (
                    <div key={item.id} className="shadow-lg md:w-56 w-40 border-solid border rounded bg-blue-50 bg-opacity-50">
                        <ListPet pet ={item}/>
                    </div>
                ))}

                </div>
            </div>
        </div>    

        <div className="flex-grow w-full h-full bg-slate-100 bg-opacity-75  rounded-md">
            {product?.length !== 0  && <h3 className= "md:text-2xl text-xl mb-5 mt-8 md:px-5 px-4 font-semibold ">Products for you</h3>}
                <div className="flex justify-center ">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                     { product?.length !== 0 && product?.slice(0,10).map((item, i) => (
                        <div key={i} className="lg:w-56 w-40 shadow-lg border-solid border rounded-xl mb-4 bg-white">
                         <Link to={`/product/${item.product_id?.id}`} >
                            <HomeListProducts key={i} prod={item}/>
                          </Link>
                        </div>
                    ))}
                    </div>
                </div>
        </div>                
        

            
        <FooterLayout/>
    </div>
     );
}
 
export default Home;