import { Link } from 'react-router-dom';
import Pet1 from '../assets/pet1.jpg'

const ListPet = ()=>{
    return(
        // maks isi 6 card
        <div className='flex inline-block gap-4 md:gap-6 mx-auto'>
            <div className="min-w-32 shadow-lg border-solid border rounded bg-slate-200">
                    <div className='flex justify-center'>
                        <img src={Pet1} alt="Dog" className='md:w-48 w-32 rounded'/>
                    </div>
                <div className='font-sans md:py-2 md:px-3 '>
                    <p className='pt-2 text-xs md:text-sm font-medium'>Shaggy Dog | 16 months</p>
                    <p className='text-xs pb-2 md:text-sm'>Siberian Husky</p>
                </div>
            </div>
        </div>
        
    )
}

export default ListPet;