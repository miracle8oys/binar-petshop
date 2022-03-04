import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import "../assets/style.css"
import {useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {FiShare2} from 'react-icons/fi'
import {GiShop} from 'react-icons/gi'
import {MdNavigateNext} from 'react-icons/md'
import {FaShoppingBag, FaShippingFast} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai';
const base_url = process.env.REACT_APP_BASE_URL;

const CurrentProduct = ({user}) =>{
    const {id} = useParams();
    const [currProd, setCurrProd] = useState([]);
    const [errMsg, setErrMsg] = useState({});
    const userData = useSelector(state => state.loginReducer);
    let [openTab, setOpenTab] = useState(1);
    const [categoryProd, setCategoryProd] = useState([])
    // const [tags, setTags] = useState([]);
    const [copied, setCopied] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() =>{
        fetch(`${base_url}/products/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result =>{
            // console.log(result.data)
            setCurrProd(result.data);
            setCategoryProd(result.data.tags_id.map((item) => (
                {value: item.id,
                label : item.name})))
        }, []);
    }, [id, userData])

    // useEffect(() => {
    //     fetch(`${base_url}/tags`, 
    //         {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'Application/JSON',
    //                 'authorization': userData.user?.accessToken
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(result => {
    //             setTags(result.data)
    //         });                    

    // }, [userData])

    // let optionsTag =tags.map((item,i) => (
    //     {value: item.id,
    //     label : item.name}
    // )) 

    const firstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1)
    }
    const capitalizeEachLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }

    const handleCreateCart = (id) =>{
        if (!userData.user) {
            return false
        }
        if(currProd.product_id?.qty === 0){
            setErrMsg({message: 'Stok kosong, Anda tidak bisa membeli produk ini.'})
        }else{
            fetch(`${base_url}/v1/user/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': userData.user?.accessToken
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity:1
                })
            }).then(() => {
                navigate('/cart')
            }).catch(err => {
                console.log(err);
                setErrMsg(err)
            })
        }
    }
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }

     const copy = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select()
        navigator.clipboard.writeText(el.value);
        document.body.removeChild(el);
        setCopied(true)
          
     }

     console.log(categoryProd.map((item) =>(
         item.label
     )))

    return (
        <div className="flex flex-col w-full min-h-screen bg-orange-50 bg-opacity-50">
            <NavbarLayout user={user}/>

            <div className="container px-6 flex mt-6">
                <button type="button" className="font-bold" onClick={() => navigate('/') }>Home</button>
                <div className="self-center mx-1">
                    <MdNavigateNext /> 
                </div>
                <button type="button" className="font-bold" onClick={() => navigate('/catalog') }>Catalog</button>
                <div className="self-center mx-1">
                    <MdNavigateNext /> 
                </div>
                {currProd.product_id && <button type="button" className="text-gray-600">{firstLetter(currProd.product_id?.name)}</button>}

            </div>
            
            <div className="w-full lg:min-w-full mb-5  flex-grow">
                
                    <div className="grid md:grid-cols-5 md:my-8 mt-8 px-6">
                        <div className="col-span-5 md:col-span-1 md:w-68">
                            <div className="flex inline-block mx-auto">
                                <img src={`${currProd.product_id?.img}`} alt="Product" className="rounded-lg w-full h-96  object-fit "/>
                                
                            </div>
                            <div className="relative mt-6 ">
                                    <button onClick={() => setModal(true)} className="relative inset-0 z-10 bg-white text-center flex flex-col items-center justify-center opacity-100 hover:opacity-25 bg-opacity-90 duration-300">
                                        <img src={`${currProd.product_id?.img}`} alt="Product" className="rounded-lg w-20 h-28 object-fill "/>
                                    </button>
                                </div>
                            
                            
                        </div>
                        
                        <div className="mt-4 relative md:ml-8 col-span-4 lg:mt-0">
                            <div>
                                {currProd.product_id && <p className="lg:text-2xl tracking-wide text-xl mb-0 ">{capitalizeEachLetter(currProd.product_id?.name)}</p>}
                            
                                <p className="md:text-2xl text-xl my-3 tracking-wide font-medium text-green-600">{formatRupiah (currProd.product_id?.price)} (pcs)</p>
                                <p className="text-lg mb-3 tracking-wide">Availability:<span className={(currProd.product_id?.stok !== 0 ? "ml-2 text-sky-500" : "text-red-600")}>{currProd.product_id?.stok !== 0 ? 'Available' : 'Not Available'}</span> </p>
                                <p className= {"mt-8 flex " +(currProd.product_id?.qty === 0 ? "text-red-600" : "text-slate-600"  )}><GiShop className="mt-1 mr-2"/>Stock<span className={"mx-1 " + (currProd.product_id?.qty === 0 ? "text-red-600" : "text-sky-600"  )}>{currProd.product_id?.qty}</span>  pcs</p>
                                <p className="text-slate-500 text-base my-2 flex"><FaShoppingBag className="mt-1 mr-2"/>Sells: {currProd.product_id?.sold} pcs</p>
                                <p className="text-slate-500 text-base my-2 flex"><FaShippingFast className="mt-1 mr-2"/>Serve Fast Delivery</p>
                            </div>
                            <div className="w-full flex md:absolute md:inset-x-0 md:bottom-14 gap-4 mt-6 ">
                                
                                    <button type="button" onClick={() => handleCreateCart(currProd.product_id?.id)} className="h-10 w-36 lg:w-48 rounded font-semibold tracking-wide bg-orange-300 hover:bg-orange-200 shadow-md">Buy Product</button>
                                    <button type="button" className=" h-10 rounded font-medium border border-gray-300 hover:bg-slate-100 w-36 lg:w-48 flex items-center justify-center bg-white shadow" id="copy-button" onClick={copy}><FiShare2 className="mr-2"/> {!copied ? "Share" : "Succeed!"}</button>
                                    {Object.keys(errMsg).length !== 0 && <p className="text-yellow-500 text-sm my-2 text-center">{errMsg.message}</p>}
                                    {/* <Link to={`/${base_url}/product/${currProd.product_id?.id}`} className="h-10 mx-4 rounded font-semibold px-8 tracking-wide text-white w- bg-blue-600 hover:bg-blue-500">Bagikan</Link> */}
                                
                        </div>
                    
                        </div>

                        
                    </div>  
                    {modal ? (
                        <div className="bg-gray-300 bg-opacity-50  fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto mx-auto max-w-3xl">
                                <div className="border-0 relative flex flex-col w-full outline-none focus:outline-none px-4 md:px-0">
                                    
                                    <div className="bg-white w-full rounded-lg my-24 md:my-6 pb-16 ">
                                        <div className="flex justify-between px-6 my-4">
                                            <div className="mb-4">
                                                {currProd.product_id && <p className="tracking-wide text-2xl ">{capitalizeEachLetter(currProd.product_id?.name)}</p>}
                                            </div>
                                            <button
                                                className="p-1 ml-auto border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setModal(false)}>
                                                <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                <AiOutlineClose/>
                                                </span>
                                            </button>
                                        </div>
                            
                                        <div className="relative flex-auto flex justify-center items-center mt-12">
                                            <img src={`${currProd.product_id?.img}`} alt="Product" className="rounded-lg h-96 object-fit scale-125"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null }    
                
            </div>
            <div className="w-full lg:min-w-full my-5 px-6 flex-grow container ">
                    <h6 className="font-bold">Product Information</h6>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row gap-8  border-b-2"role="tablist">
                                <li className="text-blue-800">
                                    <button className={"text-base  " + (openTab === 1? "text-sky-700 font-medium" : "text-black bg-white")} 
                                    onClick = {e => {e.preventDefault(); setOpenTab(1);}}data-toggle="tab" href="#link1" role="tablist">Description</button>          
                                </li>
                                <li className="text-blue-800">
                                    <button className={"text-base " + (openTab === 2? "text-sky-700 font-medium " : "text-black bg-white")} 
                                    onClick = {e => {e.preventDefault(); setOpenTab(2);}}data-toggle="tab" href="#link2" role="tablist">Information</button>          
                                </li>
                            </ul>

                            <div className="relative flex flex-col">
                                <div className="tab-content tab-space">
                                    <div className={(openTab === 1 ? " block " : " hidden")} id="link1">
                                    {currProd.product_id && <p className="pt-3">
                                            {firstLetter(currProd.product_id?.description)}
                                        </p>}
                                    </div>
                                    <div className={(openTab === 2 ? " block mb-6" : " hidden")} id="link2">
                                        <div className="flex  pt-3 ">
                                            <p className="w-24">
                                                Weight
                                            </p>
                                            <p className="w-full">
                                                {currProd.product_id?.weight} gram
                                            </p>
                                        </div>
                                        <div className="flex  pt-3  ">
                                            <p className="w-24">
                                                Categories
                                            </p>
                                            <div className="w-full">
                                                {(categoryProd.map((item, i) =>(
                                                    <p key={i} className="pb-1">
                                                        {firstLetter(item.label)}
                                                    </p>
                                                )))}       
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
          
                        </div>
                    </div>
                </div>
        
            <FooterLayout/>
        </div>
    )
}

export default CurrentProduct;