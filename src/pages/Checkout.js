import { useEffect, useState } from "react";
import FooterLayout from "../components/Footer";
import NavbarLayout from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {AiOutlineClose, AiOutlineExclamationCircle} from 'react-icons/ai';

const Checkout = () => {
    const userToken = useSelector(state => state.loginReducer.user?.accessToken);
    const [cart, setCart] = useState([]);
    const [ongkir, setOngkir] = useState(0);
    const [weight, setWeight] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errMsg, setErrMsg] = useState({});
    const [address, setAddress] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(0);
    const [modal, setModal] = useState(false)
    const [paymentTriggered, setPaymentTriggered] = useState(false);
    const [obtainedOrderData, setObtainedOrderData] = useState({});
    // const userData = useSelector(state => state.loginReducer);

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
                console.log(result.data);
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
                setCurrentAddress(result?.data[0].id);
            })
        }
    }, [userToken, base_url]);


    const handleCheckShipping = (currentAddress) => {
        if(currentAddress === undefined){
            
            setErrMsg({message: 'Please create your shipping address'})
            return false
        }else{
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
                console.log(result);
                setOngkir(result.rajaongkir.results[0].costs[0].cost[0].value)
                setErrMsg({message:null})
            }).catch(err => {
                console.log(err);
            })

        }
        
    }

    useEffect(() => {
        if (address?.length > 0 && weight !== 0 ) {
            console.log(address[0].id);
            // handleCheckShipping(address[0].id);
            fetch(`${base_url}/cost`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${userToken}`
                },
                body: JSON.stringify({
                    address_id: `${address[0].id}`,
                    weight: `${weight * 1000}`
                })
            }).then(res => res.json())
            .then(result => {
                console.log(result);
                setOngkir(result.rajaongkir.results[0].costs[0].cost[0].value)
                setErrMsg({message:null})
            }).catch(err => {
                console.log(err);
            })
        }

    }, [address, weight, base_url, userToken])

    const handlePayment = async () => {
        if(paymentTriggered){
            window.snap.pay(obtainedOrderData.snap_token);
        }
        else{            
            if(cart.length === 0){
                setModal(true)
                setErrMsg({message: 'You can not payment empty cart. Go to catalog to choose some product!'})
                return false
            } else if(currentAddress === 0){
                setModal(true)
                setErrMsg({message: 'Your address empty. Do you want to create address?'})
                return false
            }else{
                const createOrderResponse = await fetch(`${base_url}/v1/user/order/create`, {
                    method: "POST",
                    headers: {
                        'Authorization': `${userToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        address_id: currentAddress,
                        shipping_costs: ongkir
                    })
                });

                const createOrderJSON = await createOrderResponse.json();

                const orderData = createOrderJSON.data;

                setPaymentTriggered(true);
                setObtainedOrderData(orderData);

                setTimeout(()=>{},2000);

                
                window.snap.pay(orderData.snap_token);
                
            }
        }
    }

    
    const capitalizeEachLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }

     console.log(currentAddress)
    return ( 
        <div className="flex flex-col w-full h-screen bg-orange-50 bg-opacity-25">
        <NavbarLayout/>
            
            <div className="container  min-w-full  my-5 flex-grow ">
                <div className="md:flex h-full md:mx-10 mx-2 md:gap-4">
                    <div className="md:w-2/3 py-6 h-96 md:h-full scrollbar overflow-auto">
                        <h1 className="font-semibold text-2xl mb-5">Checkout</h1>
                        <div className="border-b py-5 bg-white border rounded-lg px-4 ">
                            <p className="font-bold">Shipping Address</p>
                            <div className="py-3">
                          
                                {currentAddress ?
                                <select onChange={(e) => handleCheckShipping(e.target.value)} className="my-3 w-full px-2 py-4  rounded-md focus:outline focus:outline-gray-200 border border-gray-300">
                                 {address.map(item => (
                                     <option key={item.id} value={item.id}>
                                         {item.name}, {item.phone}, {item.address} ({item.postal_code}), {item.city}, {item.province}
                                    </option>
                                    ))}
                                </select> 
                                : ''
                                    
                                }
                            
                           
                            </div>
                            <div className="my-5">
                                <Link to="/address" className="p-2 text-sm font-semibold border border-gray-400 rounded-md bg-white">Create Address</Link>
                            </div>
                           
                        </div>
                        <div className="bg-white shadow h-fit rounded-lg border">
                            {cart.map(item => (
                            <div key={item.id} className="hover:bg-gray-100 p-4 mb-2">
                                <div className="flex w-full gap-2 mb-4">
                                    <div className="w-20 block">
                                        <img className="h-24 object-fit" src={item.product?.img} alt="thumbnail"/>
                                    </div>
                                    <div className="md:ml-4 flex-grow">
                                        {item.product && <p className="font-medium text-xs md:text-xl"> {capitalizeEachLetter(item.product?.name)}</p>}
                                        <p className="text-sky-800 text-xs md:text-sm md:my-2 my-1"> {item.quantity} items ({item.product?.weight * item.quantity} kg)</p>
                                        <span className="text-center font-medium text-xs md:text-base xl:text-lg">{formatRupiah(item.product?.price)}</span>
                                        
                                    </div>
                                </div>
                                <div className="flex justify-between border-t font-medium py-3">
                                        <span className="text-center  text-xs md:text-base">Sub Total</span>
                                        <span className="text-center  text-xs md:text-base">{formatRupiah(item.product?.price * item.quantity)}</span>
                                    </div>
                                <div className="border-b-4 mt-2"></div>
                            </div>
                            ))}
                        </div>
                    </div>
                    


                    <section id="summary" className="md:w-1/3 md:mt-20">
                        <div className="sticky top-0 ">
                            <div className="bg-white shadow-md rounded-lg h-fit px-8 py-3 md:py-6 ">
                                <h1 className="font-semibold text-base md:text-xl border-b pb-3">Shopping Summary</h1>
                                <div className="md:mt-6 mt-2">
                                    <div className="flex justify-between">
                                        <p className="font-semibold md:text-base text-sm">Shipping Cost</p>
                                        <span className="font-semibold md:text-base text-sm">{formatRupiah(ongkir)}</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2 md:text-base text-sm  border-b">
                                        <span>Total price</span>
                                        <span>{formatRupiah(totalPrice)}</span>
                                    </div>
                                    <div className="flex font-semibold justify-between py-6 text-sm">
                                        <span className="font-bold text-base md:text-lg">Total Bills</span>
                                        <span className="md:text-lg">{formatRupiah(totalPrice + ongkir)}</span>
                                    </div>
                                    
                                    <button onClick={handlePayment} className="bg-indigo-500 rounded font-semibold hover:bg-indigo-600 md:py-3 py-2 text-sm text-white w-full md:uppercase ">Payment</button>
                                    
                                </div>    
                            </div> 
                        </div>
                    </section>
                        
                </div>
                {
                    modal ?
               (
                <div className="w-full lg:min-w-full flex-grow container  ">
                    <div className="fixed top-0 inset-0 z-50 bg-gray-300 bg-opacity-50 " id="popup-modal">
                        <div className="relative w-auto mx-auto  px-4 w-full max-w-md h-full md:h-auto">
                        
                            <div className="relative bg-white my-24 md:my-32 2xl:my-64  rounded-lg shadow">
                            
                                <div className="flex justify-end p-2">
                                    <button onClick={() => setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <AiOutlineClose/>
                                    </button>
                                </div>
                                
                                <div className="p-6 pt-0 text-center">
                                    <AiOutlineExclamationCircle className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" />
                                    {Object.keys(errMsg).length !== 0 &&<p className="mb-5 font-normal text-gray-500 dark:text-gray-400">{errMsg.message}</p>}
                                    {/* {Object.keys(errMsg).length !== 0 &&
                                    <div className="flex justify-center">
                                        <p className="text-yellow-700 text-sm my-2 text-center">{errMsg.message}</p>
                                    </div>} */}
                                    <div className="flex justify-center">
                                    {currentAddress === 0 ?(
                                      
                                            <Link to="/address" className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">Yes, create address</Link>
                                        
                                    ) :
                                        
                                            <Link to="/catalog" className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">Catalog product</Link>
                                         
                                    }
                 
                                    <button onClick={() => setModal(false)} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">No, cancel</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : null
                }

               
            </div>
            
            <FooterLayout/>
        </div>
        // <>
        // <NavbarLayout />
        //     <div className="flex justify-center">
        //         <div className="min-h-[70vh] md:w-[80vw] pt-3 px-3 md:grid md:grid-cols-2 items-center">
        //             <div>
        //                 {cart.map(item => (
        //                     <div key={item.id}>
        //                         <div className="md:flex md:justify-center my-3">
        //                             <div className="grid grid-cols-8 items-center gap-2 md:w-2/4">
        //                                 <div className="col-span-2 md:col-span-3">
        //                                     <img className="h-28 w-28" src={item.product?.img} alt="product" />
        //                                 </div>
        //                                 <div className="col-span-4 md:col-span-5">
        //                                     <p className="font-semibold">{item.product?.name}</p>
        //                                     <p>Qty: <span className="font-semibold">{item.quantity}</span></p>
        //                                     <p><span className="font-semibold">Rp.{item.product?.price}</span></p>
        //                                     <p>Subtotal : <span className="font-semibold">Rp.{item.product?.price * item.quantity}</span></p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>

        //             <div>
        //                     {currentAddress ?
        //                     <>
        //                         <div className="flex justify-center my-5">
        //                             <select onChange={(e) => setCurrentAddress(e.target.value)} className="border-2 h-12 rounded-md">
        //                                 {address.map(item => (
        //                                         <option key={item.id} value={item.id}>{item.city}, {item.address}</option>
        //                                 ))}
        //                             </select>
        //                         </div>
        //                         <div className="flex justify-center mb-3">
        //                             <button className="py-2 px-2 bg-orange-300 rounded-md font-semibold" onClick={handleCheckShipping}>Check Shipping Cost</button>
        //                         </div>
        //                     </> : 
        //                     <>
        //                         <div className="flex justify-center my-5">
        //                             <Link to="/address" className="py-2 px-2 bg-sky-500 rounded-md">Create Address</Link>
        //                         </div>
        //                     </>    
        //                 }

        //                 <div className="py-3 md:flex md:justify-center gap-2">
        //                     <div className="md:w-3/5 md:grid md:justify-center bg-slate-300 rounded-md py-2 px-5">
        //                         <p>Total Price: <span className="font-semibold">Rp.{totalPrice}</span></p>
        //                         <p>Shipping Cost: <span className="font-semibold">Rp.{ongkir}</span></p>
        //                         <p>Total Bill: <span className="font-semibold">Rp.{totalPrice + ongkir}</span></p>
        //                     </div>
        //                 </div>
        //                 {ongkir &&
        //                     <div className="flex justify-center mb-3">
        //                         <button onClick={handlePayment} className="py-2 px-2 bg-sky-500 rounded-md font-semibold">Payment</button>
        //                     </div>
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // <FooterLayout />
        // </>
     );
}
 
export default Checkout;