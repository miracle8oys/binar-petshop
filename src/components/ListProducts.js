const ListProducts = ({prod}) => {
    return ( 
        <>
            <div>
                <img src={`${prod.product_id.img}`} alt={prod.product_id.name} className='w-full  rounded'/>
            </div>
            <div className='font-sans p-2'>

                <p className='pt-2 text-xs md:text-base font-semibold'>{prod.product_id.name}</p>
                <p className='text-xs pb-2 md:text-sm text-slate-600'>{prod.product_id.description}</p>
                <p className='text-xs pb-2 md:text-base font-bold'>{prod.product_id.price}</p>
            </div>
           


        </>
     );
}
const BestSellerProducts = ({bp}) => {
    return ( 
       
            <>          
            <div>
                <img src={`${bp.product_id.img}`} alt={bp.product_id.name} className='w-full  rounded'/>
            </div>
            <div className='font-sans p-2'>
                <p className='pt-2 text-xs text-slate-400'>Stok {bp.product_id.qty}</p>
                <p className='text-xs md:text-base font-semibold'>{bp.product_id.name}</p>
                <p className='text-xs pb-2 md:text-sm text-slate-600'>{bp.product_id.description}</p>
                <p className='text-xs pb-2 md:text-base font-bold'>{bp.product_id.price}</p>
            </div>
            </> 
         

     );
}
 
export{ListProducts, BestSellerProducts} ;