import { useNavigate } from "react-router-dom";
import {BsCart3} from 'react-icons/bs'
// import {FaCrown} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'


const capitalizeEachLetter = (string) => {
    let word = string.toLowerCase().split(' ')
    for(let i = 0; i < word.length; i++){
        word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
    }
    return word.join(' ')
}

// const firstLetter = (string) => {
//     return  string.charAt(0).toUpperCase() + string.slice(1)
// }

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
 }
 const ListProducts = ({prod}) => {
    const navigate = useNavigate();

    return ( 
        <>
            <div>
                <img src={`${prod.product_id?.img}`} alt={prod.product_id?.name} className='w-full md:h-56 h-32 rounded-xl object-cover'/>
            </div>
            <div className='font-sans p-2 2xl:mt-3'>
                <p className='font-medium text-sm md:text-base  h-10  md:h-8 text-slate-700'>{capitalizeEachLetter(prod.product_id?.name)}</p>
                <p className='text-base md:text-lg 2xl:text-xl font-semibold'>{formatRupiah (prod.product_id?.price)}</p>
                <div className="md:flex text-xs 2xl:text-sm text-slate-500 mb-3 2xl:mb-6">
                    <p className=' md:my-2 my-1'>Stock <span className="text-gray-700"> {prod.product_id?.qty}</span> pcs</p>
                    <p className=" md:block hidden mx-1 my-2">|</p>
                    <p className=' md:my-2'>Sells<span className="text-gray-700"> {prod.product_id?.sold}</span> pcs</p>
                </div>
                <div className="flex justify-center">
                    <button type="submit" onClick={() => navigate(`/product/${prod.product_id?.id}`)} className="bg-orange-200 hover:bg-orange-100 font-semibold md:w-48 w-32 py-2 rounded-md text-xs md:text-base flex justify-center"> <BsCart3 className="md:mt-1 mx-2"/> Shop now</button>
                </div>
            </div>
           


        </>
     );
}
 const HomeListProducts = ({prod}) => {
    const navigate = useNavigate();

    return ( 
        <>
            <div>
                <img src={`${prod.product_id?.img}`} alt={prod.product_id?.name} className='w-full md:h-56 h-32 rounded object-cover'/>
            </div>
            <div className='font-sans p-2  2xl:mt-3'>
                <p className='font-medium text-sm text-slate-700  2xl:text-lg h-10'>{capitalizeEachLetter(prod.product_id?.name)}</p>
                <p className='text-base md:text-lg font-semibold  2xl:text-xl'>{formatRupiah (prod.product_id?.price)}</p>
                <div className="md:flex text-xs  2xl:text-sm text-slate-500 mb-3 2xl:mb-6">
                    <p className=' md:my-2 my-1'>Stock <span className="text-gray-600"> {prod.product_id?.qty}</span> pcs</p>
                    <p className="md:block hidden mx-1 my-2">|</p>
                    <p className=' md:my-2'>Sells<span className="text-gray-600"> {prod.product_id?.sold}</span> pcs</p>
                </div>
                <div className="flex justify-center">
                    <button type="submit" onClick={() => navigate(`/product/${prod.product_id?.id}`)} className="bg-slate-300 hover:bg-slate-200 font-semibold md:w-48 w-32 py-2 rounded-md text-xs md:text-base flex justify-center"> <BsCart3 className="md:mt-1 mx-2"/> Shop now</button>
                </div>
            </div>
           


        </>
     );
}
const BestSellerProducts = ({bp}) => {
    const navigate = useNavigate();
    return ( 
       
            <>          
            <div>
                <img src={`${bp.product_id.img}`} alt={bp.product_id.name} className='w-full md:h-56 h-32 rounded-xl object-cover'/>
                
            </div>

            <div className='font-sans p-2  2xl:mt-3'>
                <div className="flex justify-between h-10 mb-2">
                    <p className='font-medium text-sm md:text-base text-white '>{capitalizeEachLetter(bp.product_id?.name)}
                       
                    </p>
                    <span className="inline-block text-sm md:text-base  p-1 leading-none text-center whitespace-nowrap  items-center font-bold  text-white rounded ml-2"><AiFillStar/> </span>
                </div>
                
                <p className='text-base md:text-lg font-semibold text-white  2xl:text-xl'>{formatRupiah(bp.product_id?.price)}</p>
                <div className="md:flex text-xs  2xl:text-sm text-slate-500 mb-3 2xl:mb-6 ">
                    <p className=' md:my-2 my-1 text-white'>Stock <span className="text-white"> {bp.product_id?.qty}</span> pcs</p>
                    <p className="mx-1 my-2 text-white md:block hidden">|</p>
                    <p className=' md:my-2 text-white'>Sells <span className="text-white"> {bp.product_id?.sold}</span> pcs</p>
                </div>
                <div className="flex justify-center">
                    <button type="submit" onClick={() => navigate(`/product/${bp.product_id?.id}`)} className=" bg-white hover:bg-slate-200 font-semibold md:w-48 w-32 py-2 rounded-md text-xs md:text-base flex justify-center"> <BsCart3 className="md:mt-1 mx-2"/> Shop now</button>
                </div>
            </div>
            </> 
         

     );
}
const TopProducts = ({tp}) => {
    const navigate = useNavigate();
    return ( 
       
            <>          
            <div>
                <img src={`${tp.product_id.img}`} alt={tp.product_id.name} className='w-full md:h-64 2xl:h-72 h-36 rounded-xl object-cover'/>
            </div>
            <div className='font-sans p-2'>
                <h4 className='md:text-2xl text-sm text-center font-semibold tracking-wide mt-2 text-white h-8'>{capitalizeEachLetter(tp.product_id?.name)}</h4>
                <p className="text-white mt-2 md:text-base text-xs text-center">{formatRupiah(tp.product_id?.price)}</p>
                <div className="flex justify-center mt-4">
                    <button type="submit" onClick={() => navigate(`/product/${tp.product_id?.id}`)} className="bg-white hover:bg-gray-200 font-semibold md:w-48 w-32 py-2 rounded-md text-xs md:text-base flex justify-center"> <BsCart3 className="md:mt-1 mx-2"/> Shop now</button>
                </div>
            </div>
            </> 
         

     );
}

 
export{ListProducts,HomeListProducts, BestSellerProducts, TopProducts} ;