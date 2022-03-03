import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";

const UserOrderDetail = () => {

    const {orderId} = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const accessToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [order, setOrder] = useState({})

    useEffect(() => {
        if (accessToken) {
            fetch(`${base_url}/v1/user/order/${orderId}`,{
                method: "GET",
                headers: {
                    'Content-Type': "Application/json",
                    "Authorization": accessToken
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setOrder(result.data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [base_url, accessToken, orderId]);

    const handlePayment = () => {
        window.snap.pay(order.order?.midtrans_snap_token);
    }

    return ( 
        <>
            <NavbarLayout />
                <div className="flex justify-center bg-orange-50">
                    <div className="py-2 px-2 min-h-[70vh] md:w-[50vw]">
                        <div className="flex justify-between">
                            <p>Order Status : </p> 
                            <p><span className="font-semibold">{order.order?.status}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <p>Payment Status : </p>
                            <p><span className="font-semibold">{order.paymentStatus}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <p>Order Date : </p>
                            <p><span className="font-semibold">{order.order?.createdAt}</span></p>
                        </div>

                        <div className="my-10">
                            {order.order?.products.map((item, i) => (
                                <Link key={i} to={`/`}>
                                    <div className="border-2 my-2 px-2 py-2 md:mx-40 rounded-md shadow-md">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="font-semibold">Rp.{item.price}</p>
                                            </div>
                                            <div>
                                                <img className="w-12" src={`${item.img}`} alt="product" />
                                            </div>
                                        </div>
                                        <div className="text-right mt-2">
                                            <button className="bg-orange-300 px-1 rounded-sm">Detail</button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {order.paymentStatus !== "SUCCESS" &&
                            <div className="text-center mb-3">
                                <button onClick={handlePayment} className="py-2 px-1 bg-orange-300 rounded-md font-semibold">Payment</button>
                            </div>
                        }

                        <div className="flex justify-between">
                            <p>Shipping Address : </p> 
                            <p><span className="font-semibold">{order.order?.address?.address}, {order.order?.address?.city}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total Product Price : </p>
                            <p><span className="font-semibold">Rp.{order.order?.grand_total - order.order?.shipping_costs}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping Cost : </p>
                            <p><span className="font-semibold">Rp.{order.order?.shipping_costs}</span></p>
                        </div>
                        <div className="flex justify-between my-5 text-lg">
                            <p><span className="font-semibold">Grand Total : </span></p>
                            <p><span className="font-semibold">Rp.{order.order?.grand_total}</span></p>
                        </div>
                        
                    </div>
                </div>
            <FooterLayout />
        </>
     );
}
 
export default UserOrderDetail;