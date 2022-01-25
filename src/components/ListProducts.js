const capitalizeEachLetter = (string) => {
    let word = string.toLowerCase().split(' ')
    for(let i = 0; i < word.length; i++){
        word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
    }
    return word.join(' ')
}

const firstLetter = (string) => {
    return  string.charAt(0).toUpperCase() + string.slice(1)
}
const ListProducts = ({prod}) => {

    return ( 
        <>
            <div>
                <img src={`${prod.product_id.img}`} alt={prod.product_id.name} className='w-full md:h-56 h-44 rounded'/>
            </div>
            <div className='font-sans p-2'>
                <p className='pt-2 text-xs md:text-base font-semibold'>{capitalizeEachLetter(prod.product_id.name)}</p>
                <p className='text-xs pb-2 md:text-sm text-slate-600'>{firstLetter(prod.product_id.description)}</p>
                <p className='text-xs pb-2 md:text-base font-bold'>Rp. {prod.product_id.price}</p>
            </div>
           


        </>
     );
}
const BestSellerProducts = ({bp}) => {
    return ( 
       
            <>          
            <div>
                <img src={`${bp.product_id.img}`} alt={bp.product_id.name} className='w-full md:h-56 h-44   rounded'/>
            </div>
            <div className='font-sans p-2'>
                <p className='pt-2 text-xs text-slate-400'>Stok {bp.product_id.qty}</p>
                <p className='text-xs md:text-base font-semibold'>{capitalizeEachLetter(bp.product_id.name)}</p>
                <p className='text-xs pb-2 md:text-sm text-slate-600'>{firstLetter(bp.product_id.description)}</p>
                <p className='text-xs pb-2 md:text-base font-bold'>Rp. {bp.product_id.price}</p>
            </div>
            </> 
         

     );
}
 
export{ListProducts, BestSellerProducts} ;