import { useEffect, useState } from "react";
import FooterLayout from "../../components/Footer"
import NavbarLayout from "../../components/Navbar"

const Dashboard = ({user}) => {
    const [product, setProduct] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect (() => {
        fetch(`${base_url}/products`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result.count)
            setProduct(result.data)
        });
    }, [base_url])

    return (
        <div className="flex flex-col w-full h-screen">
            <NavbarLayout user={user}/>
            <div className="flex-grow mx-14 my-6 ">
                <p className="text-2xl font-semibold mb-6">Dashboard</p>
                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-8">
                    <div className="bg-slate-100 p-10 rounded-lg">
                        <p className="text-center font-bold text-2xl">{product.count}</p>
                        <p className="text-center text-md">Total Produk</p>
                    </div>
                    <div className="bg-slate-100 p-10 rounded-lg">
                        <p className="text-center font-bold text-2xl">200</p>
                        <p className="text-center text-md">Total Order</p>
                    </div>
                    <div className="bg-slate-100 p-10 rounded-lg">
                        <p className="text-center font-bold text-2xl">200</p>
                        <p className="text-center text-md">Dalam Pengiriman</p>
                    </div>
                    <div className="bg-slate-100 p-10 rounded-lg">
                        <p className="text-center font-bold text-2xl">200</p>
                        <p className="text-center text-md">Order Selesai</p>
                    </div>
                </div>

                <p className="font-semibold mt-6 text-lg mb-3">New Order (2)</p>
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-orange-50 p-4 rounded-lg text-sm md:text-base">
                        <p>Nama</p>
                        <p>Barang</p>
                        <p>Quantity: 1</p>
                        <p className="mb-3">Biaya Pengiriman: Rp. 20000</p>
                        <p className="text-sm font-semibold">Total Harga: Rp. 100.000</p>
                        <p className="text-sm mb-3">Pengiriman: Jalan Pengiriman No. 12 Jakarta Selatan Indonesia </p>
                        <p className="text-center font-bold">Status: </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-sm md:text-base">
                        <p>Nama</p>
                        <p>Barang</p>
                        <p>Quantity: 1</p>
                        <p className="mb-3">Biaya Pengiriman: Rp. 20000</p>
                        <p className="text-sm font-semibold">Total Harga: Rp. 100.000</p>
                        <p className="text-sm mb-3">Pengiriman: Jalan Pengiriman No. 12 Jakarta Selatan Indonesia </p>
                        <p className="text-center font-bold">Status: </p>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default Dashboard;