import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import "../assets/style.css"
import {useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const base_url = process.env.REACT_APP_BASE_URL;

const CurrentProduct = ({user}) =>{
    const {id} = useParams();
    const [currProd, setCurrProd] = useState([]);
    const [errMsg, setErrMsg] = useState({});
    const userData = useSelector(state => state.loginReducer);
    const navigate = useNavigate()

    useEffect(() =>{
        fetch(`${base_url}/products/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user.accessToken
            }
        })
        .then(res => res.json())
        .then(result =>{
            console.log(result.data)
            setCurrProd(result.data);
        }, []);
    }, [id, userData])

    const firstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1)
    }

    const handleCreateCart = (id) =>{
        if(currProd.product_id?.qty === 0){
            setErrMsg({message: 'Stok kosong, Anda tidak bisa membeli produk ini.'})
        }else{
            fetch(`${base_url}/v1/user/cart`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': userData.user?.accessToken
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity:1
                })
            }).then(() => {
                navigate('/cart')
            }).catch(err => {
                console.log(err);
                setErrMsg(err)
            })
        }
    }

    // const handleIncrement = () =>{
    //     setCounter(parseInt(counter)+1);
    // }
    // const handleDecrement = () =>{
    //     if(counter == 0){
    //         setCounter(0)
    //     }else{
    //         setCounter(parseInt(counter)-1);
    //     }
        
    // }

    // const handleChange = (e) =>{
    //     setCounter(e.target.value)
    // }

    // const totalPrice = (price) =>{
    //     return counter*price;
    // }



    return (
        <div className="flex flex-col w-full h-screen">
            <NavbarLayout user={user}/>
            
            <div className="flex-grow mb-4">

            <div className="grid grid-cols-2 md:-ml-32 gap-8 my-8 md:mx-24">
                <div className="flex justify-end items-center">
                    <img src={`${currProd.product_id?.img}`} alt="Product" className="md:w-44 w-32 h-max"/>
                </div>
                <div className="ml-4">
                     
                    {currProd.product_id && <p className="md:text-xl text-lg font-bold">{firstLetter(currProd.product_id?.name)}</p>}
                    <p className= {(currProd.product_id?.qty === 0 ? "text-red-600" : "text-slate-600"  )}>Stok {currProd.product_id?.qty}</p>
                    <p className="md:text-2xl text-xl my-4">Rp. {currProd.product_id?.price}</p>

                    <p className="text-slate-500 text-sm md:text-base mt-6">Berat: {currProd.product_id?.weight}</p>
                    <p className="text-slate-500 text-sm md:text-base">Terjual: {currProd.product_id?.sold}</p>
                    <p className="text-slate-500 text-sm md:text-base mb-3">{currProd.product_id?.description}</p>
                </div>
                
            </div>
                

                <div className="flex justify-center items-center">
                        <button type="button" onClick={() => handleCreateCart(currProd.product_id?.id)} className="h-10 rounded w-32 bg-gray-300 hover:bg-gray-400">Beli</button>
                </div>
                {Object.keys(errMsg).length !== 0 && <p className="text-yellow-500 text-sm my-2 text-center">{errMsg.message}</p>}
               
        </div>
            <FooterLayout/>
        </div>
    )
}

export default CurrentProduct;