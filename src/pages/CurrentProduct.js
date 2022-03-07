import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import "../assets/style.css"
import {useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {FiShare2} from 'react-icons/fi'
// import {GiShop} from 'react-icons/gi'
import {MdNavigateNext} from 'react-icons/md'
// import {FaShoppingBag, FaShippingFast} from 'react-icons/fa'
import {BsCart3} from 'react-icons/bs'
// import {AiOutlineClose} from 'react-icons/ai';
const base_url = process.env.REACT_APP_BASE_URL;

const CurrentProduct = ({user}) =>{
    const {id} = useParams();
    const [currProd, setCurrProd] = useState([]);
    const [errMsg, setErrMsg] = useState({});
    const userData = useSelector(state => state.loginReducer);
    // let [openTab, setOpenTab] = useState(1);
    const [categoryProd, setCategoryProd] = useState([])
    // const [tags, setTags] = useState([]);
    const [copied, setCopied] = useState(false);
    // const [modal, setModal] = useState(false);
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
        if(userData.user.accessToken === undefined){
            navigate('/login')
        }else{
            if(currProd.product_id?.qty === 0){
                setErrMsg({message: 'Out of stock! Please choose another product'})
                return false
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

    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
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
            
                <section className="text-gray-700  overflow-hidden my-10 flex-grow">
                    <div className="container px-5 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            {/* <button onClick={() => setModal(true)} className="max-h-full lg:w-1/2 w-full z-10 rounded border border-gray-200 opacity-100 hover:bg-gray-100 hover:opacity-50 bg-opacity-90 duration-300 p-2"> 
                                <img src={`${currProd.product_id?.img}`} alt="Product" className="w-full h-full object-cover object-center "/>
                            </button> */}
                            <img src={`${currProd.product_id?.img}`} alt="Product" className="w-full max-h-full lg:w-1/2 object-fit object-center border border-gray-200 p-2"/>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            
                            <div className="pb-5 border-b-2 border-gray-200 mb-5">
                                 {currProd.product_id &&<h1 className="text-gray-900 text-2xl lg:text-3xl 2xl:text-4xl title-font font-medium mb-8">{capitalizeEachLetter(currProd.product_id?.name)}</h1>}
                                 {currProd.product_id && <p className="leading-relaxed">{firstLetter(currProd.product_id?.description)}</p>}
                                 <div className="grid grid-cols-2 my-3 text-base lg:text-lg">
                                    <h6>Weight:</h6>
                                    <h6 className="font-medium">{currProd.product_id?.weight} gram</h6>
                                </div>

                                <div className="grid grid-cols-2 my-3 text-base lg:text-lg">
                                    <h6>Availability:</h6>
                                    <h6 className={currProd.product_id?.stok !== 0 ? "text-green-700" : "text-slate-600"}>{currProd.product_id?.stok !== 0 ? 'Available' : 'Not Available'}</h6>
                                </div>
                                <div className="grid grid-cols-2 my-3 text-base lg:text-lg">
                                    <h6> Stock:</h6>
                                    <h6 className={(currProd.product_id?.qty === 0 ? "text-red-600" : "text-black"  )}>{currProd.product_id?.qty} pcs</h6>
                                </div>

                                <div className="grid grid-cols-2 my-3 text-base lg:text-lg">
                                    <h6>Sells:</h6>
                                    <h6>{currProd.product_id?.sold} pcs</h6>
                                </div>

                                <div className="grid grid-cols-2 my-3 text-base lg:text-lg">
                                    <h6>Categories:</h6>
                                    <div className="w-full">
                                        {(categoryProd.map((item, i) =>(
                                            <h6 key={i} className="pb-1">
                                                {firstLetter(item.label)}

                                            </h6>
                                        )))}       
                                    </div>
                                </div>
                            </div>

                            <div className="my-6">
                                <span className="title-font font-medium text-2xl lg:text-3xl 2xl:text-4xl text-gray-900">{formatRupiah (currProd.product_id?.price)}</span>
                                <div className="w-full mt-6">
                                    <div className="flex justify-center md:justify-end gap-4">
                                        <button type="button" onClick={() => handleCreateCart(currProd.product_id?.id)} className="h-10 w-36 rounded font-semibold tracking-wide bg-orange-300 hover:bg-orange-200 shadow-md flex items-center justify-center"><BsCart3 className="mr-2"/> Buy Product</button>
                                        <button type="button" className=" h-10 rounded font-medium border border-gray-300 hover:bg-slate-100 w-36 flex items-center justify-center bg-slate-50 shadow" id="copy-button" onClick={copy}><FiShare2 className="mr-2"/> {!copied ? "Share" : "Succeed!"}</button>
                                        {/* <Link to={`/${base_url}/product/${currProd.product_id?.id}`} className="h-10 mx-4 rounded font-semibold px-8 tracking-wide text-white w- bg-blue-600 hover:bg-blue-500">Bagikan</Link> */}
                                    </div>
                                    {Object.keys(errMsg).length !== 0 &&
                                    <div className="flex justify-end">
                                        <p className="text-yellow-700 text-sm my-2 text-center">{errMsg.message}</p>
                                    </div>}
                                </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* {modal ? (
                    <div className="w-full lg:min-w-full h-screen flex-grow container flex flex-wrap ">
                        <div className="bg-gray-300 bg-opacity-50  fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="w-auto mx-auto lg:max-w-4xl 2xl:max-w-5xl 2xl:my-14 my-8">
                                    <div className="relative  bg-white w-full min-h-full rounded-lg ">
                                        <div className="flex justify-between px-6 py-6">
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
                            
                                        <div className="flex justify-center items-center pb-auto">
                                            <img src={`${currProd.product_id?.img}`} alt="Product" className="rounded-lg h-3/5 lg:w-1/2 w-full object-fit md:scale-125"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null }  */}
                </section>
                
            <FooterLayout/>
        </div>
    )
}

export default CurrentProduct;