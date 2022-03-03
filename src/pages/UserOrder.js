import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserOrder = () => {

    const base_url = process.env.REACT_APP_BASE_URL;
    const accessToken = useSelector(state => state.loginReducer.user?.accessToken);

    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (accessToken) {
            fetch(`${base_url}/v1/user/order`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": accessToken
                }
            }).then(res => res.json())
            .then(result => {
                console.log(result);
                setOrder(result.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [accessToken, base_url])

    return ( 
        <>
            <NavbarLayout />
                <div className="min-h-[70vh] bg-orange-50">   
                    <div className="md:grid md:justify-items-center">
                        {order.map(item => (
                            <Link key={item.id} to={`/order/${item.id}`}>
                                <div className="bg-orange-50 border-2 my-2 mx-2 rounded-md px-2 py-2 md:w-[30vw] shadow-md">
                                    <div className="flex justify-between">
                                        <div>
                                            <h1>Status : <span className="font-semibold">{item.status}</span></h1>
                                            <h2>Total : <span>Rp.{item.grand_total}</span></h2>
                                            <h2>Weight : <span>{item.grand_weight}Kg</span></h2>
                                        </div>
                                        <div>
                                            <img className="h-20" src={item?.products[0]?.img} alt="product" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h1>{item.createdAt}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div> 
                </div>
            <FooterLayout />
        </>
     );
}
 
export default UserOrder;