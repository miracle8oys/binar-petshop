import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import {MdOutlineDeleteOutline} from "react-icons/md"
import {BiMinus, BiPlus} from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Cart = () => {

    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [cart, setCart] = useState([]);
    const [changes, setChanges] = useState(0);
    const navigate = useNavigate();
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
                console.log(result);
                setCart(result.data.carts)
            }) 
        }
    }, [userToken, changes])

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
    console.log("test");
    return ( 
        <>
        <NavbarLayout />
            <div className="min-h-[70vh] pt-3">
                {cart.map(item => (
                    <div key={item.id}>
                        <div className="md:flex md:justify-center">
                            <div className="grid grid-cols-8 items-center gap-2 md:w-2/4">
                                <div className="col-span-2">
                                    <img className="h-28" src={item.product?.img} alt="product" />
                                </div>
                                <div className="col-span-4">
                                    <p>{item.product?.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Rp. <span className="font-semibold">{item.product?.price}</span></p>
                                    <p>Subtotal: Rp. {item.product?.price * item.quantity}</p>
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <button onClick={() => updateQty(item.id, "ADD")} className="bg-sky-500 py-1 px-2 rounded-md my-2"><BiPlus /></button>
                                    </div>
                                    <div>
                                        {item.quantity === 1 ? 
                                        <button className="bg-orange-200 py-1 px-2 rounded-md font-semibold"><BiMinus /></button>
                                        :
                                        <button onClick={() => updateQty(item.id, "SUBSTRACT")} className="bg-orange-500 py-1 px-2 rounded-md font-semibold"><BiMinus /></button>
                                    }
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <MdOutlineDeleteOutline onClick={() => deleteItem(item.id)} className="text-3xl mx-2" />
                                </div>
                            </div>
                        </div>
                            <hr className="font-semibold text-2xl bg-zinc-900" />
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-2">
                <button onClick={handleChackout} className="py-2 px-2 bg-sky-500 rounded-md">Checkout</button>
            </div>
        <FooterLayout />
        </>
     );
}
 
export default Cart;