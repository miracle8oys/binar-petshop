import food1 from '../assets/food1.jpg'
import { Link } from 'react-router-dom';
import product from '../pages/product.json';
import axios from 'axios';
import { useState, useEffect } from 'react';
const ListProducts = () => {
    const[productData, setProduct] = useState([]);
    useEffect(() => {
        setProduct(product)
    },);
    return ( 
        <div className="flex md:inline grid grid-cols-2 gap-4">
            <Link to={'/'}>
            {productData.map((item, i)=>(
                <div key={i} className="md:w-56 w-36 shadow border-solid border rounded bg-orange-50">
                        <div>
                            <img src={`${item.image}`} alt="Food" className='w-full  rounded'/>
                        </div>
                    <div className='font-sans p-2'>
                        <p className='pt-2 text-xs md:text-base font-semibold'>{item.name}</p>
                        <p className='text-xs pb-2 md:text-sm text-slate-600'>{item.description}</p>
                        <p className='text-xs pb-2 md:text-base font-bold'>{item.price}</p>
                    </div>
                </div>
                ))};
            </Link>

        </div>
     );
}
const BestSellerProducts = () => {
    return ( 
        <div className="md:flex md:inline-block grid grid-cols-2 gap-4">
            <Link to={'/'}>
                <div className="md:w-56 w-36 shadow border-solid border rounded bg-rose-50">
                        <div>
                            <img src={food1} alt="Dog" className='w-full  rounded'/>
                        </div>
                    <div className='font-sans p-2'>
                        <p className='pt-2 text-xs md:text-base font-semibold'>The food dog</p>
                        <p className='text-xs pb-2 md:text-sm text-slate-600'>Food dog is good and high quality food, you can give this to your dog with vitamin A, B, C, D</p>
                        <p className='text-xs pb-2 md:text-base font-bold'>Rp. 20.000</p>
                    </div>
                </div>
            </Link>

        </div>
     );
}
 
export{ListProducts, BestSellerProducts} ;