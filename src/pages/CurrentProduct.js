import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import "../assets/style.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const base_url = process.env.REACT_APP_BASE_URL;

const CurrentProduct = ({user}) =>{
    const {id} = useParams();
    const [prodId, setCurrentProduct] = useState({});
    // const [counter, setCounter] = useState(0);
    const userData = useSelector(state => state.loginReducer);

    useEffect(() =>{
        fetch(`${base_url}/products/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user.accessToken
            }
        })
        .then(res => res.json())
        .then(result =>{
            console.log(result.data)
            setCurrentProduct(result.data)
        }, []);
    }, [id])

    const firstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1)
    }

    // const handleIncrement = () =>{
    //     setCounter(parseInt(counter)+1);
    // }
    // const handleDecrement = () =>{
    //     if(counter == 0){
    //         setCounter(0)
    //     }else{
    //         setCounter(parseInt(counter)-1);
    //     }
        
    // }

    // const handleChange = (e) =>{
    //     setCounter(e.target.value)
    // }

    // const totalPrice = (price) =>{
    //     return counter*price;
    // }



    return (
        <div className="flex flex-col w-full h-screen">
            <NavbarLayout user={user}/>
            
            <div className="flex-grow grid grid-cols-2 md:-ml-32 gap-8 my-8 md:mx-24 ">

                <div className="flex justify-end items-center">
                    <img src={prodId.product_id?.img} alt="Product" className="md:w-44 w-32 h-max"/>
                </div>
                
                    <div>
                        
                        <p className="md:text-xl text-lg font-bold">{firstLetter(prodId.product_id?.name)}</p>
                        <p className="text-slate-600">Stok {prodId.product_id?.qty}</p>
                        <p className="md:text-2xl text-xl my-4">Rp. {prodId.product_id?.price}</p>

                        <p className="text-slate-500 text-sm md:text-base mt-6 mb-3">{prodId.product_id?.description}</p>
                    </div>
                </div>
                {/* <div className="md:mx-auto mb-8 md:h-max w-max">
                    <div className="grid grid-flow-col">
                        <div className="h-10 w-32 ml-6">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button onClick={() => handleDecrement()} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                    <span className="text-2xl font-thin">−</span>
                                </button>
                                <input onChange={handleChange} value={counter} type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="counter"/>
                                <button onClick={() => handleIncrement()} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                    <span className="text-2xl font-thin">+</span>
                                </button>
                            </div>

                        </div>
        
                        <p className="font-semibold ml-6 text-sm md:text-base pt-2">Sub Total: Rp. {totalPrice(prodId.product_id?.price)}</p>
                        
                    </div>
                </div> */}

                <div className="flex justify-center items-center mb-10">
                        <button type="button" className="h-10 rounded w-32 bg-gray-300 hover:bg-gray-400">Beli</button>
                        {/* <button type="button" className="h-10 rounded w-32 bg-gray-300 hover:bg-gray-400 ml-6">Keranjang</button> */}
                </div>
            
            <FooterLayout/>
        </div>
    )
}

export default CurrentProduct;