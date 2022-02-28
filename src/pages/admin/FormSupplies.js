import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"


const FormSupplies = ({action}) => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const {id,productId} = useParams()
    const navigate = useNavigate();
    const userData = useSelector(state => state.loginReducer);
    const [errMsg, setErrMsg] = useState({});
    const [qty, setQty] = useState(0);
    const [product, setProduct] = useState({});

    useEffect(()=>{

        if(action === "ADD"){
            fetch(`${base_url}/admin/v1/products/${productId}`, {
                method: "GET",
                    headers: {
                        'Content-Type': 'Application/JSON',
                        'authorization': userData.user?.accessToken
                    }
            })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setProduct(result.data.product_id)
            })
        }
        if(action === "UPDATE"){
            fetch(`${base_url}/admin/v1/supplies/${id}`, {
                method: "GET",
                    headers: {
                        'Content-Type': 'Application/JSON',
                        'authorization': userData.user?.accessToken
                    }
            })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setQty(result.data.qty)
                setProduct(result.data.product)
            })
        }
    }, [base_url])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(action === "ADD"){
            fetch(`${base_url}/admin/v1/supplies`, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken 
                },
                body: JSON.stringify({
                    qty,
                    product_id: productId
                })
            })
            .then(() => {
                navigate("/admin/products")
            }).catch(err => {
                console.log(err);
                setErrMsg(err);
            })
        } 
        else if (action === "UPDATE"){
            fetch(`${base_url}/admin/v1/supplies/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken 
                },
                body: JSON.stringify({
                    qty
                })
            })
            .then(() => {
                navigate("/admin/supplies")
            }).catch(err => {
                console.log(err);
                setErrMsg(err);
            })
        }
    }
    return (
        <div>
            <NavbarLayout/>
            <div className="flex bg-orange-50">
                <SidebarLayout />
                <div className="grid justify-center h-max min-h-screen w-full py-10">
                    <div className="h-fit w-[70vw] md:w-[50vw] border border-slate-400 px-5 pt-4 shadow-2xl">
                        <h1 className="text-center text-2xl font-semibold">{action} SUPPLIES</h1>
                        {Object.keys(errMsg).length !== 0 && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg.message}</h1>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-8 gap-3 md:gap-3">
                            <label className="text-gray-700 ml-2">Product</label>
                            <input value={product.name} className="border-2 h-12 rounded-md pl-2" readOnly/>
                            <label className="text-gray-700 ml-2">qty</label>
                            {
                                action === "ADD" ? (
                                    <input onChange={(e) => setQty(e.target.value)} value={qty} className="border-2 h-12 rounded-md pl-2" type="number" min={0} required/>
                                ) : (
                                    <input onChange={(e) => setQty(e.target.value)} value={qty} className="border-2 h-12 rounded-md pl-2" type="number" min={0} readOnly/>
                                )
                            }
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="btn bg-orange-200 py-3 self-center w-40 rounded-md font-bold border border-slate-400 hover:bg-orange-300">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default FormSupplies;