import { Link } from 'react-router-dom';
import Pet1 from '../assets/pet1.jpg'

const ListPet = ()=>{
    return(
        // maks isi 6 card
        <div className='grid md:grid-cols-6 grid-cols-2 gap-4 md:gap- mx-auto'>
                <div className="shadow-lg border-solid border rounded bg-slate-200">
                        <div>
                            <img src={Pet1} alt="Dog" className='md:w-56 w-48 rounded'/>
                        </div>
                    <div className='font-sans md:py-2 md:px-3 mx-2 md:mx-0 '>
                        <p className='pt-2 text-xs md:text-sm font-medium'>Shaggy Dog | 16 months</p>
                        <p className='pb-2 text-xs md:text-sm'>Siberian Husky</p>
                    </div>
                </div>                
                          
                
        </div>
        
    )
}

export default ListPet;