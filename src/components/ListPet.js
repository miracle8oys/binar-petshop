import { Link } from 'react-router-dom';
import Pet1 from '../assets/pet1.jpg'

const ListPet = ()=>{
    return(
        // maks isi 6 card
        <div className='flex inline-block gap-4 md:gap-6 mx-auto'>
            <div className="min-w-32 md:py-4 md:px-3 px-1 shadow-lg border-solid border rounded bg-slate-200">
                    <div className='flex justify-center py-2'>
                        <img src={Pet1} alt="Dog" className='md:w-32 w-24 rounded'/>
                    </div>
                <div className='font-sans'>
                    <p className='pt-2 text-xs md:text-sm font-medium'>Shaggy Dog | 16 months</p>
                    <p className='text-xs pb-2 md:text-sm'>Siberian Husky</p>
                </div>
            </div>
            <div className="min-w-32 md:py-4 md:px-3 px-1 shadow-lg border-solid border rounded bg-slate-200">
                    <div className='flex justify-center py-2'>
                        <img src={Pet1} alt="Dog" className='md:w-32 w-24 rounded'/>
                    </div>
                <div className='font-sans'>
                    <p className='pt-2 text-xs md:text-sm font-medium'>Shaggy Dog | 16 months</p>
                    <p className='text-xs pb-2 md:text-sm'>Siberian Husky</p>
                </div>
            </div>
        </div>
        
    )
}

export default ListPet;