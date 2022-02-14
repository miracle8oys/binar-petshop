import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [cart, setCart] = useState([]);
    const [ongkir, setOngkir] = useState(0);
    const [weight, setWeight] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [address, setAddress] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(0);

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
                setCart(result.data.carts);
                setTotalPrice(result.data.totalPrice);
                setWeight(result.data.totalWeight);
            }) 

            fetch(`${base_url}/v1/user/address`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                }
            }).then(res => res.json())
            .then(result => {
                setAddress(result.data);
                setCurrentAddress(result?.data[0]?.id);
            })
        }
    }, [userToken, base_url]);


    const handleCheckShipping = () => {
        fetch(`${base_url}/cost`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${userToken}`
            },
            body: JSON.stringify({
                address_id: `${currentAddress}`,
                weight: `${weight * 1000}`
            })
        }).then(res => res.json())
        .then(result => {
            setOngkir(result.rajaongkir.results[0].costs[0].cost[0].value)
        }).catch(err => {
            console.log(err.message);
        })
    }

    console.log(weight);
    return ( 
        <>
        <NavbarLayout />
            <div className="flex justify-center">
                <div className="min-h-[70vh] md:w-[80vw] pt-3 px-3 md:grid md:grid-cols-2 items-center">
                    <div>
                        {cart.map(item => (
                            <div key={item.id}>
                                <div className="md:flex md:justify-center my-3">
                                    <div className="grid grid-cols-8 items-center gap-2 md:w-2/4">
                                        <div className="col-span-2 md:col-span-3">
                                            <img className="h-28 w-28" src={item.product?.img} alt="product" />
                                        </div>
                                        <div className="col-span-4 md:col-span-5">
                                            <p className="font-semibold">{item.product?.name}</p>
                                            <p>Qty: <span className="font-semibold">{item.quantity}</span></p>
                                            <p><span className="font-semibold">Rp.{item.product?.price}</span></p>
                                            <p>Subtotal : <span className="font-semibold">Rp.{item.product?.price * item.quantity}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                            {currentAddress ?
                            <>
                                <div className="flex justify-center my-5">
                                    <select onChange={(e) => setCurrentAddress(e.target.value)} className="border-2 h-12 rounded-md">
                                        {address.map(item => (
                                                <option key={item.id} value={item.id}>{item.city}, {item.address}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center mb-3">
                                    <button className="py-2 px-2 bg-orange-300 rounded-md font-semibold" onClick={handleCheckShipping}>Check Shipping Cost</button>
                                </div>
                            </> : 
                            <>
                                <div className="flex justify-center my-5">
                                    <Link to="/address" className="py-2 px-2 bg-sky-500 rounded-md">Create Address</Link>
                                </div>
                            </>    
                        }

                        <div className="py-3 md:flex md:justify-center gap-2">
                            <div className="md:w-3/5 md:grid md:justify-center bg-slate-300 rounded-md py-2 px-5">
                                <p>Total Price: <span className="font-semibold">Rp.{totalPrice}</span></p>
                                <p>Shipping Cost: <span className="font-semibold">Rp.{ongkir}</span></p>
                                <p>Total Bill: <span className="font-semibold">Rp.{totalPrice + ongkir}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center mb-3">
                            <button className="py-2 px-2 bg-sky-500 rounded-md font-semibold">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        <FooterLayout />
        </>
     );
}
 
export default Checkout;