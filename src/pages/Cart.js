import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import {MdOutlineDeleteOutline} from "react-icons/md"
import {BiMinus, BiPlus} from "react-icons/bi"


const Cart = () => {

    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    console.log("TRUE");
    const [cart, setCart] = useState([]);
    const [changes, setChanges] = useState(0);
    
    useEffect(() => {
        if (!!userToken) {
            fetch(`http://localhost:8000/v1/user/cart`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            }).then(res => res.json())
            .then(result => {
                console.log(result);
                setCart(result.data)
            }) 
        }
    }, [userToken, changes])

    const deleteItem = (cart_id) => {
        fetch(`http://localhost:8000/v1/user/cart/${cart_id}`, {
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
        fetch(`http://localhost:8000/v1/user/cart`, {
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

    return ( 
        <>
        <NavbarLayout />
            <div className="min-h-[70vh] pt-3">
                {cart.map(item => (
                    <div key={item.id}>
                        <div className="md:flex md:justify-center">
                            <div className="grid grid-cols-8 items-center gap-2 md:w-2/4">
                                <div className="col-span-2">
                                    <img className="h-28" src="https://firebasestorage.googleapis.com/v0/b/binar-petshop.appspot.com/o/WhatsApp%20Image%202022-01-24%20at%2009.08.28.jpeg?alt=media&token=e2df4196-4bf0-454c-9941-841d765a8947" alt="product" />
                                </div>
                                <div className="col-span-4">
                                    <p>{item.product?.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Rp. <span className="font-semibold">{item.product?.price}</span></p>
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
        <FooterLayout />
        </>
     );
}
 
export default Cart;