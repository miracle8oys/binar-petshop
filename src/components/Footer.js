import { Link } from "react-router-dom";

const FooterLayout = ()=>{
    return(
        <div>
            <div className="bg-orange-100 py-3 border-b-[1.5px] text-sm md:text-base mb-auto">
                <div className="md:container h-max shrink-0">
                    <div className="grid md:grid-cols-4 grid-cols-2 mx-auto">
                        <div className="grid grid-flow-row auto-rows-max px-5 py-2 md:mx-auto">
                                <p className="font-bold mb-1" >Abcd Petshop</p>
                                <Link to={'/'}className="hover:font-bold">Instagram</Link>
                                <Link to={'/'}className="hover:font-bold">Twitter</Link>
                                <Link to={'/'}className="hover:font-bold">Facebook</Link>
                        </div>
                        <div className="grid grid-flow-row auto-rows-max px-5 py-2 mx-auto">
                                <p className="font-bold mb-1">Products</p>
                                <p>Animal Supplies</p>
                                <p>Pet Adoption</p>
                        </div>
                        <div className="grid grid-flow-row auto-rows-max px-5 py-2 md:mx-auto">
                                <p className="font-bold mb-1">Company</p>
                                <Link to={'/'} className="hover:font-bold">Helps</Link>
                                <Link to={'/'} className="hover:font-bold">About</Link>
                        </div>

                        <div className="grid grid-flow-row md:auto-rows-max px-5 py-2 mx-auto">
                                <p className="font-bold mb-1">Payments</p>
                                <p>Online Payment</p>
                                <p>Offline Payment</p>
                        </div>
                    
                    </div>

                </div>
            </div>
            <div className="bg-slate-50 pb-2">
                <div className="flex justify-between mx-5 py-2">
                    <p className="text-xs md:text-sm text-gray-400">@2021 Abcd Petshop</p>
                    <p className="text-xs md:text-sm text-gray-500">Terms of Service | Privacy Police</p>
                </div>
            </div>
        </div>


        
    )
}

export default FooterLayout;