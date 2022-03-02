import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FooterLayout from "../../components/Footer"
import NavbarLayout from "../../components/Navbar"
import SidebarLayout from "../../components/SideberAdmin"

const Dashboard = ({user}) => {
    const userData = useSelector(state => state.loginReducer);
    const [newOrders, setNewOrders] = useState([]);
    const [orderData, setOrderData] = useState({});
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect (() => {
        fetch(`${base_url}/admin/v1/dashboard`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken 
            }
        })
        .then(res => res.json())
        .then(result => {
            setOrderData({
                countProducts: result.data.count_products,
                countOrders: result.data.count_orders,
                countProcess: result.data.count_process,
                countHistory: result.data.count_history
            })
            setNewOrders(result.data.new_orders)
        });
    }, [base_url, userData])

    return (
        <div className="flex flex-col w-full h-screen">
            <NavbarLayout user={user}/>
            <div className="flex bg-orange-50">
                <SidebarLayout/>
                <div className="flex-grow mx-14 my-6 min-h-screen">
                    <p className="text-2xl font-semibold mb-6">Dashboard</p>
                    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-8">
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{orderData.countProducts}</p>
                            <p className="text-center text-md">Total Produk</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{orderData.countOrders}</p>
                            <p className="text-center text-md">Total Order</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{orderData.countProcess}</p>
                            <p className="text-center text-md">Dalam Pengiriman</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{orderData.countHistory}</p>
                            <p className="text-center text-md">Order Selesai</p>
                        </div>
                    </div>

                    <p className="font-semibold mt-6 text-lg mb-3">New Order ({newOrders?.length})</p>
                    <div className="grid grid-cols-2 gap-8">
                        {newOrders?.length > 0 &&
                            newOrders.map(item => (
                                <div key={item.id} className="bg-orange-200 p-4 rounded-lg text-sm md:text-base">
                                    <table className="table-auto">
                                        <tbody>
                                            <tr>
                                                <td>Recipient</td>
                                                <td>: {item.address.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Quantity</td>
                                                <td>: {item.products.length}</td>
                                            </tr>
                                            <tr>
                                                <td>Grand Weight</td>
                                                <td>: {item.grand_weight}</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping Costs</td>
                                                <td>: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.shipping_costs)}</td>
                                            </tr>
                                            <tr>
                                                <td>Grand Total</td>
                                                <td>: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.grand_total)}</td>
                                            </tr>
                                            <tr>
                                                <td>Delivery</td>
                                                <td>: {item.address.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>: <span className="font-semibold">{item.status}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default Dashboard;