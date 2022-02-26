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

    return ( 
        <>
            <div>
                <img src={`${prod.product_id?.img}`} alt={prod.product_id?.name} className='w-full lg:h-72 h-44 rounded object-fit'/>
            </div>
            <div className='font-sans p-2'>
                <p className='font-medium text-sm text-slate-700'>{capitalizeEachLetter(prod.product_id?.name)}</p>
                <p className='text-base md:text-lg font-semibold'>{formatRupiah (prod.product_id?.price)}</p>
                <div className="flex text-xs text-slate-500">
                    <p className=' my-2 '>Stok <span className="text-gray-600"> {prod.product_id?.qty}</span> pcs</p>
                    <p className="mx-1 my-2">|</p>
                    <p className=' my-2'>Terjual<span className="text-gray-600"> {prod.product_id?.sold}</span> pcs</p>
                </div>
            </div>
           


        </>
     );
}
const BestSellerProducts = ({bp}) => {
    return ( 
       
            <>          
            <div>
                <img src={`${bp.product_id.img}`} alt={bp.product_id.name} className='w-full lg:h-72 h-44 rounded object-fit'/>
            </div>
            <div className='font-sans p-2'>
                <p className='font-medium text-sm text-slate-700'>{capitalizeEachLetter(bp.product_id?.name)}</p>
                <p className='text-base md:text-lg font-semibold'>{formatRupiah(bp.product_id?.price)}</p>
                <div className="flex text-xs text-slate-500">
                    <p className=' my-2'>Stok <span className="text-gray-600"> {bp.product_id?.qty}</span> pcs</p>
                    <p className="mx-1 my-2">|</p>
                    <p className=' my-2'>Terjual <span className="text-gray-600"> {bp.product_id?.sold}</span> pcs</p>
                </div>
            </div>
            </> 
         

     );
}
 
export{ListProducts, BestSellerProducts} ;