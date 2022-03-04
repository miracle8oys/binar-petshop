import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import {MdOutlineDeleteOutline} from "react-icons/md"
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from "react-icons/ai";

import {useNavigate } from "react-router-dom";
import "../assets/style.css"


const Cart = () => {

    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [cart, setCart] = useState([]);
    const [changes, setChanges] = useState(0);
    const navigate = useNavigate();
    const [sumTotal, setSumTotal] = useState(0);
    const [errMsg, setErrMsg] = useState({});
    const base_url = process.env.REACT_APP_BASE_URL;
    
    useEffect(() => {
        if (!!userToken) {
            fetch(`${base_url}/v1/user/cart`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            }).then(res => res.json())
            .then(result => {
                setSumTotal(result.data.totalPrice);
                setCart(result.data.carts)
            }) 
        }
    }, [userToken, changes, base_url])

    const deleteItem = (cart_id) => {
        fetch(`${base_url}/v1/user/cart/${cart_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            }).then(() => {
                setChanges(current => current + 1)
            });
    }

    const updateQty = (cart_id, method) => {
        fetch(`${base_url}/v1/user/cart`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${userToken}`
            },
            body: JSON.stringify({
                cart_id, 
                method
            })
        }).then(() => {
            setChanges(current => current + 1);
        })
    }

    const handleChackout = () => {
        if (!userToken) {
            return false
        }

        if(cart.length === 0){
            setErrMsg({message: 'Your cart is empty. Choose some product'})
            return false
        }else{
            fetch(`${base_url}/v1/user/order/init`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            }).then(() => {
                navigate("/checkout")
            }).catch(err => {
                console.log(err);
            })

        }
        
        
    }

    const capitalizeEachLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }

     console.log(cart.length)

   
    
    return ( 
        
        
        <div className="flex flex-col w-full h-screen bg-orange-50 bg-opacity-25">
        <NavbarLayout/>
            
            <div className="container  min-w-full  my-5 flex-grow ">
                <div className="md:flex h-full md:mx-10 mx-2 md:gap-4">
                    <div className="md:w-2/3 py-6 h-96 md:h-full scrollbar overflow-auto">
                        <h1 className="font-semibold text-2xl mb-5">Shopping Cart</h1>
                        <div className="bg-white shadow-md h-fit rounded-lg ">
                            {cart.map(item => (
                            <div key={item.id} className="hover:bg-gray-100 px-4 py-5 mb-2 border-b-2">
                                <div className="flex w-full gap-2">
                                    <div className="w-20 block">
                                        <img className="h-24 object-fit" src={item.product?.img} alt="thumbnail"/>
                                    </div>
                                    <div className="md:ml-4 flex-grow">
                                        {item.product && <p className="font-medium text-xs md:text-xl"> {capitalizeEachLetter(item.product?.name)}</p>}
                                        <p className="text-sky-800 text-xs md:text-sm md:my-2 my-1">Weight {item.product?.weight} gram</p>
                                        <span className="text-center w-1/5 font-semibold text-xs md:text-base xl:text-xl">{formatRupiah(item.product?.price)}</span>
                                        
                                    </div>
                                </div>

                                <div className="flex justify-end gap-6">
                                    <MdOutlineDeleteOutline onClick={() => deleteItem(item.id)} className="font-semibold text-gray-500 hover:text-red-400  md:text-2xl"/>
                                <div className="border-r-2"></div>
                                <div className="flex gap-4">
                                        <button onClick={() => updateQty(item.id, "ADD")} className="md:text-lg  text-xs text-gray-700 font-bold text-orange-600"><AiOutlinePlusCircle /></button>
                                        <p className="text-center md:text-base text-xs">{item.quantity}</p>
                                        {item.quantity === 1  ? 
                                        <button className="md:text-lg text-xs rounded-md text-gray-700 font-bold text-orange-600"><AiOutlineMinusCircle /></button>
                                        :
                                            <button onClick={() => updateQty(item.id, "SUBSTRACT")} className="md:text-lg text-xs rounded-md text-gray-700 font-bold text-orange-600"><AiOutlineMinusCircle /></button>
                                        }
                                    </div>
                                
                                    
                                    
                                </div>        
                            </div>
                            ))}
                        </div>
                    </div>
                    


                    <section id="summary" className="md:w-1/3 md:mt-20">
                        <div className="sticky top-0 ">
                            <div className="bg-white shadow-md rounded-lg h-fit px-8 py-3 md:py-6 ">
                                <h1 className="font-semibold text-base md:text-xl border-b pb-3">Shopping Summary</h1>
                                <div className="md:mt-6 mt-2">
                                <span className="font-semibold md:text-base text-sm ">Items {cart.length}</span>
                                    <div className="flex justify-between py-3 md:py-6 md:text-base text-sm  border-b">
                                        <span className="text-gray-500">Total price (items)</span>
                                        <span>{formatRupiah(sumTotal)}</span>
                                    </div>
                                    <div className="flex font-semibold justify-between py-6 text-sm">
                                        <span className="font-bold text-base md:text-lg">Grand Total</span>
                                        <span className="md:text-lg">{formatRupiah(sumTotal)}</span>
                                    </div>
                                    <button onClick={handleChackout} className="bg-indigo-500 font-semibold hover:bg-indigo-600 md:py-3 py-2 text-sm text-white w-full md:uppercase ">Checkout</button>
                                    {Object.keys(errMsg).length !== 0 &&
                                     <p className="text-yellow-700 text-sm my-2 text-center">{errMsg.message}</p>}
                                </div>    
                            </div> 
                        </div>
                    </section>
                        
                </div>
            </div>
            <FooterLayout/>
        </div>
     
     
        
       
        
     );
}
 
export default Cart;