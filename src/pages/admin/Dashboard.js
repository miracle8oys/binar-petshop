import { useEffect, useState } from "react";
import FooterLayout from "../../components/Footer"
import NavbarLayout from "../../components/Navbar"
import SidebarLayout from "../../components/SideberAdmin"

const Dashboard = ({user}) => {
    const [countProducts, setCountProducts] = useState(0);
    const [countOrders, setCountOrders] = useState(0);
    const [countProcess, setCountProcess] = useState(0);
    const [countHistory, setCountHistory] = useState(0);
    const [newOrders, setNewOrders] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect (() => {
        fetch(`${base_url}/admin/v1/dashboard`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setCountProducts(result.data.count_products)
            setCountOrders(result.data.count_orders)
            setCountProcess(result.data.count_process)
            setCountHistory(result.data.count_history)
            setNewOrders(result.data.new_orders)
        });
    }, [base_url])

    return (
        <div className="flex flex-col w-full h-screen">
            <NavbarLayout user={user}/>
            <div className="flex bg-orange-50">
                <SidebarLayout/>
                <div className="flex-grow mx-14 my-6 min-h-screen">
                    <p className="text-2xl font-semibold mb-6">Dashboard</p>
                    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-8">
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{countProducts}</p>
                            <p className="text-center text-md">Total Produk</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{countOrders}</p>
                            <p className="text-center text-md">Total Order</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{countProcess}</p>
                            <p className="text-center text-md">Dalam Pengiriman</p>
                        </div>
                        <div className="bg-orange-200 p-10 rounded-lg">
                            <p className="text-center font-bold text-2xl">{countHistory}</p>
                            <p className="text-center text-md">Order Selesai</p>
                        </div>
                    </div>

                    <p className="font-semibold mt-6 text-lg mb-3">New Order ({newOrders.length})</p>
                    <div className="grid grid-cols-2 gap-8">
                        {
                            newOrders.map(item => (
                                <div className="bg-orange-200 p-4 rounded-lg text-sm md:text-base">
                                    {/* <p>Recipient : {item.address.name}</p>
                                    <p>Quantity : {item.products.length}</p>
                                    <p>Grand Weight : {item.grand_weight}</p>
                                    <p className="mb-3">Shipping Costs: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.shipping_costs)}</p>
                                    <p className="text-sm font-semibold">Grand Total : {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.grand_total)}</p>
                                    <p className="text-sm mb-3">Delivery : {item.address.address} </p>
                                    <p className="text-center font-bold">Status: {item.status}</p> */}
                                    <table class="table-auto">
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