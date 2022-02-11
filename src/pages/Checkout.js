import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [cart, setCart] = useState([]);
    const [changes, setChanges] = useState(0);
    const navigate = useNavigate();

    const [ongkir, setOngkir] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

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
                setCart(result.data)
            }) 
        }
    }, [userToken, changes])

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
                                    <p className="font-semibold">{item.product?.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Rp. <span className="font-semibold">{item.product?.price}</span></p>
                                    <p>Subtotal : Rp.{item.product?.price * item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="my-3 mx-5">
                    <p>Shipping Cost: Rp.{ongkir}</p>
                    <p>Total: Rp.{totalPrice}</p>
                </div>
            </div>
        <FooterLayout />
        </>
     );
}
 
export default Checkout;